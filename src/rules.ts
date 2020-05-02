export interface Extension {
  ext: string;
  testExts: string[];
}

export interface RuleConfig {
  extensions: Extension[];
  srcDirs: string[];
  testDirs: string[];
}

export const DEFAULT_RULES: RuleConfig[] = [
  ////////////////////////////////////////////////////////
  // JavaScript / TypeScript
  ////////////////////////////////////////////////////////

  {
    extensions: [
      { ext: '.ts', testExts: ['.test.ts', '.test.tsx'] },
      { ext: '.tsx', testExts: ['.test.tsx', '.test.ts'] },
      { ext: '.js', testExts: ['.test.js', '.test.jsx'] },
      { ext: '.jsx', testExts: ['.test.jsx', '.test.js'] },
    ],
    srcDirs: ['src', 'app', ''],
    testDirs: ['src/test', 'src/test/suite', 'tests', 'test', 'src', 'app', ''],
  },
];
