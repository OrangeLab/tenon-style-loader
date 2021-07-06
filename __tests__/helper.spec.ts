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

  test("Compile Style With Scoped", () => {
    let styleContent = `
      .box{
        box-sizing: border-box;
      }
    `;
    let code = compileStyle(styleContent, {
      scoped: true,
      id: "test",
      packageName: "@hummer/tenon-vue",
    });
    expect(code).toMatchSnapshot();
  });

  test("Compile Style With Multi Selector", () => {
    let styleContent = `
      .box.box-item{
        box-sizing: border-box;
      }
    `;
    let code = compileStyle(styleContent, {
      scoped: false,
      packageName: "@hummer/tenon-vue",
    });
    expect(code).toMatchSnapshot();
  });
  test("Compile Style With Multi Selector2", () => {
    let styleContent = `
      .box .box-item{
        box-sizing: border-box;
      }
    `;
    let code = compileStyle(styleContent, {
      scoped: false,
      packageName: "@hummer/tenon-vue",
    });
    expect(code).toMatchSnapshot();
  });
  test("Compile Style With Comma Selector", () => {
    let styleContent = `
      .box, .box-item{
        box-sizing: border-box;
      }
    `;
    let code = compileStyle(styleContent, {
      scoped: false,
      packageName: "@hummer/tenon-vue",
    });
    expect(code).toMatchSnapshot();
  });
  test("Compile Style With Comma Selector1(Less)", () => {
    let styleContent = `
      .box, 
      .box-item{
        box-sizing: border-box;
      }
    `;
    let code = compileStyle(styleContent, {
      scoped: false,
      packageName: "@hummer/tenon-vue",
    });
    expect(code).toMatchSnapshot();
  });

  test("@media style", () => {
    // Expect Filter Media Info
    let styleContent = `
      @media screen and (min-width: 900px) {
        article {
          padding: 1rem 3rem;
        }
      }
    `;
    let code = compileStyle(styleContent, {
      scoped: false,
      packageName: "@hummer/tenon-vue",
    });
    expect(code).toMatchSnapshot();
  });
});
