const say = (a, b, c) => {
  console.log(a, b, c)
}

Function.prototype.before = function (beforeFn) {
  return (...args) => { // 剩余运算符,把入参收集成一个数组
    beforeFn()
    this(...args) // 展开运算符,把数据以此传入
  }
}

say.before(() => {
  console.log('before')
})(1, 2, 3)



