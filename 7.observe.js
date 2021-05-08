class Subject {
  constructor() {
    this.arr = []
    this.state = ''
  }
  attach (o) {
    this.arr.push(o)
  }
  setState (newState) {
    this.state = newState
    this.arr.forEach(o => o.update(newState))
  }
}
class Observer {
  constructor(name) {
    this.name = name
  }
  update (newState) {
    console.log(this.name + ':' + newState)
  }
}
let o1 = new Observer('观察者1')
let o2 = new Observer('观察者2')
let s = new Subject('被观察者')
s.attach(o1)
s.attach(o2)
s.setState('状态更新了')
