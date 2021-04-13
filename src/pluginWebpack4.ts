import {TenonStylePluginOptions} from './type'
import {defaultInclude,isAutoRule, appendLoader} from './helper'
import { Compiler } from 'webpack'

const NS = 'tenon-style-plugin'
class TenonStylePlugin{
  static NS = NS
  options = {
    include: defaultInclude
  }
  constructor(options?:TenonStylePluginOptions){
    this.options = Object.assign(this.options, options)
  }

  apply(compiler: Compiler){
    const rules = compiler.options.module.rules as any;
    // 自动化添加 Tenon Style Loader，避免业务方忘记添加
    for(const rawRule of rules){
      if(isAutoRule(rawRule.test, this.options.include)){
        rawRule.use = appendLoader(rawRule)
      }
    }
  }
}

export default TenonStylePlugin