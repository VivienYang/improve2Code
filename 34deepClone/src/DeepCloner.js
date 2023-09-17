class DeepCloner{
  cache_source = []
  cache_dist = []
  deepClone(source){
    if(source instanceof Object){
      let idx=this.cache_source.indexOf(source)
      // console.log(this.cache_source)
      if(idx>-1){
        // console.log('有缓存----cache_source----idx--',this.cache_source,idx,)
        // console.log('cache_source[idx]',this.cache_source[idx])
        // console.log('cache_dist[idx]',this.cache_dist[idx])
        return this.cache_dist[idx]
      }
      // console.log('没缓存----cache_source----idx--',this.cache_source,idx,)
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
      this.cache_source.push(source)
      this.cache_dist.push(dist)
      for(let key in source){
        if(source.hasOwnProperty(key)){
          dist[key]=this.deepClone(source[key])
        }
      }
      // this.cache_source.push(source)
      // this.cache_dist.push(dist)
      return dist
    }
    return source
  }  
}

// export default this.deepClone
module.exports = DeepCloner