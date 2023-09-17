class EventHub{
  eventCache:{[eventName:string]:Array<(data?:unknown)=>void>}={}
  // {
  //   event1:[fn1,fn2...],
  //   event2:[fn3,fn4...]
  // }
  on(eventName:String,fn:(data?:unknown)=>void){
    this.eventCache.eventName=this.eventCache.eventName||[]
    this.eventCache.eventName.push(fn)
  }
  emit(eventName:String,data?:unknown){
    let fn_arr=this.eventCache.eventName||[]
    fn_arr.forEach((fn:(data?:unknown)=>void) => fn(data));
  }
  off(eventName:String,fn:(data:unknown)=>void){
    let fn_arr=this.eventCache.eventName||[]
    let index = fn_arr.findIndex((item)=>item===fn)
    if(index>-1){
      this.eventCache.eventName.splice(index,1)
    }
  }
}
export default EventHub 