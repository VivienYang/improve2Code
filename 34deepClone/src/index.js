let cache_source = []
let cache_dist = []
function deepClone(source){
  if(source instanceof Object){
    let idx=cache_source.indexOf(source)
    // console.log(cache_source)
    if(idx>-1){
      // console.log('有缓存----cache_source----idx--',cache_source,idx,)
      // console.log('cache_source[idx]',cache_source[idx])
      // console.log('cache_dist[idx]',cache_dist[idx])
      return cache_dist[idx]
    }
    // console.log('没缓存')
    let dist
    if(source instanceof Array){
      dist = new Array()
    }else if(source instanceof Function){
      dist = function(){
        return source.apply(this,arguments)
      }
    }else if(source instanceof RegExp){
      dist = new RegExp(source.source, source.flags)
    }else if(source instanceof Date){
      dist = new Date(source)
    }else{
      dist = new Object()
    }
    cache_source.push(source)
    cache_dist.push(dist)
    for(let key in source){
      if(source.hasOwnProperty(key)){
        dist[key]=deepClone(source[key])
      }
    }
    // cache_source.push(source)
    // cache_dist.push(dist)
    return dist
  }
  return source
}
// export default deepClone
module.exports = deepClone