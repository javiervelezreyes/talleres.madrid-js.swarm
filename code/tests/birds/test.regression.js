import RCase   from '../../src/models/birds/cases/case.regression.js'
import Line    from '../../src/models/birds/terrains/fn.line.js'
import RMin    from '../../src/models/birds/rules/rule.min.js'
import SHelper from '../../src/models/birds/helpers/helper.samples.js'
import WHelper from '../../src/models/birds/helpers/helper.wait.js'

const FIXED     = 4
const MIN       = -5
const MAX       = 5
const SLOPE     = 0.5
const INTERCEPT = 1
const NOISE     = 0.5
const SIZE      = 30
const NULL      = undefined

function Config () {
  let bounds    = { min : MIN, max : MAX }
  let points    = SHelper (SLOPE, INTERCEPT, NOISE).create (SIZE)
  let factory   = Line
  let rule      = RMin ()
  let psize     = 10
  let delay     = 100
  let inertia   = 0.7
  let cognitive = 1.5
  let social    = 1.5

  return { factory, points, rule, bounds, psize, delay, inertia, cognitive, social }
}

function View () {
  let time = 0

  function execute (model) {
    let shared = model.getShared ()
    let point  = shared.getPoint ()
    let ok     = point !== NULL
    let error  = shared.getScore ().toFixed (FIXED)
    let a      = ok ? point.getX ().toFixed (FIXED) : NULL
    let b      = ok ? point.getY ().toFixed (FIXED) : NULL
    time++
    console.log ({time, error, a, b})
  }

  return { execute }

}

let config = Config ()
let view   = View   ()
let rCase  = RCase  (config, view)

rCase.init  ()
rCase.start ()
WHelper.wait (3000).then (rCase.stop)