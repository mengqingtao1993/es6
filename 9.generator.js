// let obj = { a: 1 }
// obj.b = obj
// console.log(obj)

const { fstat } = require("fs/promises")


function *read(){
  let a = yield 1
  console.log(a)
  // yield 2
  // yield 3
  // yield 4
}
let iterator = read()
console.log(iterator.next())
console.log(iterator.next(100))
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())


// // 伪数组
// {
//   0:1,
//   1:2,
//   length:2,
//   [Symbol.iterator]:function*(){
//     let index = 0
//     while (index !== this.length){
//       yield this[index++]
//     }
//   }
// }



function *read(){
  let a = yield fs.readFile('/xxx')
  let b = yield fs.readFile(a)
  return b
}

let iterator = read()
iterator.next().value.then(data=>{
  iterator.next(data).value.then(data=>{
    iterator.next(data).value
  })
})

let co = require('co')
co(read()).then(data=>{
  console.log(data)
})

// co源码
function co(it){
  return new Promise((resolve, reject)=>{
    // 异步迭代需要先提供一个next方法
    function next(data){
      let {value, done} = it.next(data)
      if(!done){
        Promise.resolve(value).then(data=>{
          next(data)
        })
      }else{
        resolve(value)
      }
    }
    next()
  })
}

