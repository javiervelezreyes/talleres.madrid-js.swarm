import PCase from '../../../../src/models/birds/cases/case.pursuit.js'
import Drift from '../../../../src/models/birds/terrains/fn.drift.js'
import RMax  from '../../../../src/models/birds/rules/rule.max.js'
import Point from '../../../../src/models/birds/model.point.js'
import PView from './view.case.js'

const CANVAS  = 'canvas'
const START   = 'start'
const RESET   = 'reset'
const RANGES  = 'input[type=range]'
const TEXT    = 'textContent'
const OUT     = '-out'
const BEST    = 'best'

const PSIZE   = 'psize'
const DELAY   = 'delay'
const INERTIA = 'inertia'
const COGNIT  = 'cognitive'
const SOCIAL  = 'social'

const CHANGE  = 'change'
const CLICK   = 'click'
const INPUT   = 'input'

const BOUNDS = { min : -5, max : 5 }

let canvas = document.getElementById   (CANVAS)
let bStart = document.getElementById   (START)
let bReset = document.getElementById   (RESET)
let nbirds = document.getElementById   (PSIZE)
let ticks  = document.getElementById   (DELAY)
let ranges = document.querySelectorAll (RANGES)
let best   = document.getElementById   (BEST)

let view   = PView (canvas, best)
let active = false
let pCase

function read (id) {
  let control = document.getElementById (id)
  let {value} = control
  return Number (value)
}

function Config () {
  let bounds    = BOUNDS
  let points    = [Point (0, 0)]
  let factory   = Drift
  let rule      = RMax ()
  let psize     = read (PSIZE)
  let delay     = read (DELAY)
  let inertia   = read (INERTIA)
  let cognitive = read (COGNIT)
  let social    = read (SOCIAL)
  return { factory, points, rule, bounds, psize, delay, inertia, cognitive, social }
}

function init () {
  let cfg, model
  pCase && pCase.destroy ()
  active = false
  cfg    = Config ()
  pCase  = PCase (cfg, view)
  model  = pCase.init ()
  view.execute (model)
}

function start () {
   active = !active
   active && pCase.start ()
  !active && pCase.stop  ()
}

function config (event) {
  let {target} = event
  let {id}     = target
  let {value}  = target
  let ivalue   = Number (value)
  let out      = document.getElementById (id + OUT)
  out && (out[TEXT] = ivalue)
  pCase.config (id, ivalue)
}

nbirds.addEventListener (CHANGE, config)
ticks .addEventListener (CHANGE, config)
for (let range of ranges) range.addEventListener (INPUT, config)

bReset.addEventListener (CLICK, init)
bStart.addEventListener (CLICK, start)

init ()