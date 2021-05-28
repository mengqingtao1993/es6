const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"
const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called // 防止成功失败多次调用
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return
          called = true
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if (called) return
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (err) {
      if (called) return
      called = true
      reject(err)
    }
  } else {
    resolve(x)
  }
}
class Promise1 {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reject = undefined
    this.onResolveCallbacks = []
    this.onRejectCallbacks = []
    let resolve = value => {
      if (value instanceof Promise1) {
        return value.then(resolve, reject)
      }
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onResolveCallbacks.forEach(callback => callback())
      }
    }
    let reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reject = reason
        this.onRejectCallbacks.forEach(callback => callback())
      }
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then (onFulfilled, onRejected) { // 入参是可选值
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reject)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === PENDING) {
        this.onResolveCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        this.onRejectCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reject)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })
    return promise2
  }
  catch (err) {
    return this.then(null, err)
  }
  static all(){}
}

let isPromise = value => {
  if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
    return typeof value.then === 'function'
  }
  return false
}

Promise1.all = (promises) => {
  return new Promise1((resolve, reject) => {
    let arr = []
    let num = 0
    let fn = (i, d) => {
      arr[i] = d
      if (++num === promises.length) {
        resolve(arr)
      }
    }
    for (let i = 0; i < promises.length; i++) {
      if (isPromise(promises[i])) {
        try {
          let then = promises[i].then
          then(data => {
            fn(i, data)
          }, err => {
            reject(err)
          })
        } catch (e) {
          reject(e)
        }
      } else {
        fn(i, promises[i])
      }
    }
  })
}

Promise.all([1, 2, 3, a()]).then(data => {
  console.log(data)
})

function a () {
  return new Promise((resolve, reject) => {
    resolve(1)
  })
}
// let p = new Promise1((resolve, reject) => {
  // resolve('你好')
  // throw new Error('1')
  // reject('再见')
//   resolve(new Promise1((resolve2, reject) => {
//     setTimeout(() => {
//       resolve2('111')
//     })
//   }))
// }).then(data => {
//   console.log(data)
// })
// let p1 = p.then(data => {
//   console.log('success', data)
//   return p1
// }, data => {
//   console.log('error', data)
// })
// p1.then(data => {
//   console.log('success', data)
// }, data => {
//   console.log('error', data)
// })




new Promise((resolve, reject) => {
  setTimeout(() =>{
    resolve('1')
  })
})
