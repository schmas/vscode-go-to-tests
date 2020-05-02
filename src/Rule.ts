export class Rule {
  sourceExt: string;
  sourceDirs: string[] = [];
  targetExts: string[] = [];
  targetDirs: string[] = [];
  isTest: boolean;

  constructor(fromExt: string, isTest: boolean) {
    this.sourceExt = fromExt;
    this.isTest = isTest;
  }

  addSourceDir(dir: string): void {
    if (!this.sourceDirs.includes(dir)) this.sourceDirs.push(dir);
  }

  addSourceDirs(dirs: string[]): void {
    dirs.forEach((d) => this.addSourceDir(d));
  }

  addTargetExt(ext: string): void {
    if (!this.targetExts.includes(ext)) this.targetExts.push(ext);
  }

  addTargetExts(exts: string[]): void {
    exts.forEach((e) => this.addTargetExt(e));
  }

  addTargetDir(dir: string): void {
    if (!this.targetDirs.includes(dir)) this.targetDirs.push(dir);
  }

  addTargetDirs(dirs: string[]): void {
    dirs.forEach((d) => this.addTargetDir(d));
  }

  accept(fileName: string): boolean {
    return fileName.endsWith(this.sourceExt);
  }

  removeSourceExt(value: string): string {
    return value.replace(this.sourceExt, '');
  }

  removeSourceDir(dir: string): string {
    const srcDir = this.sourceDirs.sort((a, b) => b.length - a.length).find((d) => dir.startsWith(d)) || '';
    return dir.replace(srcDir, '');
  }
}
