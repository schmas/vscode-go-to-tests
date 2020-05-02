import * as fs from 'fs';
import { values } from 'lodash';
import * as path from 'path';
import { ParsedPath } from 'path';
import { window, workspace } from 'vscode';
import { getRules } from './config';
import { log } from './loggingService';
import { Rule } from './Rule';
import { Match } from './Match';

export function match(wsBaseDir: string, parsedPath: ParsedPath, rule?: Rule): Match {
  const possibleMatches: string[] = [];
  if (!!rule) {
    const { base, dir } = parsedPath;
    const { targetExts, targetDirs } = rule;
    const baseName = rule.removeSourceExt(base);
    const pathWithoutBase = rule.removeSourceDir(dir);

    for (const targetExt of targetExts) {
      for (const targetDir of targetDirs) {
        possibleMatches.push(path.join(wsBaseDir, targetDir, pathWithoutBase, `${baseName}${targetExt}`));
      }
    }
  }

  return new Match(parsedPath, possibleMatches, rule);
}

function findRule(baseFileName: string): Rule | undefined {
  const rule = values(getRules()).find((r) => r.accept(baseFileName));
  log.debug('Found rule:', rule);
  return rule;
}

function warn(message: string, match: Match): void {
  log.warn(message, match);
  window.showWarningMessage(message, 'Output').then(() => {
    log.show();
  });
}

export function findMatches(fileName: string, wsBaseDir: string): Match {
  const parsedPath = path.parse(fileName);
  log.debug('File extention:', parsedPath);
  const rule = findRule(parsedPath.base);
  const possibleMatches = match(wsBaseDir, parsedPath, rule);
  log.debug('Matched files:', possibleMatches);
  return possibleMatches;
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

  const match = findMatches(fileName, wsBaseDir);

  for (const possibleFile of match.possibleMatches) {
    if (fs.existsSync(possibleFile)) {
      const document = await workspace.openTextDocument(possibleFile);
      await window.showTextDocument(document);
      return;
    }
  }

  if (!match.hasRule()) {
    warn(`No rules matched for file: ${match.getFileName()}`, match);
  } else if (match.isTest()) {
    warn(`No test files matched for: ${match.getFileName()}`, match);
  } else {
    warn(`No source files matched for: ${match.getFileName()}`, match);
  }
}
