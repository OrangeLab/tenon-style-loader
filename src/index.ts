import TenonStylePlugin from './plugin'
import { compileStyle } from './helper/style'
import qs from 'querystring'

const StylePostLoader = function(source: string) {
  const query = qs.parse(this.resourceQuery.slice(1))
  const { id, scoped } = query
  const scopedId = `data-v-${id}`

  let code = compileStyle(source, {
    scoped: scoped === 'true' ? true : false,
    id: scopedId
  })
  return code
}

export {TenonStylePlugin}
export default StylePostLoader

