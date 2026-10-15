import TCase from '../../../../src/models/ants/cases/case.shortest.js'
import TView from './view.case.js'

const CANVAS  = 'canvas'
const START   = 'start'
const RESET   = 'reset'
const INPUT   = 'input'
const RANGES  = 'input[type=range]'
const TEXT    = 'textContent'
const OUT     = '-out'
const TOUR    = 'tour'

const LSIZE   = 'lsize'
const WSIZE   = 'wsize'
const ASIZE   = 'asize'
const DELAY   = 'delay'
const ALPHA   = 'alpha'
const BETA    = 'beta'
const RATE    = 'rate'

const CHANGE  = 'change'
const CLICK   = 'click'

let canvas    = document.getElementById   (CANVAS)
let bStart    = document.getElementById   (START)
let bReset    = document.getElementById   (RESET)
let nlayers   = document.getElementById   (LSIZE)
let nnodes    = document.getElementById   (WSIZE)
let nants     = document.getElementById   (ASIZE)
let ticks     = document.getElementById   (DELAY)
let ranges    = document.querySelectorAll (RANGES)
let tour      = document.getElementById (TOUR)

let view      = TView (canvas, tour)
let active    = false
let tCase

function read (id) {
  let control = document.getElementById (id)
  let {value} = control
  return Number (value)
}

function Config () {
  let {width}  = canvas
  let {height} = canvas
  let lsize    = read (LSIZE)
  let wsize    = read (WSIZE)
  let asize    = read (ASIZE)
  let delay    = read (DELAY)
  let alpha    = read (ALPHA)
  let beta     = read (BETA)
  let rate     = read (RATE)
  return { width, height, lsize, wsize, asize, delay, alpha, beta, rate }
}

function init () {
  let cfg, model
  tCase && tCase.destroy ()
  cfg   = Config ()
  tCase = TCase (cfg, view)
  model = tCase.init ()
  view.execute (model)
}

function start () {
   active = !active
   active && tCase.start ()
  !active && tCase.stop  ()
}

function config (event) {
  let {target} = event
  let {id}     = target
  let {value}  = target
  let ivalue   = Number (value)
  let out      = document.getElementById (id + OUT)
  out && (out[TEXT] = ivalue)
  tCase.config (id, ivalue)
}

nlayers .addEventListener (CHANGE, init)
nnodes  .addEventListener (CHANGE, init)
nants   .addEventListener (CHANGE, config)
ticks   .addEventListener (CHANGE, config)
for (let range of ranges) range.addEventListener (INPUT, config)

bReset.addEventListener (CLICK, init)
bStart.addEventListener (CLICK, start)

init ()