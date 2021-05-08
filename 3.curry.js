
// 判断数据类型
// let checkType = function (val, type) {
//   return Object.prototype.toString.call(val) === `[object ${type}]`
// }
// console.log(checkType('123', 'Number'))

// let checkType = function (type) {
//   return (val) => {
//     return Object.prototype.toString.call(val) === `[object ${type}]`
//   }
// }
// let isNumber = checkType('Number')
// console.log(isNumber(123))

// let types = ['Number', 'String', 'Boolean']
// let utils = {}
// types.forEach(type => {
//   utils[`is${type}`] = checkType(type)
// })

// console.log(utils.isNumber(123))

// curry
function add (a, b, c, d, e) {
  return a + b + c + d + e
}

let curry = function (fn, context = []) {
  return (...arg) => {
    let l = fn.length
    context = context.concat(arg)
    if (l > context.length) {
      return curry(fn, context)
    }
    return fn(...arg)
  }
}
console.log(curry(add)(1)(2, 3)(4)(5))

