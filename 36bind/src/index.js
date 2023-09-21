
var slice = Array.prototype.slice
function bind(asThis){
  var fn = this
  var args1 = slice.call(arguments,1)
  if(typeof fn !== 'function'){
    throw new Error('bind必须调用在函数身上')
  }
  return function(){
    var args2=slice.call(arguments,0) // 不可以省略，伪数组转成数组
    return fn.apply(asThis,args1.concat(args2))
  }
}
// 简洁版-使用了es6的语法，（但是bind都不支持，es6的新语法也不支持）
function _bind(asThis, ...args){
  let fn = this
  return function(...args2){
    return fn.call(asThis,...args,...args2)
  }
}
// export default bind
module.exports = bind
if(!Function.prototype.bind){
  Function.prototype.bind=bind
}