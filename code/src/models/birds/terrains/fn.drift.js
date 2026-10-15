const ONE    = 1
const RADIUS = 3
const REACH  = 1.5
const SPEED  = 0.05

function TDrift (points) {

  let center = points.at (0)

  return function (x, y, time) {
    let angle = SPEED * time
    let tx    = center.getX () + RADIUS * Math.cos (angle)
    let ty    = center.getY () + RADIUS * Math.sin (angle)
    let ratio = Math.hypot (x - tx, y - ty) / REACH
    return ONE / (ONE + ratio * ratio)
  }

}

export default TDrift