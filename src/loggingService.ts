// tslint:disable-next-line: no-implicit-dependencies
import { window } from 'vscode';

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'NONE';

export class LoggingService {
  private outputChannel = window.createOutputChannel('Jump To Tests');

  private logLevel: LogLevel = 'DEBUG';

  public setOutputLevel(logLevel: LogLevel): void {
    this.logLevel = logLevel;
  }

  /**
   * Append messages to the output channel and format it with a title
   *
   * @param message The message to append to the output channel
   */
  public debug(message: string, data?: object): void {
    if (this.logLevel === 'INFO' || this.logLevel === 'NONE' || this.logLevel === 'WARN' || this.logLevel === 'ERROR') {
      return;
    }
    this.logMessage(message, 'DEBUG');
    if (data) {
      this.logObject(data);
    }
  }

  /**
   * Append messages to the output channel and format it with a title
   *
   * @param message The message to append to the output channel
   */
  public info(message: string, data?: object): void {
    if (this.logLevel === 'NONE' || this.logLevel === 'WARN' || this.logLevel === 'ERROR') {
      return;
    }
    this.logMessage(message, 'INFO');
    if (data) {
      this.logObject(data);
    }
  }

  /**
   * Append messages to the output channel and format it with a title
   *
   * @param message The message to append to the output channel
   */
  public warn(message: string, data?: object): void {
    if (this.logLevel === 'NONE' || this.logLevel === 'ERROR') {
      return;
    }
    this.logMessage(message, 'WARN');
    if (data) {
      this.logObject(data);
    }
  }

  public error(message: string, error?: Error): void {
    if (this.logLevel === 'NONE') {
      return;
    }
    this.logMessage(message, 'ERROR');
    if (error?.message) {
      this.logMessage(error.message, 'ERROR');
    }
    if (error?.stack) {
      this.outputChannel.appendLine(error.stack);
    }
  }

  public show(): void {
    this.outputChannel.show();
  }

  private logObject(data: object): void {
    const message = JSON.stringify(data, null, 2).trim();
    this.outputChannel.appendLine(message);
    console.log(message);
  }

  /**
   * Append messages to the output channel and format it with a title
   *
   * @param message The message to append to the output channel
   */
  private logMessage(message: string, logLevel: LogLevel): void {
    const title = new Date().toLocaleTimeString();
    const fullMessage = `["${logLevel}" - ${title}] ${message}`;
    this.outputChannel.appendLine(fullMessage);

    if (this.logLevel === 'DEBUG') {
      console.log(fullMessage);
    }
  }
}

export const log = new LoggingService();
