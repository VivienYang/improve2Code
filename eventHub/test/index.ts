import EventHub from '../src/index'

type Testcase=(message:string)=>void

const test1:Testcase=(message)=>{
  const eventHub=new EventHub()
  console.assert(eventHub instanceof Object,'eventHub是个对象')
  console.log(message)
}

const test2:Testcase=(message)=>{
  const eventHub=new EventHub()
  eventHub.on('xxx',(data)=>{
    if(data instanceof Object ) data=JSON.stringify(data)
    console.log(`xxx事件被触发了，执行fn1，收到的data是${data}`)
  })
  eventHub.on('xxx',(data)=>{
    if(data instanceof Object) data=JSON.stringify(data)
    console.log(`xxx事件被触发了，执行fn2，收到的data是${data}`)
  })
  eventHub.emit('xxx',111)
  eventHub.emit('xxx',{username:'Lily',age:22})
  console.log(message)
}
const test3:Testcase=(message)=>{
  const eventHub=new EventHub()
  let called=false
  const fn1=(data:unknown)=>{
    called=true
    console.log(data)
  }
  eventHub.on('yyy',fn1)
  eventHub.off('yyy',fn1)
  eventHub.emit('yyy','我要调用fn1')
  setTimeout(()=>{
    // 预期打印出：fn1没有被调用（也就是说called为false）
    console.assert(called,'fn1没有被调用')
    console.log(message)
  },1000)
  
}

test1('EventHub可以创建对象')
test2(".on 了之后 .emit，会触发 .on 的函数");
test3(".off 有用");
// test3()