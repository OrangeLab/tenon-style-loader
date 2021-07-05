import { parseSelector, MatchType, RelationType } from "../src/style";

describe("style utils", () => {
  test("Selector Common class", () => {
    let selector = ".a";
    let resultSelector = parseSelector(selector);
    expect(JSON.stringify(resultSelector)).toBe(
      JSON.stringify({
        next: null,
        value: "a",
        matchType: MatchType.Class,
        relation: RelationType.Subselector,
      })
    );
  });

  test("Selector Common Id", () => {
    let selector = "#a";
    let resultSelector = parseSelector(selector);
    expect(JSON.stringify(resultSelector)).toBe(
      JSON.stringify({
        next: null,
        value: "a",
        matchType: MatchType.ID,
        relation: RelationType.Subselector,
      })
    );
  });

  test("Selector Common Tag", () => {
    let selector = "a";
    let resultSelector = parseSelector(selector);
    expect(JSON.stringify(resultSelector)).toBe(
      JSON.stringify({
        next: null,
        value: "a",
        matchType: MatchType.Tag,
        relation: RelationType.Subselector,
      })
    );
  });

  test("Selector Common Attr", () => {
    let selector = `["data-id"="test"]`;
    let resultSelector = parseSelector(selector);
    expect(JSON.stringify(resultSelector)).toBe(
      JSON.stringify({
        next: null,
        value: '"data-id"="test"',
        matchType: MatchType.Attr,
        relation: RelationType.Subselector,
      })
    );
  });

  test("Relation Multi", () => {
    let selector = ".b.a";
    let resultSelector = parseSelector(selector);
    expect(JSON.stringify(resultSelector)).toBe(
      JSON.stringify({
        next: {
          next: null,
          value: "b",
          matchType: MatchType.Class,
          relation: RelationType.Subselector,
        },
        value: "a",
        matchType: MatchType.Class,
        relation: RelationType.Subselector,
      })
    );
  });

  test("Relation Descendant", () => {
    let selector = ".b .a";
    let resultSelector = parseSelector(selector);
    expect(JSON.stringify(resultSelector)).toBe(
      JSON.stringify({
        next: {
          next: null,
          value: "b",
          matchType: MatchType.Class,
          relation: RelationType.Subselector,
        },
        value: "a",
        matchType: MatchType.Class,
        relation: RelationType.DescendantSpace,
      })
    );
  });

  test("Relation Descendant1", () => {
    let selector = ".c .b .a";
    let resultSelector = parseSelector(selector);
    expect(JSON.stringify(resultSelector)).toBe(
      JSON.stringify({
        next: {
          next: {
            next: null,
            value: "c",
            matchType: MatchType.Class,
            relation: RelationType.Subselector,
          },
          value: "b",
          matchType: MatchType.Class,
          relation: RelationType.DescendantSpace,
        },
        value: "a",
        matchType: MatchType.Class,
        relation: RelationType.DescendantSpace,
      })
    );
  });

  test("Relation Descendant2", () => {
    let selector = "b .a";
    let resultSelector = parseSelector(selector);
    expect(JSON.stringify(resultSelector)).toBe(
      JSON.stringify({
        next: {
          next: null,
          value: "b",
          matchType: MatchType.Tag,
          relation: RelationType.Subselector,
        },
        value: "a",
        matchType: MatchType.Class,
        relation: RelationType.DescendantSpace,
      })
    );
  });

  test("Relation Descendant2", () => {
    let selector = ".b a";
    let resultSelector = parseSelector(selector);
    expect(JSON.stringify(resultSelector)).toBe(
      JSON.stringify({
        next: {
          next: null,
          value: "b",
          matchType: MatchType.Class,
          relation: RelationType.Subselector,
        },
        value: "a",
        matchType: MatchType.Tag,
        relation: RelationType.DescendantSpace,
      })
    );
  });

  // test("Relation Other", () => {
  //   let selector = ".b + a";
  //   let resultSelector = parseSelector(selector);
  //   expect(JSON.stringify(resultSelector)).toBe(
  //     JSON.stringify({
  //       next: {
  //         next: null,
  //         value: "b",
  //         matchType: MatchType.Class,
  //         relation: RelationType.Subselector,
  //       },
  //       value: "a",
  //       matchType: MatchType.Tag,
  //       relation: RelationType.DescendantSpace,
  //     })
  //   );
  // });
});
