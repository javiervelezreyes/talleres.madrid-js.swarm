import Engine   from '../../../core/core.engine.js'
import Particle from '../model.particle.js'
import Position from '../model.position.js'
import Terrain  from '../model.terrain.js'
import Flock    from '../model.flock.js'
import Point    from '../model.point.js'
import LHelper  from '../helpers/helper.label.js'
import RHelper  from '../helpers/helper.random.js'

const BIRD   = 'B'
const PSIZE  = 'psize'
const DELAY  = 'delay'
const LENGTH = 'length'
const ON     = true
const OFF    = false
const NULL   = undefined

function CCase (cfg, view) {

  let {factory}   = cfg
  let {points}    = cfg
  let {rule}      = cfg
  let {bounds}    = cfg
  let {psize}     = cfg
  let {inertia}   = cfg
  let {cognitive} = cfg
  let {social}    = cfg
  let params

  let BHelper
  let engine
  let terrain
  let shared
  let particles
  let active = OFF

  function Start () {
    let {min, max} = bounds
    let x = RHelper.Float (min, max)
    let y = RHelper.Float (min, max)
    return Point (x, y)
  }

  function PRefresh (size) {
    while (particles[LENGTH] < size) {
      let id       = BHelper.create ()
      let particle = Particle (id, Start (), terrain, shared, rule, params)
      particles.push (particle)
    }
    while (particles[LENGTH] > size) {
      particles.pop ()
    }
  }

  function DRefresh (value) {
    engine.init ({ [DELAY] : value })
    active && engine.start ()
  }

  function config (key, value) {
    let isSize  = key == PSIZE
    let isDelay = key == DELAY
    let isParam = !isSize && !isDelay
    isSize  && PRefresh (value)
    isDelay && DRefresh (value)
    isParam && (params[key] = value)
  }

  function init () {
    let flock
    destroy ()
    params    = { inertia, cognitive, social }
    BHelper   = LHelper (BIRD)
    terrain   = Terrain (factory (points), bounds)
    shared    = Position (rule)
    particles = []
    PRefresh (psize)
    flock     = Flock  (terrain, particles, shared)
    engine    = Engine (flock, view)
    engine.init (cfg)
    return flock
  }

  function start () {
    if (!active) {
      active = ON
      engine.start ()
    }
  }

  function stop () {
    if (active) {
      active = OFF
      engine.stop ()
    }
  }

  function destroy () {
    engine && engine.destroy ()
    engine = NULL
    active = OFF
  }

  return {
    config,
    init,
    start,
    stop,
    destroy
  }

}

export default CCase