import RCase   from '../../../../src/models/birds/cases/case.regression.js'
import Line    from '../../../../src/models/birds/terrains/fn.line.js'
import RMin    from '../../../../src/models/birds/rules/rule.min.js'
import SHelper from '../../../../src/models/birds/helpers/helper.samples.js'
import RHelper from '../../../../src/models/birds/helpers/helper.random.js'
import RView   from './view.case.js'

const CANVAS  = 'canvas'
const DATA    = 'data'
const START   = 'start'
const RESET   = 'reset'
const RANGES  = 'input[type=range]'
const TEXT    = 'textContent'
const OUT     = '-out'
const BEST    = 'best'

const SSIZE   = 'ssize'
const NOISE   = 'noise'
const PSIZE   = 'psize'
const DELAY   = 'delay'
const INERTIA = 'inertia'
const COGNIT  = 'cognitive'
const SOCIAL  = 'social'

const CHANGE  = 'change'
const CLICK   = 'click'
const INPUT   = 'input'

const BOUNDS    = { min : -5, max : 5 }
const MAXSLOPE  = 0.6
const MAXOFFSET = 1

let canvas   = document.getElementById   (CANVAS)
let data     = document.getElementById   (DATA)
let bStart   = document.getElementById   (START)
let bReset   = document.getElementById   (RESET)
let nsamples = document.getElementById   (SSIZE)
let nnoise   = document.getElementById   (NOISE)
let nbirds   = document.getElementById   (PSIZE)
let ticks    = document.getElementById   (DELAY)
let ranges   = document.querySelectorAll (RANGES)
let best     = document.getElementById   (BEST)

let view     = RView (canvas, data, best)
let active   = false
let rCase

function read (id) {
  let control = document.getElementById (id)
  let {value} = control
  return Number (value)
}

function Config () {
  let bounds      = BOUNDS
  let slope       = RHelper.Float (-MAXSLOPE,  MAXSLOPE)
  let intercept   = RHelper.Float (-MAXOFFSET, MAXOFFSET)
  let noise       = read (NOISE)
  let size        = read (SSIZE)
  let points      = SHelper (slope, intercept, noise).create (size)
  let factory     = Line
  let rule        = RMin ()
  let psize       = read (PSIZE)
  let delay       = read (DELAY)
  let inertia     = read (INERTIA)
  let cognitive   = read (COGNIT)
  let social      = read (SOCIAL)
  return { factory, slope, intercept, points, rule, bounds, psize, delay, inertia, cognitive, social }
}

function init () {
  let cfg, model
  rCase && rCase.destroy ()
  active = false
  cfg    = Config ()
  view.config  (cfg)
  // view.setTruth  (truth)
  // view.setPoints (cfg.points)
  rCase  = RCase (cfg, view)
  model  = rCase.init ()
  view.execute (model)
}

function start () {
   active = !active
   active && rCase.start ()
  !active && rCase.stop  ()
}

function config (event) {
  let {target} = event
  let {id}     = target
  let {value}  = target
  let ivalue   = Number (value)
  let out      = document.getElementById (id + OUT)
  out && (out[TEXT] = ivalue)
  rCase.config (id, ivalue)
}

nsamples.addEventListener (CHANGE, init)
nnoise  .addEventListener (CHANGE, init)
nbirds  .addEventListener (CHANGE, config)
ticks   .addEventListener (CHANGE, config)
for (let range of ranges) range.addEventListener (INPUT, config)

bReset.addEventListener (CLICK, init)
bStart.addEventListener (CLICK, start)

init ()