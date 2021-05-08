let event = {
  arr: [],
  on (fn) { // 订阅所有事件
    this.arr.push(fn)
  },
  emit () { // 依次发布所有事件
    this.arr.forEach(fn => fn())
  }
}

