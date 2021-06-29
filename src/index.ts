import TenonStylePlugin from "./plugin";
import { compileStyle } from "./helper/style";
import { getOptions } from "./helper/utils";
import { DefaultPackageName } from "./helper";
import qs from "querystring";

const StylePostLoader = function (source: string) {
  const query = qs.parse(this.resourceQuery.slice(1));
  const { id, scoped } = query;
  const scopedId = `data-v-${id}`;
  const options = getOptions(this);
  const { packageName } = options;

  let code = compileStyle(source, {
    scoped: scoped === "true" ? true : false,
    id: scopedId,
    packageName: packageName || DefaultPackageName,
  });
  return code;
};

export { TenonStylePlugin };
export default StylePostLoader;
