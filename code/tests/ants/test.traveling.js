import TCase   from '../../src/models/ants/cases/case.traveling.js'
import WHelper from '../../src/models/ants/helpers/helper.wait.js'

let Signal = x => x.getSignal ()

function Config () {
  let width  = 600
  let height = 400
  let csize  = 5
  let asize  = 3
  let delay  = 100
  let alpha  = 1
  let beta   = 2
  let rate   = 0.001

  return { width, height, csize, asize, delay, alpha, beta, rate }
}

function View () {
  let time = 0

  function execute (model) {
    let graph   = model.getGraph ()
    let routes  = graph.getRoutes ()
    let signals = routes.map (Signal)
    let max     = Math.max (...signals).toFixed (2)
    let min     = Math.min (...signals).toFixed (2)
    time++
    console.log ({time, max, min})
  }
  return { execute }
  
}

let config = Config ()
let view   = View   ()
let tCase  = TCase (config, view)

tCase.init  ()
tCase.start ()
WHelper.wait (3000).then (tCase.stop)
