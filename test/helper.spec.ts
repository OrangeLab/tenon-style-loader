import { compileStyle } from "../src/helper/style";

describe("style", () => {
  test("Compile Style Base", () => {
    let styleContent = `
      .box{
        box-sizing: border-box;
      }
    `;
    let code = compileStyle(styleContent, {
      scoped: false,
      packageName: "@hummer/tenon-vue",
    });
    // let result = `
    // import {collectStyle} from '@hummer/tenon-vue';
    // export default (function(){
    //   var ruleSetMap = {"global":{"tagList":[],"classList":[{"selector":"box","matchType":0,"relation":"","style":{"boxSizing":"border-box"}}],"idList":[],"attrList":[]}};
    //   return collectStyle(ruleSetMap, options);
    // })();
    // `;
    console.log("Code:");
    console.log(code);

    expect(code).toMatchSnapshot();
  });
});
