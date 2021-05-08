const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"
class Promise1 {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reject = undefined
    this.onResolveCallbacks = []
    this.onRejectCallbacks = []
    let resolve = value => {
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
  then (fulfilled, rejected) {
    if (this.status === FULFILLED) {
      fulfilled(this.value)
    } else if (this.status === REJECTED) {
      rejected(this.reject)
    } else if (this.status === PENDING) {
      this.onResolveCallbacks.push(() => {
        fulfilled(this.value)
      })
      this.onRejectCallbacks.push(() => {
        rejected(this.reject)
      })
    }
  }
}

let p = new Promise1((resolve, reject) => {
  // resolve('你好')
  // throw new Error('1')
  // reject('再见')
  setTimeout(() => {
    resolve('你好')
  })
})
p.then(data => {
  console.log('success', data)
}, data => {
  console.log('error', data)
})
p.then(data => {
  console.log('success', data)
}, data => {
  console.log('error', data)
})