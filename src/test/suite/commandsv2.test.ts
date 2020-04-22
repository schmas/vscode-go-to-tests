// import * as assert from 'assert';
// import { before } from 'mocha';

// // You can import and use all API from the 'vscode' module
// // as well as import your extension to test it
// import * as vscode from 'vscode';
// import { Rule, DEFAULT_RULES } from '../../main/rulev2';
// import { match } from '../../main/commandsv2';

// function allMatches(path: string): string[] {
//   const out: string[] = [];
//   for (const rule of DEFAULT_RULES) {
//     const matched = match(path, rule);
//     if (matched) {
//       out.push(matched);
//     }
//   }
//   return out;
// }

// function assertIn<T>(e: T, a: T[]): void {
//   if (!a.includes(e)) {
//     throw new assert.AssertionError({
//       message: `${JSON.stringify(e)} not in ${JSON.stringify(a)}`,
//     });
//   }
// }

// function transitive(path1: string, path2: string): void {
//   assertIn(path2, allMatches(path1));
//   assertIn(path1, allMatches(path2));
// }

// suite('JavaScript / TypeScript', () => {
//   before(() => {
//     vscode.window.showInformationMessage('Start JavaScript / TypeScript match tests.');
//   });

//   test('Mocha', () => {
//     transitive('/home/brian/test-switcher/src/extension.ts', '/home/brian/test-switcher/src/test/extension.test.ts');
//   });

//   // test('Jest', () => {
//   //   transitive('src/components/foo/bar.tsx', 'src/components/foo/__tests__/bar.test.tsx');
//   // });

//   // test('Jest file tsx <=> test ts', () => {
//   //   transitive('src/__tests__/file.test.ts', 'src/file.tsx');
//   // });

//   // test('Jest file ts <=> test tsx', () => {
//   //   transitive('src/__tests__/file.test.tsx', 'src/file.ts');
//   // });

//   // test('new VSCode', () => {
//   //   transitive('/home/brian/test/src/extension.ts', '/home/brian/test/src/test/suite/extension.test.ts');
//   // });

//   // test('foo.ts <=> test.foo.js', () => {
//   //   transitive('src/worker.ts', 'src/__tests__/worker.test.js');
//   // });

//   // test('xterm.js', () => {
//   //   transitive('xterm.js/src/Terminal.ts', 'xterm.js/src/Terminal.test.ts');
//   // });
// });
