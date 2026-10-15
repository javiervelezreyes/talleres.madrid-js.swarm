import VHelper from './helper.view.js'

const TEXT  = 'textContent'
const FIXED = 4
const SEP   = ''

function VView (canvas, output) {

  let helper = VHelper (canvas)
  let delay  = 100
  let stamp  = 0
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
      helper.doParticle (x, y)
    }
  }

  function doShared (shared) {
    let point = shared.getPoint ()
    point && helper.doShared (point)
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
      doShared    (shared)
      doParticles (particles, time)
    }
    requestAnimationFrame (render)
  })

  function execute (context) {
    Stamp ()
    model = context
    let terrain = model.getTerrain ()
    helper.doMap (terrain)
    output[TEXT] = Text (model.getShared ())
  }

  return { execute }

}

export default VView