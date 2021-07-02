import { MatchType } from "./style-rule";

export enum RelationType {
  Subselector, // No combinator(Default) .a | .a.b
  DescendantSpace, // .a .b
  Child, // .a > .b
  DirectAdjacent, // .a + .b
  IndirectAdjacent, // .a ~ .b
}

export class Selector {
  value: string;
  matchType: MatchType;
  relation: RelationType;
  next: Selector | null = null;
  constructor(
    value: string,
    matchType: MatchType,
    relation: RelationType = RelationType.Subselector
  ) {
    this.value = value;
    this.matchType = matchType;
    this.relation = relation;
  }
  appendNext(selector: Selector) {
    this.next = selector;
  }
}

