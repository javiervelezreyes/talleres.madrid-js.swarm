function Velocity (x, y) {

  function getX () {
    return x
  }

  function getY () {
    return y
  }

  function add (velocity) {
    let dx = velocity.getX ()
    let dy = velocity.getY ()
    return Velocity (x + dx, y + dy)
  }

  function sub (velocity) {
    let dx = velocity.getX ()
    let dy = velocity.getY ()
    return Velocity (x - dx, y - dy)
  }

  function scale (k) {
    let dx = k * x
    let dy = k * y
    return Velocity (dx, dy)
  }

  return {
    getX,
    getY,
    add,
    sub,
    scale
  }

}

export default Velocity