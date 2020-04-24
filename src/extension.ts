import { ExtensionContext, commands, workspace } from 'vscode';
import { log } from './loggingService';
import { jump } from './commands';
import { updateLogConfig, updateAllConfigs } from './config';

export function activate(context: ExtensionContext): void {
  updateLogConfig();
  log.debug('Initializing Jump to Tests...');

  context.subscriptions.push(commands.registerCommand('jump-to-tests.jump', jump));
  context.subscriptions.push(workspace.onDidChangeConfiguration(updateAllConfigs));

  updateAllConfigs();
  log.info('Jump to Tests is now active!');
}

// this method is called when your extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate(): void {}
