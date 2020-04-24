import * as assert from 'assert';
import { before } from 'mocha';
import * as path from 'path';
import * as vscode from 'vscode';
import { findMatches } from '../../commands';
import { log } from '../../loggingService';

function assertIn<T>(e: T, a: T[]): void {
  if (!a.includes(e)) {
    throw new assert.AssertionError({
      message: `${JSON.stringify(e)} not in ${JSON.stringify(a)}`,
    });
  }
}

function transitive(path1: string, path2: string): void {
  assertIn(path.normalize(path2), findMatches(path1, ''));
  assertIn(path.normalize(path1), findMatches(path2, ''));
}

suite('JavaScript / TypeScript', () => {
  before(() => {
    vscode.window.showInformationMessage('Start JavaScript / TypeScript match tests.');
    log.setOutputLevel('INFO');
  });

  test('Mocha', () => {
    transitive('src/extension.ts', 'src/test/extension.test.ts');
  });

  // FIXME:
  // test('Jest', () => {
  //   transitive('src/components/foo/bar.tsx', 'src/components/foo/__tests__/bar.test.tsx');
  // });

  test('Jest file tsx <=> test ts', () => {
    transitive('src/__tests__/file.test.ts', 'src/file.tsx');
  });

  test('Jest file ts <=> test tsx', () => {
    transitive('src/__tests__/file.test.tsx', 'src/file.ts');
  });

  test('new VSCode', () => {
    transitive('src/extension.ts', 'src/test/suite/extension.test.ts');
  });

  test('xterm.js', () => {
    transitive('src/Terminal.ts', 'src/Terminal.test.ts');
  });
});
