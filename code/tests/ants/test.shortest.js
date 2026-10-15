import SCase   from '../../src/models/ants/cases/case.shortest.js'
import PHelper from '../../views/ants/shortest/scripts/helper.path.js'
import WHelper from '../../src/models/ants/helpers/helper.wait.js'

const FIXED = 2

let Signal = x => x.getSignal ()

function Config () {
  let width  = 600
  let height = 400
  let lsize  = 4
  let wsize  = 4
  let asize  = 8
  let delay  = 100
  let alpha  = 1
  let beta   = 2
  let rate   = 0.001

  return { width, height, lsize, wsize, asize, delay, alpha, beta, rate }
}

function View () {
  let time = 0

  function execute (model) {
    let graph   = model.getGraph ()
    let nodes   = graph.getNodes ()
    let routes  = graph.getRoutes ()
    let signals = routes.map (Signal)
    let max     = Math.max (...signals).toFixed (FIXED)
    let min     = Math.min (...signals).toFixed (FIXED)
    let paths   = PHelper (nodes)
    let best    = paths.getBest ()
    let short   = paths.getShortest ()
    let colony  = paths.getLength (best).toFixed (FIXED)
    let optimum = paths.getLength (short).toFixed (FIXED)
    time++
    console.log ({time, max, min, colony, optimum})
  }

  return { execute }

}

let config = Config ()
let view   = View   ()
let sCase  = SCase  (config, view)

sCase.init  ()
sCase.start ()
WHelper.wait (3000).then (sCase.stop)