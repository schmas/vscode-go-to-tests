import * as fs from 'fs';
import { values } from 'lodash';
import * as path from 'path';
import { ParsedPath } from 'path';
import { window, workspace } from 'vscode';
import { getRules } from './config';
import { log } from './loggingService';
import { Rule } from './Rule';

export function match(wsBaseDir: string, parsedPath: ParsedPath, rule?: Rule): string[] {
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

  return possibleMatches;
}

function findRule(baseFileName: string): Rule | undefined {
  const rule = values(getRules()).find((r) => r.accept(baseFileName));
  log.debug('Found rule:', rule);
  return rule;
}

export function findMatches(fileName: string, wsBaseDir: string): string[] {
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

  const possibleMatches = findMatches(fileName, wsBaseDir);

  for (const possibleFile of possibleMatches) {
    if (fs.existsSync(possibleFile)) {
      const document = await workspace.openTextDocument(possibleFile);
      await window.showTextDocument(document);
      return;
    }
  }
}
