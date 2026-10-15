import CCase     from '../../src/models/birds/cases/case.central.js'
import Distance  from '../../src/models/birds/terrains/fn.distance.js'
import RMin      from '../../src/models/birds/rules/rule.min.js'
import PHelper   from '../../src/models/birds/helpers/helper.points.js'
import WHelper   from '../../src/models/birds/helpers/helper.wait.js'

const FIXED = 4
const MIN   = -5
const MAX   = 5
const NULL  = undefined

function Config () {
  let bounds    = { min : MIN, max : MAX }
  let points    = PHelper (bounds).create (9, 3)
  let factory   = Distance
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
    let score  = shared.getScore ().toFixed (FIXED)
    let x      = ok ? point.getX ().toFixed (FIXED) : NULL
    let y      = ok ? point.getY ().toFixed (FIXED) : NULL
    time++
    console.log ({time, score, x, y})
  }

  return { execute }

}

let config = Config ()
let view   = View   ()
let fCase  = CCase  (config, view)

fCase.init  ()
fCase.start ()
WHelper.wait (3000).then (fCase.stop)