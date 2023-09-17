const chai=require("chai")
const assert = chai.assert
const deepClone = require("../src/index")
describe("deep-clone",()=>{
  it('是一个函数',()=>{
    assert.isFunction(deepClone)
  })
  it("可以复制基本类型",()=>{
    let num = 1
    assert(num === deepClone(num))
    let str = 'ahhk'
    assert(str === deepClone(str))
    let bool = false
    assert(bool === deepClone(bool))
    let u = undefined
    assert(u === deepClone(u))
    let empty = null
    assert(empty === deepClone(empty))
    let syb = Symbol()
    assert(syb === deepClone(syb))
  })
  describe("可以复制对象",()=>{
    it("能够复制普通对象",()=>{
      const obj = {name:'vivien',age:18,scores:{math:99,music:'良'}}
      const obj2 = deepClone(obj)
      assert(obj !== obj2)
      assert(obj.name === obj2.name)
      assert(obj.age === obj2.age)
      assert(obj.scores !== obj2.scores)
      assert(obj.scores.math === obj2.scores.math)
    })
    it("能够复制数组",()=>{
      const arr = [[11,12],[21,22,23],[31]]
      const arr2 = deepClone(arr)
      assert(arr !== arr2)
      assert(arr[0] !== arr2[0])
      assert(arr[1] !== arr2[1])
      assert(arr[2] !== arr2[2])
      assert.deepEqual(arr,arr2)
    })
    it("能够复制函数",()=>{
      const f1 = function(x,y){
        // console.log(x,y)
        return x+y
      }
      f1.xxx ={yyy:{zzz:1}}
      const f2=deepClone(f1)
      assert(f1 !== f2)
      assert(f1.xxx.yyy.zzz === f2.xxx.yyy.zzz)
      assert(f1.xxx.yyy !== f2.xxx.yyy)
      assert(f1.xxx !== f2.xxx)
      assert(f1(1,2) === f2(1,2))
    })
    it("能够复制环",()=>{
      const a = {name:'sshh'}
      a.self = a
      const a2 = deepClone(a)
      assert(a !== a2)
      assert(a.name === a2.name)
      assert(a.self !== a2.self)
    })
    xit("不会爆栈",()=>{
      const a = {child:null}
      let b = a
      for(let i=0;i<6000;i++){
        b.child={
          child:null
        }
        b = b.child
      }
      console.log(a)
      const a2 = deepClone(a)
      assert(a !== a2)
      assert(a.child !== a2.child)
    })
    it("可以复制正则表达式",()=>{
      // const a = /^hi\d+/gi
      const a = new RegExp('^hi\\d+','gi')
      a.xxx ={yyy:{zzz:1}}
      const a2 = deepClone(a)
      assert(a !== a2)
      assert(a.source === a2.source)
      assert(a.flags === a2.flags)
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
      assert(a.xxx.yyy !== a2.xxx.yyy)
      assert(a.xxx !== a2.xxx)
    })
    it("可以复制Date",()=>{
      const a = new Date()
      a.xxx ={yyy:{zzz:1}}
      const a2 = deepClone(a)
      assert(a !== a2)
      assert(a.getTime() === a2.getTime())
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
      assert(a.xxx.yyy !== a2.xxx.yyy)
      assert(a.xxx !== a2.xxx)
    })
    it("自动跳过原型属性",()=>{
      const a = Object.create({pname:'aa'})
      a.xxx ={yyy:{zzz:1}}
      const a2 = deepClone(a)
      assert(a !== a2)
      assert.isFalse("pname" in a2);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz)
      assert(a.xxx.yyy !== a2.xxx.yyy)
      assert(a.xxx !== a2.xxx)
    })
    it("很复杂的对象", () => {
      const a = {
        n: NaN,
        n2: Infinity,
        s: "",
        bool: false,
        null: null,
        u: undefined,
        sym: Symbol(),
        o: {
          n: NaN,
          n2: Infinity,
          s: "",
          bool: false,
          null: null,
          u: undefined,
          sym: Symbol()
        },
        array: [
          {
            n: NaN,
            n2: Infinity,
            s: "",
            bool: false,
            null: null,
            u: undefined,
            sym: Symbol()
          }
        ]
      };
      const a2 = deepClone(a);
      assert(a !== a2);
      assert.isNaN(a2.n);
      assert(a.n2 === a2.n2);
      assert(a.s === a2.s);
      assert(a.bool === a2.bool);
      assert(a.null === a2.null);
      assert(a.u === a2.u);
      assert(a.sym === a2.sym);
      assert(a.o !== a2.o);
      assert.isNaN(a2.o.n);
      assert(a.o.n2 === a2.o.n2);
      assert(a.o.s === a2.o.s);
      assert(a.o.bool === a2.o.bool);
      assert(a.o.null === a2.o.null);
      assert(a.o.u === a2.o.u);
      assert(a.o.sym === a2.o.sym);
      assert(a.array !== a2.array);
      assert(a.array[0] !== a2.array[0]);
      assert.isNaN(a2.array[0].n);
      assert(a.array[0].n2 === a2.array[0].n2);
      assert(a.array[0].s === a2.array[0].s);
      assert(a.array[0].bool === a2.array[0].bool);
      assert(a.array[0].null === a2.array[0].null);
      assert(a.array[0].u === a2.array[0].u);
      assert(a.array[0].sym === a2.array[0].sym);
    });
  })
})