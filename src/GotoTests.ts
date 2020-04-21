import { LoggingService } from './LoggingService';

export default class GotoTests {
  // private disposable: Disposable;

  public constructor(private log = new LoggingService()) {
    log.debug('Initializing Go to Tests...');

    log.info('Go to Tests is now active!');
  }

  public dispose(): void {
    // this.disposable.dispose();
  }
}
