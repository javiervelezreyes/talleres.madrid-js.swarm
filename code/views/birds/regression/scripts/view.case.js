import VHelper from './helper.view.js'
import DHelper from './helper.data.js'

const POINTS    = 'points'
const SLOPE     = 'slope'
const INTERCEPT = 'intercept'
const TEXT      = 'textContent'
const FIXED     = 4
const SEP       = ''

function RView (canvas, data, output) {

  let vhelper = VHelper (canvas)
  let dhelper = DHelper (data)
  let delay   = 100
  let stamp   = 0
  let points  = []
  let slope
  let intercept
  let terrain
  let model

  function Stamp () {
    let now = performance.now ()
    delay   = stamp ? now - stamp : delay
    stamp   = now
  }

  function doParticles (particles, time) {
    for (let particle of particles) {
      let iPoint = particle.getPPoint ()
      let oPoint = particle.getCPoint ()
      let x      = iPoint.getX () + (oPoint.getX () - iPoint.getX ()) * time
      let y      = iPoint.getY () + (oPoint.getY () - iPoint.getY ()) * time
      vhelper.doParticle (x, y)
    }
  }

  function doShared (shared) {
    let point = shared.getPoint ()
    point && vhelper.doShared (point)
  }

  function doData (shared) {
    let best = shared.getPoint ()
    dhelper.clear  ()
    dhelper.doAxes ()
    for (let point of points) {
      dhelper.doPoint (point)
    }
    slope && dhelper.doReal   (slope, intercept)
    best  && dhelper.doShared (best.getX (), best.getY ())
  }

  requestAnimationFrame (function render (now) {
    if (model) {
      let particles = model.getParticles ()
      let shared    = model.getShared ()
      let time      = Math.max (0, Math.min (1, (now - stamp) / delay))
      vhelper.doBackground ()
      doShared    (shared)
      doParticles (particles, time)
      doData      (shared)
    }
    requestAnimationFrame (render)
  })

  function Text (shared) {
    let point = shared.getPoint ()
    let score = shared.getScore ().toFixed (FIXED)
    let a     = point && point.getX ().toFixed (FIXED)
    let b     = point && point.getY ().toFixed (FIXED)
    return point ? `{ a = ${a}, b = ${b} }  :  ${score} ` : SEP
  }

  function config (cfg) {
    points    = cfg[POINTS]
    slope     = cfg[SLOPE]
    intercept = cfg[INTERCEPT]
  }

  function execute (context) {
    Stamp ()
    model = context
    let current = model.getTerrain ()
    let changed = current !== terrain
    terrain = current
    changed && vhelper.doMap (terrain)
    changed && dhelper.setRange (terrain.getMin (), terrain.getMax ())
    output[TEXT] = Text (model.getShared ())
  }

  return {
    config,
    execute
  }

}

export default RView