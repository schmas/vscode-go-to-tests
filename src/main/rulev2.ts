export interface Extension {
  ext: string;
  testExt: string[];
}

export interface Rule {
  extensions: Extension[];
  srcDirs: string[];
  testDirs: string[];
}

export const DEFAULT_RULES: Rule[] = [
  ////////////////////////////////////////////////////////
  // JavaScript / TypeScript
  ////////////////////////////////////////////////////////
  //--------------------//

  {
    extensions: [
      { ext: '.ts', testExt: ['.test.ts'] },
      { ext: '.tsx', testExt: ['.test.tsx'] },
    ],
    srcDirs: ['src'],
    testDirs: ['src/test', 'src/__tests__', 'test', '__tests__'],
  },

  // // *.* => test/*.test.*
  // { pattern: '([^/]+)\\.([^/.]+)$', replacement: 'test/$1.test.$2' },
  // { pattern: 'src/([^/]+)\\.([^/.]+)$', replacement: 'test/$1.test.$2' },
  // { pattern: '([^/]+)\\.([^/.]+)$', replacement: '__tests__/$1.test.$2' },
  // {
  //   pattern: '([^/]+)\\.([^/.]+)',
  //   replacement: 'test/suite/$1.test.$2',
  // },
  // // file.ts => file.test.ts
  // { pattern: '/([^/]+)\\.([^/.]+)$', replacement: '/$1.test.$2' },
  // { pattern: '/([^/]+)\\.test\\.([^/.]+)$', replacement: '/$1.$2' },
  // //--------------------//
  // // *.* => test/*.test.js
  // { pattern: '([^/]+)\\.([jt]sx?)$', replacement: 'test/$1.test.js' },
  // { pattern: '([^/]+)\\.([jt]sx?)$', replacement: '__tests__/$1.test.js' },
  // {
  //   pattern: '([^/]+)\\.([jt]sx?)',
  //   replacement: 'test/suite/$1.test.js',
  // },
  // // *.* => test/*.test.ts
  // { pattern: '([^/]+)\\.([jt]sx?)$', replacement: 'test/$1.test.ts' },
  // { pattern: '([^/]+)\\.([jt]sx?)$', replacement: '__tests__/$1.test.ts' },
  // {
  //   pattern: '([^/]+)\\.([jt]sx?)$',
  //   replacement: 'test/suite/$1.test.ts',
  // },
  // // *.* => test/*.test.jsx
  // { pattern: '([^/]+)\\.([jt]sx?)$', replacement: 'test/$1.test.jsx' },
  // { pattern: '([^/]+)\\.([jt]sx?)$', replacement: '__tests__/$1.test.jsx' },
  // {
  //   pattern: '([^/]+)\\.([jt]sx?)',
  //   replacement: 'test/suite/$1.test.jsx',
  // },
  // // *.* => test/*.test.tsx
  // { pattern: '([^/]+)\\.([jt]sx?)$', replacement: 'test/$1.test.tsx' },
  // { pattern: '([^/]+)\\.([jt]sx?)$', replacement: '__tests__/$1.test.tsx' },
  // {
  //   pattern: '([^/]+)\\.([jt]sx?)$',
  //   replacement: 'test/suite/$1.test.tsx',
  // },
  // //--------------------//
  // // test/*.test.* => *.*
  // {
  //   pattern: '(test|__tests__|test/suite)/([^/]+)\\.test\\.([^/.]+)$',
  //   replacement: '$2.$3',
  // },
  // {
  //   pattern: '(test|__tests__|test/suite)/([^/]+)\\.test\\.([^/.]+)$',
  //   replacement: 'src/$2.$3',
  // },
  // // test/*.test.* => *.js
  // {
  //   pattern: '(test|__tests__|test/suite)/([^/]+)\\.test\\.([^/.]+)$',
  //   replacement: '$2.js',
  // },
  // // test/*.test.* => *.ts
  // {
  //   pattern: '(test|__tests__|test/suite)/([^/]+)\\.test\\.([^/.]+)$',
  //   replacement: '$2.ts',
  // },
  // // test/*.test.* => *.jsx
  // {
  //   pattern: '(test|__tests__|test/suite)/([^/]+)\\.test\\.([^/.]+)$',
  //   replacement: '$2.jsx',
  // },
  // // test/*.test.* => *.tsx
  // {
  //   pattern: '(test|__tests__|test/suite)/([^/]+)\\.test\\.([^/.]+)$',
  //   replacement: '$2.tsx',
  // },
];
