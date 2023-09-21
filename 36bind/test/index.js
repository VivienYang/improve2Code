// import bind from "../src/index"
const bind = require("../src/index")

Function.prototype.bind2=bind

console.assert(Function.prototype.bind2 !== undefined)

// 测试fn.bind(asThis)
const fn1 = function(){
  return this
}
const newFn1 = fn1.bind2({aaa:'bbb'})
console.assert(newFn1().aaa === 'bbb')

// 测试fn.bind(asThis, param1, param2)
const fn2 = function(p1,p2){
  return [this,p1,p2]
}
const newFn2 = fn2.bind2({aaa:'bbb'},111,222)
console.assert(newFn2()[0].aaa === 'bbb')
console.assert(newFn2()[1] === 111)
console.assert(newFn2()[2] === 222)

// 测试 fn.bind(asThis)(param1, param2)
const anotherFn2 = fn2.bind2({aaa:'bbb'})
console.assert(anotherFn2('s1','s2')[0].aaa === 'bbb')
console.assert(anotherFn2('s1','s2')[1] === 's1')
console.assert(anotherFn2('s1','s2')[2] === 's2')

// 测试 fn.bind(asThis, param1, param2)(p3, p4)
const otherFn2 = fn2.bind2({aaa:'bbb'},666)
console.assert(otherFn2('s1')[0].aaa === 'bbb')
console.assert(otherFn2('s1')[1] === 666)
console.assert(otherFn2('s1')[2] === 's1')