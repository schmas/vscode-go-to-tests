import { workspace, window } from 'vscode';
import * as fs from 'fs';
import { DEFAULT_RULES, Rule } from './rule';

let rules = DEFAULT_RULES;

export function updateFromConfig(): void {
  const configuration = workspace.getConfiguration('test-switcher');
  const extraRules: Rule[] = configuration.get('rules') || [];
  rules = [...extraRules, ...DEFAULT_RULES];
}

export function match(path: string, rule: Rule): string | undefined {
  const { pattern, replacement } = rule;
  let regex: RegExp;
  try {
    regex = new RegExp(pattern);
  } catch {
    return;
  }
  if (!path.match(regex)) {
    return;
  }
  const replaced = path.replace(regex, replacement);
  return replaced;
}

export async function jump(): Promise<void> {
  const editor = window.activeTextEditor;
  if (!editor) {
    return;
  }

  const fileName = editor.document.fileName;
  for (const rule of rules) {
    const related = match(fileName, rule);
    if (related && fs.existsSync(related)) {
      const document = await workspace.openTextDocument(related);
      await window.showTextDocument(document);
      return;
    }
  }
}
