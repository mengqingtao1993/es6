const perform = (anyMethod, wrappers) => {
  wrappers.forEach(wrapper => {
    wrapper.initializae()
  })
  anyMethod()
  wrappers.forEach(wrapper => {
    wrapper.close()
  })
}
perform(() => {
  console.log('你好')
}, [
  {
    //wrapper1
    initializae () {
      console.log('wrapper1.initializae')
    },
    close () {
      console.log('wrapper1.close')
    }
  },
  {
    //wrapper2
    initializae () {
      console.log('wrapper2.initializae')
    },
    close () {
      console.log('wrapper2.close')
    }
  }
])
