import Velocity from './model.velocity.js'
import Position from './model.position.js'
import RHelper  from './helpers/helper.random.js'

const LOW  = 0
const HIGH = 1

let ZERO = Velocity (0, 0)

function Particle (id, start, terrain, shared, rule, params) {

  let local    = Position (rule)
  let cPoint   = start
  let pPoint   = start
  let velocity = ZERO

  function getId () {
    return id
  }

  function getCPoint () {
    return cPoint
  }

  function getPPoint () {
    return pPoint
  }

  function getVelocity () {
    return velocity
  }

  function getLocal () {
    return local
  }

  function check () {
    let score = terrain.get (cPoint)
    local .check (cPoint, score)
    shared.check (cPoint, score)
  }

  function accelerate () {
    let {inertia}   = params
    let {cognitive} = params
    let {social}    = params
    let r1          = RHelper.Float (LOW, HIGH)
    let r2          = RHelper.Float (LOW, HIGH)
    let inertial    = velocity.scale (inertia)
    let own         = local .getPoint ().sub (cPoint).scale (cognitive * r1)
    let flock       = shared.getPoint ().sub (cPoint).scale (social    * r2)
        velocity    = inertial.add (own).add (flock)
  }

  function move () {
    let target   = cPoint.add (velocity)
        pPoint   = cPoint
        cPoint   = terrain.range (target)
        velocity = cPoint.sub (pPoint)
  }

  function refresh () {
    let point = local.getPoint ()
    let score = point && terrain.get (point)
    point && local.refresh (score)
  }

  function next () {
    refresh    ()
    check      ()
    accelerate ()
    move       ()
  }

  function reset () {
    cPoint   = start
    pPoint   = start
    velocity = ZERO
    local.reset ()
  }

  return {
    getId,
    getCPoint,
    getPPoint,
    getVelocity,
    getLocal,
    refresh,
    next,
    reset
  }

}

export default Particle