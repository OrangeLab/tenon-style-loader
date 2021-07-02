import { StyleRelation } from "./style-relation";

export type Selector = string;
export interface Style {
  [key: string]: string | number;
}

export enum MatchType {
  Class,
  ID,
  Attr,
  Tag,
}

export class RuleSetMap {
  public global: RuleSet = new RuleSet();
  private scopedItems: Record<string, RuleSet> = {};
  constructor() {}

  getItem(id: string) {
    return this.scopedItems[id];
  }

  setItem(id: string, ruleSet: RuleSet) {
    this.scopedItems[id] = ruleSet;
  }

  toJsonString() {
    return JSON.stringify({
      global: this.global,
      ...this.scopedItems,
    });
  }
}

export class RuleSet {
  // tagList: Array<Rule> = [];
  classList: Array<Rule> = []; // 暂时只支持 Class Selector
  // idList: Array<Rule> = [];
  // attrList: Array<Rule> = [];

  constructor() {}

  appendRule(type: MatchType, rule: Rule) {
    switch (type) {
      case MatchType.Class:
        this.appendClassRule(rule);
        break;
        // case MatchType.Tag:
        //   this.appendTagRule(rule);
        //   break;
        // case MatchType.ID:
        //   this.appendIdRule(rule);
        //   break;
        // case MatchType.Attr:
        //   this.appendAttrRule(rule);
        break;
      default:
        break;
    }
  }

  appendClassRule(rule: ClassRule) {
    this.classList.push(rule);
  }

  // appendTagRule(rule: TagRule) {
  //   this.tagList.push(rule);
  // }

  // appendIdRule(rule: IdRule) {
  //   this.idList.push(rule);
  // }

  // appendAttrRule(rule: AttrRule) {
  //   this.classList.push(rule);
  // }
}

export class Rule {
  public selector: Selector;
  public matchType: MatchType;
  public relation: StyleRelation | null = null;
  public style: Style;
  constructor(selector: Selector, style: Style) {
    this.selector = selector;
    this.style = style;
  }

  appendRelation(relation: StyleRelation) {
    this.relation = relation;
  }
}

export class ClassRule extends Rule {
  matchType = MatchType.Class;
  constructor(selector: Selector, style: Style) {
    super(selector, style);
  }
}

export class TagRule extends Rule {
  matchType = MatchType.Tag;
  constructor(selector: Selector, style: Style) {
    super(selector, style);
  }
}

export class IdRule extends Rule {
  matchType = MatchType.ID;
  constructor(selector: Selector, style: Style) {
    super(selector, style);
  }
}

export class AttrRule extends Rule {
  matchType = MatchType.Attr;
  constructor(selector: Selector, style: Style) {
    super(selector, style);
  }
}
