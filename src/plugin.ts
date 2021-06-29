import webpack, { WebpackPluginInstance as Plugin } from "webpack";
import { TenonStylePluginOptions } from "./type";

declare class TenonStylePlugin implements Plugin {
  static NS: string;
  constructor(options?: TenonStylePluginOptions);
  apply(compiler: webpack.Compiler): void;
}

let Plugin: typeof TenonStylePlugin;
if (webpack.version && webpack.version[0] > "4") {
  // webpack5 and upper
  Plugin = require("./pluginWebpack5").default;
} else {
  // webpack4 and lower
  Plugin = require("./pluginWebpack4").default;
}

export default Plugin;
