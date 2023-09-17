class Promise2{
  callbacks:Array<Array<Function>>=[]
  state='pending'
  
  resolve(result:any){
    setTimeout(()=>{
      if(this.state!=='pending') return
      this.state='fulfilled'
      this.callbacks.forEach((handle)=>{
        if(typeof handle[0]==='function'){
          handle[0].call(undefined,result)
        }
      })
    },0)
  };
  reject(reason:any){
    setTimeout(()=>{
      if(this.state!=='pending') return
      this.state='rejected'
      this.callbacks.forEach((handle)=>{
        if(typeof handle[1]==='function'){
          handle[1].call(undefined,reason)
        }
      })
    },0)
  };
  constructor(fn:unknown){
    if(typeof fn!=='function'){
      throw new Error('我只接受函数')
    }
    fn(this.resolve.bind(this),this.reject.bind(this))
  }
  then(succeed?:any,fail?:any){
    let handle:Array<Function>=[]
    if(typeof succeed==='function'){
      handle[0]=succeed
    }
    if(typeof fail==='function'){
      handle[1]=fail
    }
    this.callbacks.push(handle)
  }
}
export default Promise2