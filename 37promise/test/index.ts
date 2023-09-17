import { assert } from "chai"
import * as chai from "chai"
import { Func, describe,it } from "mocha"
import Promise from '../src/promise'
import * as sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)


describe('Promise',()=>{
  it('是一个类',()=>{
    // assert(typeof Promise === 'function')
    // assert(typeof Promise.prototype === 'object')
    assert.isFunction(Promise)
    assert.isObject(Promise.prototype)
  })
  it('new Promise()如果接受的不是函数会报错',()=>{
    // 意思就是我们预测new Promise()会报错（因为没有传函数）
    assert.throw(()=>{
      //@ts-ignore
      new Promise()
    })
    assert.throw(()=>{
      //@ts-ignore
      new Promise(1)
    })
    assert.throw(()=>{
      //@ts-ignore
      new Promise(false)
    })
  })
  it('new Promise(fn)会生成一个对象，对象有then方法',()=>{
    const promise = new Promise(()=>{})
    assert.isFunction(promise.then)
  })
  it('new Promise(fn)中的fn会立即执行',()=>{
    let fn = sinon.fake()
    new Promise(fn)
    assert(fn.called)
  })
  it('new Promise(fn)中的fn执行的时候接受resolve和reject两个函数',done=>{
    new Promise((resolve:unknown,reject:unknown)=>{
      assert.isFunction(resolve)
      assert.isFunction(reject)
      done()
    })
  })
  it('promise.then(success)中的success会在resolve被调用后立即执行',done=>{
    let success = sinon.fake()
    const promise = new Promise((resolve:Function,reject:Function)=>{
      assert.isFalse(success.called)
      resolve()
      setTimeout(()=>{
        assert.isTrue(success.called)
        done()
      },0)
    })
    promise.then(success,()=>{})
  })
  it('promise.then(success, fail)中的fail会在reject被调用后立即执行',done=>{
    let succ = sinon.fake()
    let fail = sinon.fake()
    const promise = new Promise((resolve:Function,reject:Function)=>{
      assert.isFalse(fail.called)
      reject()
      setTimeout(()=>{
        assert.isTrue(fail.called)
        done()
      },0)
    })
    promise.then(succ,fail)
  })
  it('2.2.1 onFulfilled 和 onRejected 都是可选参数，如果不是函数则忽略',()=>{
    const promise = new Promise((resolve:Function,reject:Function)=>{
      resolve()
      // reject()
    })
    promise.then(false,null)
  })
  it('2.2.2 如果 onFulfilled 是一个函数，它必须在 promise 被 fulfilled 后，以 promise 的 value 作为第一个参数调用，不能调用多次',done=>{
    let onFulfilled = sinon.fake()
    let onRejected = sinon.fake()
    const promise = new Promise((resolve:Function,reject:Function)=>{
      assert.isFalse(onFulfilled.called)
      resolve(123)
      resolve(122223)
      setTimeout(()=>{
        assert.isTrue(onFulfilled.called)
        assert.isTrue(onFulfilled.calledOnce)
        assert.isTrue(promise.state==='fulfilled')
        assert.isTrue(onFulfilled.calledWith(123))
        done()
      })
    })
    promise.then(onFulfilled,onRejected)
  })
  it('2.2.3 如果 onRejected 是一个函数，它必须在 promise 被 rejected 后，以 promise 的 reason 作为第一个参数调用。，不能调用多次',done=>{
    let onFulfilled = sinon.fake()
    let onRejected = sinon.fake()
    const promise = new Promise((resolve:Function,reject:Function)=>{
      assert.isFalse(onRejected.called)
      reject(123)
      reject(122223)
      setTimeout(()=>{
        assert.isTrue(onRejected.called)
        assert.isTrue(onRejected.calledOnce)
        assert.isTrue(promise.state==='rejected')
        assert.isTrue(onRejected.calledWith(123))
        done()
      })
    })
    promise.then(onFulfilled,onRejected)
  })
  it('2.2.4 在 execution context 栈（执行上下文栈）只包含平台代码之前，onFulfilled 不能被调用',()=>{
    let onFulfilled = sinon.fake()
    let onRejected = sinon.fake()
    const promise = new Promise((resolve:Function,reject:Function)=>{
      resolve()
    })
    promise.then(onFulfilled,onRejected)
    assert.isFalse(onFulfilled.called)
    setTimeout(()=>{
      assert.isTrue(onFulfilled.called)
    })
  })
  it('2.2.4 在 execution context 栈（执行上下文栈）只包含平台代码之前，onRejected 不能被调用',()=>{
    let onFulfilled = sinon.fake()
    let onRejected = sinon.fake()
    const promise = new Promise((resolve:Function,reject:Function)=>{
      reject()
    })
    promise.then(onFulfilled,onRejected)
    assert.isFalse(onRejected.called)
    setTimeout(()=>{
      assert.isTrue(onRejected.called)
    })
  })
  it('2.2.5 onFulfilled 或者 onRejected 必须以函数形式调用（即不能有this值）',()=>{
    const promise = new Promise((resolve:Function,reject:Function)=>{
      resolve()
    })
    promise.then(function(this:any){
      'use strict'
      assert(this===undefined)
    },function(this:any){
      'use strict'
      assert(this===undefined)
    })
  })
  it('2.2.6.1 then可以在同一个promise里被多次调用,如果/当 promise 完成执行（fulfilled）,各个相应的onFulfilled回调 必须根据最原始的then 顺序来调用',done=>{
    const promise = new Promise((resolve:Function,reject:Function)=>{
      resolve()
    })
    const callbacks = [sinon.fake(),sinon.fake(),sinon.fake()]
    promise.then(callbacks[0],null)
    promise.then(callbacks[1],null)
    promise.then(callbacks[2],null)
    setTimeout(()=>{
      assert(callbacks[0].called)
      assert(callbacks[1].called)
      assert(callbacks[2].called)
      assert(callbacks[1].calledAfter(callbacks[0]))
      assert(callbacks[2].calledAfter(callbacks[1]))  
      done()    
    })

  })
  it('2.2.6.2 then可以在同一个promise里被多次调用,如果/当 promise 被拒绝（rejected）,各个相应的onRejected回调 必须根据最原始的then 顺序来调用',done=>{
    const promise = new Promise((resolve:Function,reject:Function)=>{
      reject()
    })
    const callbacks = [sinon.fake(),sinon.fake(),sinon.fake()]
    promise.then(null,callbacks[0])
    promise.then(null,callbacks[1])
    promise.then(null,callbacks[2])
    setTimeout(()=>{
      assert(callbacks[0].called)
      assert(callbacks[1].called)
      assert(callbacks[2].called)
      assert(callbacks[1].calledAfter(callbacks[0]))
      assert(callbacks[2].calledAfter(callbacks[1]))
      done()
    })
  })
})