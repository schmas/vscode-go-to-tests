import { workspace } from 'vscode';
import { Rule, DEFAULT_RULES } from './rule';
import { log, LogLevel } from './loggingService';

let rules = DEFAULT_RULES;

export const getRules = (): Rule[] => rules;

export function updateRulesConfig(): void {
  const configuration = workspace.getConfiguration('jump-to-tests');
  const extraRules: Rule[] = configuration.get('rules') || [];
  rules = [...extraRules, ...DEFAULT_RULES];
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
