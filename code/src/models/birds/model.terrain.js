import Point  from './model.point.js'
import HRange from './helpers/helper.range.js'

function Terrain (fn, bounds) {

  let {min}  = bounds
  let {max}  = bounds
  let helper = HRange (min, max)
  let time   = 0

  function get (point) {
    let x = point.getX ()
    let y = point.getY ()
    return fn (x, y, time)
  }

  function getMin () {
    return min
  }

  function getMax () {
    return max
  }

  function range (point) {
    let x = helper.range (point.getX ())
    let y = helper.range (point.getY ())
    return Point (x, y)
  }

  function next () {
    time++
  }

  function reset () {
    time = 0
  }

  return {
    get,
    getMin,
    getMax,
    range,
    next,
    reset
  }

}

export default Terrain