import PCase   from '../../src/models/birds/cases/case.pursuit.js'
import Drift   from '../../src/models/birds/terrains/fn.drift.js'
import RMax    from '../../src/models/birds/rules/rule.max.js'
import Point   from '../../src/models/birds/model.point.js'
import WHelper from '../../src/models/birds/helpers/helper.wait.js'

const FIXED = 4
const MIN   = -5
const MAX   = 5
const NULL  = undefined

function Config () {
  let bounds    = { min : MIN, max : MAX }
  let points    = [Point (0, 0)]
  let factory   = Drift
  let rule      = RMax ()
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
    let lift   = shared.getScore ().toFixed (FIXED)
    let x      = ok ? point.getX ().toFixed (FIXED) : NULL
    let y      = ok ? point.getY ().toFixed (FIXED) : NULL
    time++
    console.log ({time, lift, x, y})
  }

  return { execute }

}

let config = Config ()
let view   = View   ()
let pCase  = PCase  (config, view)

pCase.init  ()
pCase.start ()
WHelper.wait (3000).then (pCase.stop)