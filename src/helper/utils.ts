import qs from 'querystring'

export function getOptions(loaderContext:any){
  const query = loaderContext.query;

  if (typeof query === 'string' && query !== '') {
    return qs.parse(loaderContext.query.slice(1));
  }

  if (!query || typeof query !== 'object') {
    return {};
  }

  return query;
}