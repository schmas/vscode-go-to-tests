import * as vscode from 'vscode';
import GotoTests from './GotoTests';
import { LoggingService } from './LoggingService';

export function activate(context: vscode.ExtensionContext): void {
  const loggingService = new LoggingService();

  context.subscriptions.push(new GotoTests(loggingService));

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('go-to-tests.helloWorld', () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World from Go to Tests!');
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate(): void {}
