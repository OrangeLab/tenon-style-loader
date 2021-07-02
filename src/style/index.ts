export * from "./style-rule";
export * from "./selector";
export interface CompileStyleOptions {
  scoped: boolean;
  id?: string;
  packageName?: string;
}
