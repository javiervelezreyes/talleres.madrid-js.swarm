import Velocity from './model.velocity.js'

function Point (x, y) {

  function getX () {
    return x
  }

  function getY () {
    return y
  }

  function add (point) {
    let dx = point.getX ()
    let dy = point.getY ()
    return Point (x + dx, y + dy)
  }

  function sub (point) {
    let dx = point.getX ()
    let dy = point.getY ()
    return Velocity (x - dx, y - dy)
  }

  return {
    getX,
    getY,
    add,
    sub
  }

}

export default Point