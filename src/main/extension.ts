import { ExtensionContext, commands, workspace } from 'vscode';
import { log } from './loggingService';
import { jump, updateFromConfig } from './commands';
import { jump as jump2, updateFromConfig as updateFromConfig2 } from './commandsv2';

export function activate(context: ExtensionContext): void {
  log.debug('Initializing Jump to Tests...');

  context.subscriptions.push(commands.registerCommand('jump-to-tests.jump', jump));
  context.subscriptions.push(commands.registerCommand('jump-to-tests.jump2', jump2));
  context.subscriptions.push(workspace.onDidChangeConfiguration(updateFromConfig));
  context.subscriptions.push(workspace.onDidChangeConfiguration(updateFromConfig2));

  updateFromConfig();
  updateFromConfig2();
  log.info('Jump to Tests is now active!');
}

// this method is called when your extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate(): void {}
