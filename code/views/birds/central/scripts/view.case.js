import VHelper from './helper.view.js'

const POINTS = 'points'
const TEXT   = 'textContent'
const FIXED  = 4
const SEP    = ''

function FView (canvas, output) {

  let helper = VHelper (canvas)
  let delay  = 100
  let stamp  = 0
  let points = []
  let terrain
  let model

  function Stamp () {
    let now = performance.now ()
    delay   = stamp ? now - stamp : delay
    stamp   = now
  }

  function doLinks (shared) {
    let best = shared.getPoint ()
    if (best) {
      for (let point of points) {
        helper.doLink (best, point)
      }
    }
  }

  function doPoints () {
    for (let point of points) {
      helper.doPoint (point)
    }
  }

  function doBest (shared) {
    let point = shared.getPoint ()
    point && helper.doBest (point)
  }

  function doParticles (particles, time) {
    for (let particle of particles) {
      let iPoint = particle.getPPoint ()
      let oPoint = particle.getCPoint ()
      let x      = iPoint.getX () + (oPoint.getX () - iPoint.getX ()) * time
      let y      = iPoint.getY () + (oPoint.getY () - iPoint.getY ()) * time
      helper.doParticle (x, y)
    }
  }

  function Text (shared) {
    let point = shared.getPoint ()
    let score = shared.getScore ().toFixed (FIXED)
    let x     = point && point.getX ().toFixed (FIXED)
    let y     = point && point.getY ().toFixed (FIXED)
    return point ? `[${x}, ${y}]  :  ${score} ` : SEP
  }

  requestAnimationFrame (function render (now) {
    if (model) {
      let particles = model.getParticles ()
      let shared    = model.getShared ()
      let time      = Math.max (0, Math.min (1, (now - stamp) / delay))
      helper.doBackground ()
      doLinks     (shared)
      doPoints    ()
      doBest      (shared)
      doParticles (particles, time)
    }
    requestAnimationFrame (render)
  })

  function config (cfg) {
    points = cfg[POINTS]
  }

  function execute (context) {
    Stamp ()
    model = context
    let current = model.getTerrain ()
    let changed = current !== terrain
    terrain = current
    changed && helper.doMap (terrain)
    output[TEXT] = Text (model.getShared ())
  }

  return {
    config,
    execute
  }

}

export default FView