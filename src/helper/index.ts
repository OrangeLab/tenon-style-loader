export const defaultInclude = ['less', 'styl', 'scss']

export type Loader = string

export const hasTenonLoaderReg = /tenon-loader/
export const tenonStyleLoaderPath = require.resolve('../index')
export function isArray(array: any){
  return Object.prototype.toString.call(array) === '[object Array]'
}

export function isObject(object:any){
  return Object.prototype.toString.call(object) === '[object Object]'
}

export function isAutoRule(rule:RegExp, includes: Array<string>){
  return includes.some((postfix:string) => {
    return rule.test(`index.${postfix}`)
  })
}

export function appendLoader(rule:any):Array<Loader>{
  if(!rule){
    return []
  }
  let loaders:Array<Loader> = [tenonStyleLoaderPath]
  if(isObject(rule.use)){
    loaders.push(rule.use.loader)
    return loaders
  }
  if(isArray(rule.use)){
    loaders = loaders.concat(rule.use)
  }
  return loaders
}

export function notHasTenonLoader(rule:any):Boolean{
  if(isObject(rule.use)){
    return hasTenonLoaderReg.test(rule.use.loader)
  }
  if(isArray(rule.use)){
    return rule.use.some((loader:string) => {
      return hasTenonLoaderReg.test(loader)
    })
  }
  return false
}