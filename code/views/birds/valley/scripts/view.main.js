import VCase     from '../../../../src/models/birds/cases/case.valley.js'
import Sphere    from '../../../../src/models/birds/terrains/fn.sphere.js'
import Rastrigin from '../../../../src/models/birds/terrains/fn.rastrigin.js'
import Ackley    from '../../../../src/models/birds/terrains/fn.ackley.js'
import RMin      from '../../../../src/models/birds/rules/rule.min.js'
import RMax      from '../../../../src/models/birds/rules/rule.max.js'
import MView     from './view.case.js'

const CANVAS  = 'canvas'
const START   = 'start'
const RESET   = 'reset'
const RANGES  = 'input[type=range]'
const TEXT    = 'textContent'
const OUT     = '-out'
const BEST    = 'best'

const TERRAIN   = 'terrain'
const OBJECTIVE = 'objective'
const PSIZE     = 'psize'
const DELAY     = 'delay'
const INERTIA   = 'inertia'
const COGNIT    = 'cognitive'
const SOCIAL    = 'social'

const CHANGE  = 'change'
const CLICK   = 'click'
const INPUT   = 'input'

const TERRAINS = {
  sphere    : { fn : Sphere,    bounds : { min : -5.12, max : 5.12 } },
  rastrigin : { fn : Rastrigin, bounds : { min : -5.12, max : 5.12 } },
  ackley    : { fn : Ackley,    bounds : { min : -5,    max : 5    } }
}

const RULES = {
  min : RMin,
  max : RMax
}

let canvas     = document.getElementById   (CANVAS)
let bStart     = document.getElementById   (START)
let bReset     = document.getElementById   (RESET)
let sTerrain   = document.getElementById   (TERRAIN)
let sObjective = document.getElementById   (OBJECTIVE)
let nbirds     = document.getElementById   (PSIZE)
let ticks      = document.getElementById   (DELAY)
let ranges     = document.querySelectorAll (RANGES)
let best       = document.getElementById   (BEST)

let view       = MView (canvas, best)
let active   = false
let mCase

function read (id) {
  let control = document.getElementById (id)
  let {value} = control
  return Number (value)
}

function Config () {
  let {value}  = sTerrain
  let {fn}     = TERRAINS[value]
  let {bounds} = TERRAINS[sTerrain.value]
  let rule      = RULES[sObjective.value] ()
  let psize     = read (PSIZE)
  let delay     = read (DELAY)
  let inertia   = read (INERTIA)
  let cognitive = read (COGNIT)
  let social    = read (SOCIAL)
  return { fn, rule, bounds, psize, delay, inertia, cognitive, social }
}

function init () {
  let cfg, model
  mCase && mCase.destroy ()
  cfg   = Config ()
  mCase = VCase (cfg, view)
  model = mCase.init ()
  view.execute (model)
}

function start () {
   active = !active
   active && mCase.start ()
  !active && mCase.stop  ()
}

function config (event) {
  let {target} = event
  let {id}     = target
  let {value}  = target
  let ivalue   = Number (value)
  let out      = document.getElementById (id + OUT)
  out && (out[TEXT] = ivalue)
  mCase.config (id, ivalue)
}

sTerrain  .addEventListener (CHANGE, init)
sObjective.addEventListener (CHANGE, init)
nbirds    .addEventListener (CHANGE, config)
ticks     .addEventListener (CHANGE, config)
for (let range of ranges) range.addEventListener (INPUT, config)

bReset.addEventListener (CLICK, init)
bStart.addEventListener (CLICK, start)

init ()