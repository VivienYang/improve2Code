
// object中的method方法调用时this是什么
fn=function(p1,p2){console.log(this,p1,p2)}
fn(1,2)
var obj={
  f:fn,
}
obj.f(11,22)
obj.f.call(0,1,2)
obj.f.call('123',1,2)

//数组中的函数调用时this是什么
array=[function(p1){console.log(this,p1)},'xhhssh']
array[0]('hi')

// 面试题
let length = 10
function fn(){
  console.log(this.length) 
  // 第一次this是window
  // 第二次this是arguments,arguments是[fn,1]，所以.length是2
}
let obj = {
  length: 5,
  method(fn){
    fn() //fn.call(undefined)
    arguments[0]() //arguments[0].call(arguments)
  }
}
obj.method(fn,1) // 输出什么，有陷阱

let length1=10
var length2=11
console.log(window.length1) //undefined
console.log(window.length2) //11
