// import bind from "../src/index"
const bind = require("../src/index")
test1('bind能用')
test2('测试fn.bind(asThis)')
test3('测试fn.bind(asThis, param1, param2)')
test4('测试 fn.bind(asThis)(param1, param2)')
test5('测试 fn.bind(asThis, param1, param2)(p3, p4)')
function test1(message){
  console.log(message)
  Function.prototype.bind2=bind
  console.assert(Function.prototype.bind2 !== undefined)
}
function test2(message){
  console.log(message)
  Function.prototype.bind2=bind
  // 测试fn.bind(asThis)
  const fn1 = function(){
    return this
  }
  const newFn1 = fn1.bind2({aaa:'bbb'})
  console.assert(newFn1().aaa === 'bbb')
}
function test3(message){
  console.log(message)
  Function.prototype.bind2=bind
  // 测试fn.bind(asThis, param1, param2)
  const fn2 = function(p1,p2){
    return [this,p1,p2]
  }
  const newFn2 = fn2.bind2({aaa:'bbb'},111,222)
  console.assert(newFn2()[0].aaa === 'bbb')
  console.assert(newFn2()[1] === 111)
  console.assert(newFn2()[2] === 222)
}

function test4(message){
  console.log(message)
  Function.prototype.bind2=bind
  // 测试 fn.bind(asThis)(param1, param2)
  const fn2 = function(p1,p2){
    return [this,p1,p2]
  }
  const anotherFn2 = fn2.bind2({aaa:'bbb'})
  console.assert(anotherFn2('s1','s2')[0].aaa === 'bbb')
  console.assert(anotherFn2('s1','s2')[1] === 's1')
  console.assert(anotherFn2('s1','s2')[2] === 's2')
}

function test5(message){
  console.log(message)
  Function.prototype.bind2=bind
  // 测试 fn.bind(asThis, param1, param2)(p3, p4)
  const fn2 = function(p1,p2){
    return [this,p1,p2]
  }
  const otherFn2 = fn2.bind2({aaa:'bbb'},666)
  console.assert(otherFn2('s1')[0].aaa === 'bbb')
  console.assert(otherFn2('s1')[1] === 666)
  console.assert(otherFn2('s1')[2] === 's1')
}

