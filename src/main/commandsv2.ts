import { workspace, window } from 'vscode';
import { DEFAULT_RULES, Rule } from './rulev2';
import { log } from './loggingService';
import path = require('path');

let rules = DEFAULT_RULES;

export function updateFromConfig(): void {
  const configuration = workspace.getConfiguration('jump-to-tests');
  const extraRules: Rule[] = configuration.get('rules') || [];
  rules = [...extraRules, ...DEFAULT_RULES];
}

// export function match(fileExtension: string, path: string, rule: Rule): string | undefined {
//   const { srcDirs, testDirs } = rule;
//   let regex: RegExp;
//   try {
//     regex = new RegExp(pattern);
//   } catch {
//     return;
//   }
//   if (!path.match(regex)) {
//     return;
//   }
//   const replaced = path.replace(regex, replacement);
//   return replaced;
// }

function findRule(fileExtension: string): Rule | undefined {
  const rule = rules.find((r) => r.extensions.some((e) => e === fileExtension));

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
  const wsBaseDir = workspace.workspaceFolders?.[0].uri.fsPath;
  log.debug(`Editor file: ${editorFileName}`);
  log.debug(`Active file: ${fileName}`);
  log.debug(`Root path: ${wsBaseDir}`);
  // log.debug(`WorkspaceFolders: ${JSON.stringify(workspace.workspaceFolders)}`);

  const fileExtension = path.extname(fileName);
  log.debug(`File extention: ${fileExtension}`);

  // const rule = findRule(fileExtension);
  // if (rule) {
  //   const related = match(fileExtension, fileName, rule);
  //   log.debug(`Matched file: ${related}`);
  // }

  // for (const rule of rules) {
  //   const related = match(fileName, rule);
  //   log.debug(`Matched file: ${related}`);

  //   if (related && fs.existsSync(related)) {
  //     // const document = await workspace.openTextDocument(related);
  //     // await window.showTextDocument(document);
  //     return;
  //   }
  // }
}
