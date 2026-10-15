import VCase     from '../../src/models/birds/cases/case.valley.js'
import Rastrigin from '../../src/models/birds/terrains/fn.rastrigin.js'
import RMin      from '../../src/models/birds/rules/rule.min.js'
import RMax      from '../../src/models/birds/rules/rule.max.js'
import WHelper   from '../../src/models/birds/helpers/helper.wait.js'

const FIXED = 4
const MIN   = -5.12
const MAX   = 5.12
const NULL  = undefined

function Config () {
  let fn        = Rastrigin
  let rule      = RMax ()
  let bounds    = { min : MIN, max : MAX }
  let psize     = 10
  let delay     = 100
  let inertia   = 0.7
  let cognitive = 1.5
  let social    = 1.5

  return { fn, rule, bounds, psize, delay, inertia, cognitive, social }
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
let mCase  = VCase  (config, view)

mCase.init  ()
mCase.start ()
WHelper.wait (3000).then (mCase.stop)