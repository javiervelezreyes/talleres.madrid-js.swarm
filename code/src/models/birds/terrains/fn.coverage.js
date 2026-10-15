const ONE   = 1
const REACH = 1.5

function Coverage (points) {

  return function (x, y) {
    let total = 0
    for (let point of points) {
      let dx    = x - point.getX ()
      let dy    = y - point.getY ()
      let ratio = Math.hypot (dx, dy) / REACH
      total     = total + ONE / (ONE + ratio * ratio)
    }
    return total
  }

}

export default Coverage