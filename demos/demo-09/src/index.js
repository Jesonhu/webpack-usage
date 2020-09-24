import module1 from './module1'
import module2 from './module2'
import module3 from './module3'
import './assets/css/stylus/index.styl'

function showModuleHello(moduleArr) {
  moduleArr.forEach(i => {
    if (i && i instanceof Function) {
      const helloStr = i()
      document.write(`<h2>${helloStr}</h2>`)
    }
  })
}
const moduleArr = [
  module1,
  module2,
  module3
]
showModuleHello(moduleArr)
