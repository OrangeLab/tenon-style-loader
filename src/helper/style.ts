import postcss, { Root, Rule } from "postcss";

import { styleTransformer } from "@hummer/tenon-utils";
import {
  RuleSetMap,
  MatchType,
  CompileStyleOptions,
  RuleSet,
  ClassRule,
  Rule as CssRule,
  Selector,
} from "../style";

const isClassSelectorReg = /^\./;
const isTagSelectorReg = /\[.+\]/;
const isAttrSelectorReg = /\[.+\]/;
const isIDSelectorReg = /^\#/;
const isCommaSelectorReg = /,/;

/**
 * 针对Class的Selector进行特殊处理
 * 支持的Selectors如下：
 * 基础选择器：
 * #id ID选择器
 * .class Class选择器
 * view Tag选择器
 * 复杂选择器：属性选择器
 * .class[attr] 属性选择器
 * @param selector
 */
function handleSelector(
  ruleSetMap: RuleSetMap,
  selector: string,
  node: Rule,
  options: CompileStyleOptions
) {
  let selectorList = selector.split(/[\s,]/).filter((item) => !!item);
  let lastSelector = selectorList.pop() as string;
  let style = getRuleStyle(node);
  let { scoped, id = "" } = options;

  if (isClassSelectorReg.test(lastSelector)) {
    let className = lastSelector.slice(1);
    let selector = new Selector(className, MatchType.Class);
    let classRule = new ClassRule(selector, style);
    collectRuleWithScoped(ruleSetMap, MatchType.Class, classRule, scoped, id);
    return;
  }
  // TODO Support Attr Selector
  if (isAttrSelectorReg.test(lastSelector)) {
  }

  // TODO Support ID Selector
  if (isIDSelectorReg.test(lastSelector)) {
  }

  // TODO Support Tag Selector
  if (isTagSelectorReg.test(lastSelector)) {
  }
  return "";
}

function generateCode(ruleSetMap: RuleSetMap, options: CompileStyleOptions) {
  let { packageName } = options;
  let styleCode = `
    var ruleSetMap = ${ruleSetMap.toJsonString()};
    var options = ${JSON.stringify(options)};
  `;
  return `
    import {collectStyle} from '${packageName}';
    export default (function(){
      ${styleCode}
      return collectStyle(ruleSetMap, options);
    })();
  `;
}

function getRuleStyle(node: Rule): Record<string, string> {
  let style: any = {};
  node.each((item: any) => {
    let { prop, value } = item;
    style[prop] = value;
  });
  style = styleTransformer.transformStyle(style);
  return style;
}

export const compileStyle = function (
  source: string,
  options: CompileStyleOptions = { scoped: false }
) {
  let ruleSetMap = new RuleSetMap();
  postcss([getCollectPlugin(ruleSetMap, options)]).process(source, {
    from: undefined,
  }).css;
  let code = generateCode(ruleSetMap, options);
  return code;
};

export function getCollectPlugin(
  ruleSetMap: RuleSetMap,
  customOptions: CompileStyleOptions
) {
  return {
    postcssPlugin: "collect-rule",
    Once(root: Root) {
      root.each(function collectRule(node) {
        if (node.type !== "rule") {
          // 不支持媒体查询
          return;
        }
        let { selector } = node;
        if (isCommaSelector(selector)) {
          // Handle ',' case
          let selectors = selector.split(/,/).filter((item) => !!item);
          selectors.forEach((item) => {
            handleSelector(ruleSetMap, item, node, customOptions);
          });
        } else {
          handleSelector(ruleSetMap, selector, node, customOptions);
        }
      });
    },
  };
}

function isCommaSelector(selector: string) {
  return isCommaSelectorReg.test(selector);
}

/**
 * 处理样式隔离
 */
function collectRuleWithScoped(
  ruleSetMap: RuleSetMap,
  type: MatchType,
  rule: CssRule,
  scoped: boolean,
  id?: string
) {
  if (scoped && id) {
    // Support Scoped Css
    let ruleSet = ruleSetMap.getItem(id);
    if (!ruleSet) {
      ruleSet = new RuleSet();
      ruleSetMap.setItem(id, ruleSet);
    }
    ruleSet.appendRule(type, rule);
  } else {
    ruleSetMap.global.appendRule(type, rule);
  }
}
