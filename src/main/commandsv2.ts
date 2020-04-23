import * as fs from 'fs';
import * as path from 'path';
import { ParsedPath } from 'path';
import { window, workspace } from 'vscode';
import { log } from './loggingService';
import { DEFAULT_RULES, Rule } from './rulev2';
import { chain } from 'lodash';

let rules = DEFAULT_RULES;

export function updateFromConfig(): void {
  const configuration = workspace.getConfiguration('jump-to-tests');
  const extraRules: Rule[] = configuration.get('rules') || [];
  rules = [...extraRules, ...DEFAULT_RULES];
}

export function match(parsedPath: ParsedPath, rule: Rule): string[] {
  const possibleMatches: string[] = [];
  const { extensions, srcDirs, testDirs } = rule;

  const srcDir = srcDirs.find((s) => parsedPath.dir.startsWith(s));
  const testDir = testDirs.find((s) => parsedPath.dir.startsWith(s));

  if (testDir) {
    const dirWithoutSrc = parsedPath.dir.replace(testDir, '');

    log.debug(dirWithoutSrc);

    const mathedExts = extensions.filter((e) => e.testExt.some((_e) => parsedPath.base.endsWith(_e)));
    const baseName = chain(mathedExts)
      .flatMap((_ext) => _ext.testExt)
      .filter((_testExt) => parsedPath.base.endsWith(_testExt))
      .uniq()
      .map((_foundTestExt) => parsedPath.base.replace(_foundTestExt, ''))
      .head()
      .value();

    mathedExts.forEach((ext) => {
      srcDirs.forEach((_srcDir) => {
        possibleMatches.push(path.join(_srcDir, dirWithoutSrc, `${baseName}${ext.ext}`));
      });
    });
  } else if (srcDir) {
    const dirWithoutSrc = parsedPath.dir.replace(srcDir, '');

    extensions
      .find((e) => e.ext === parsedPath.ext)
      ?.testExt.forEach((_testExt) => {
        testDirs.forEach((_testDir) => {
          possibleMatches.push(path.join(_testDir, dirWithoutSrc, `${parsedPath.name}${_testExt}`));
        });
      });
  }

  return possibleMatches;
}

function findRule(fileExtension: string): Rule | undefined {
  const rule = rules.find((r) => r.extensions.some((e) => e.ext === fileExtension));

  log.debug('Found rule:', rule);
  return rule;
}

export async function jump(): Promise<void> {
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }

  // FIXME: when workspace with multiple projects, probabily not working right now
  const editorFileName = editor.document.uri.fsPath;
  const fileName = workspace.asRelativePath(editorFileName);
  const wsBaseDir = workspace.workspaceFolders?.[0].uri.fsPath || '';
  log.debug(`Editor file: ${editorFileName}`);
  log.debug(`Active file: ${fileName}`);
  log.debug(`Root path: ${wsBaseDir}`);
  // log.debug(`WorkspaceFolders: ${JSON.stringify(workspace.workspaceFolders)}`);

  const parsedPath = path.parse(fileName);
  log.debug(`File extention: ${parsedPath}`);

  const rule = findRule(parsedPath.ext);
  if (rule) {
    const possibleMatches = match(parsedPath, rule);
    log.debug(`Matched file: ${possibleMatches}`);

    for (const possibleFile of possibleMatches) {
      const absoluteFile = path.join(wsBaseDir, possibleFile);
      if (possibleFile && fs.existsSync(absoluteFile)) {
        const document = await workspace.openTextDocument(absoluteFile);
        await window.showTextDocument(document);
        return;
      }
    }
  }
}
