import { ExtensionContext, commands, workspace } from 'vscode';
import { log } from './loggingService';
import { doSwitch, updateFromConfig } from './gotoTests';

export function activate(context: ExtensionContext): void {
  log.debug('Initializing Go to Tests...');

  context.subscriptions.push(commands.registerCommand('go-to-tests.jump', doSwitch));
  context.subscriptions.push(workspace.onDidChangeConfiguration(updateFromConfig));

  updateFromConfig();
  log.info('Go to Tests is now active!');
}

// this method is called when your extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate(): void {}
