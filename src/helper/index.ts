export const defaultInclude: Array<string> = ["less", "stylus", "scss", "sass"];

export type Loader = string;
export type RuleTest = RegExp | string;
export const hasTenonLoaderReg = /tenon-loader/;
export const tenonStyleLoaderPath = require.resolve("../index");
export function isArray(array: any) {
  return Object.prototype.toString.call(array) === "[object Array]";
}

export function isObject(object: any) {
  return Object.prototype.toString.call(object) === "[object Object]";
}

export function isAutoRule(rule: RuleTest, includes: Array<string>) {
  if (typeof rule === "string") {
    rule = new RegExp(rule);
  }
  return includes.some((postfix: string) => {
    return (rule as RegExp).test(`index.${postfix}`);
  });
}

export function appendLoader(rule: any, options: any): Array<Loader> {
  if (!rule) {
    return [];
  }
  let loaders: Array<any> = [
    {
      loader: tenonStyleLoaderPath,
      options: {
        packageName: options.packageName,
      },
    },
  ];
  if (isObject(rule.use)) {
    loaders.push(rule.use.loader);
    return loaders;
  }
  if (isArray(rule.use)) {
    loaders = loaders.concat(rule.use);
  }
  return loaders;
}

export function notHasTenonLoader(rule: any): Boolean {
  if (isObject(rule.use)) {
    return hasTenonLoaderReg.test(rule.use.loader);
  }
  if (isArray(rule.use)) {
    return rule.use.some((loader: string) => {
      return hasTenonLoaderReg.test(loader);
    });
  }
  return false;
}

export const DefaultPackageName = "@hummer/tenon-vue";
