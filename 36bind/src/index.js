
var slice = Array.prototype.slice
function bind(asThis){
  var fn = this
  var args1 = slice.call(arguments,1)
  if(typeof fn !== 'function'){
    throw new Error('bind必须调用在函数身上')
  }
  function resultFn(){
    var args2=slice.call(arguments,0) // 不可以省略，伪数组转成数组
    return fn.apply(resultFn.prototype.isPrototypeOf(this)?this:asThis,
      args1.concat(args2))
  }
  resultFn.prototype=fn.prototype
  return resultFn
}
// 简洁版-使用了es6的语法，（但是bind都不支持，es6的新语法也不支持）
function _bind(asThis, ...args){
  let fn = this
  function resultFn(...args2){
    /**
     * new 做了什么
     * this; //new 生成的temp也就是this
     * this.__proto__=resultFn.prototype
     * this.p1='x1'; this.p2='y1'
     * return this
     */
    // resultFn.prototype.isPrototypeOf(this)
    // this instanceof resultFn 
    return fn.call(this instanceof resultFn ? this : asThis,
      ...args,
      ...args2
    )
  }
  // console.log('fn.prototype',fn.prototype)
  // console.log('resultFn.prototype',resultFn.prototype)
  resultFn.prototype = fn.prototype
  return resultFn
}
// export default bind
module.exports = bind
if(!Function.prototype.bind){
  Function.prototype.bind=bind
}