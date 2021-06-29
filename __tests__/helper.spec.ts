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
    expect(code).toMatchSnapshot();
  });
});
