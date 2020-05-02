import { workspace } from 'vscode';
import { RuleConfig, DEFAULT_RULES } from './rules';
import { log, LogLevel } from './loggingService';
import { Rule } from './Rule';

export interface RuleRecord {
  [ext: string]: Rule;
}

function transforConfigRules(configRules: RuleConfig[]): RuleRecord {
  const sourceRules: RuleRecord = {};
  const testRules: RuleRecord = {};
  for (const ruleConfig of configRules) {
    const { extensions, srcDirs, testDirs } = ruleConfig;
    for (const extension of extensions) {
      const { ext, testExts } = extension;
      let srcRule = sourceRules[ext];
      if (!!!srcRule) {
        srcRule = new Rule(ext, false);
        sourceRules[ext] = srcRule;
      }
      srcRule.addSourceDirs(srcDirs);
      srcRule.addTargetExts(testExts);
      srcRule.addTargetDirs(testDirs);
      for (const testExt of testExts) {
        let testRule = testRules[testExt];
        if (!!!testRule) {
          testRule = new Rule(testExt, true);
          testRules[testExt] = testRule;
        }
        testRule.addSourceDirs(testDirs);
        testRule.addTargetExt(ext);
        testRule.addTargetDirs(srcDirs);
      }
    }
  }
  return { ...testRules, ...sourceRules };
}

let rules: RuleRecord = transforConfigRules(DEFAULT_RULES);
export const getRules = (): RuleRecord => rules;

export function updateRulesConfig(): void {
  const configuration = workspace.getConfiguration('jump-to-tests');
  const extraRules: RuleConfig[] = configuration.get('rules') || [];
  const override: boolean = configuration.get('overrideRules') || false;

  const configRules = override ? [...extraRules] : [...extraRules, ...DEFAULT_RULES];

  rules = transforConfigRules(configRules);
}

export function updateLogConfig(): void {
  const configuration = workspace.getConfiguration('jump-to-tests');
  const logLevel: LogLevel = (configuration.get('logLevel') || 'INFO') as LogLevel;
  log.setOutputLevel(logLevel);
}

export function updateAllConfigs(): void {
  updateLogConfig();
  updateRulesConfig();
}
