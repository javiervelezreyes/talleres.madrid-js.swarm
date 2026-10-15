import CCase     from '../../../../src/models/birds/cases/case.central.js'
import Distance  from '../../../../src/models/birds/terrains/fn.distance.js'
import Coverage  from '../../../../src/models/birds/terrains/fn.coverage.js'
import RMin      from '../../../../src/models/birds/rules/rule.min.js'
import RMax      from '../../../../src/models/birds/rules/rule.max.js'
import PHelper   from '../../../../src/models/birds/helpers/helper.points.js'
import FView     from './view.case.js'

const CANVAS  = 'canvas'
const START   = 'start'
const RESET   = 'reset'
const RANGES  = 'input[type=range]'
const TEXT    = 'textContent'
const OUT     = '-out'
const BEST    = 'best'

const OBJECTIVE = 'objective'
const CSIZE     = 'csize'
const GSIZE     = 'gsize'
const PSIZE     = 'psize'
const DELAY     = 'delay'
const INERTIA   = 'inertia'
const COGNIT    = 'cognitive'
const SOCIAL    = 'social'

const CHANGE  = 'change'
const CLICK   = 'click'
const INPUT   = 'input'

const BOUNDS = { min : -5, max : 5 }

const OBJECTIVES = {
  min : { rule : RMin, factory : Distance },
  max : { rule : RMax, factory : Coverage }
}

let canvas     = document.getElementById   (CANVAS)
let bStart     = document.getElementById   (START)
let bReset     = document.getElementById   (RESET)
let sObjective = document.getElementById   (OBJECTIVE)
let npoints    = document.getElementById   (CSIZE)
let ngroups    = document.getElementById   (GSIZE)
let nbirds     = document.getElementById   (PSIZE)
let ticks      = document.getElementById   (DELAY)
let ranges     = document.querySelectorAll (RANGES)
let best       = document.getElementById   (BEST)

let view       = FView (canvas, best)
let active     = false
let cCase

function read (id) {
  let control = document.getElementById (id)
  let {value} = control
  return Number (value)
}

function Config () {
  let objective = OBJECTIVES[sObjective.value]
  let rule      = objective.rule ()
  let factory   = objective.factory
  let bounds    = BOUNDS
  let csize     = read (CSIZE)
  let gsize     = read (GSIZE)
  let psize     = read (PSIZE)
  let delay     = read (DELAY)
  let inertia   = read (INERTIA)
  let cognitive = read (COGNIT)
  let social    = read (SOCIAL)
  let points    = PHelper (bounds).create (csize, gsize)
  return { factory, points, rule, bounds, psize, delay, inertia, cognitive, social }
}

function init () {
  let cfg, model
  cCase &&  cCase.destroy ()
  active = false
  cfg    = Config ()
  view.config (cfg)
  cCase  = CCase (cfg, view)
  model  = cCase.init ()
  view.execute (model)
}

function start () {
   active = !active
   active &&  cCase.start ()
  !active &&  cCase.stop  ()
}

function config (event) {
  let {target} = event
  let {id}     = target
  let {value}  = target
  let ivalue   = Number (value)
  let out      = document.getElementById (id + OUT)
  out && (out[TEXT] = ivalue)
  cCase.config (id, ivalue)
}

sObjective .addEventListener (CHANGE, init)
npoints    .addEventListener (CHANGE, init)
ngroups    .addEventListener (CHANGE, init)
nbirds     .addEventListener (CHANGE, config)
ticks      .addEventListener (CHANGE, config)
for (let range of ranges) range.addEventListener (INPUT, config)

bReset.addEventListener (CLICK, init)
bStart.addEventListener (CLICK, start)

init ()