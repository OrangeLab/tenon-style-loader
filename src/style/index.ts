export * from "./style-rule";
export * from "./selector";
export * from "./parser";
export interface CompileStyleOptions {
  scoped: boolean;
  id?: string;
  packageName?: string;
}
