function TDistance (points) {

  return function (x, y) {
    let total = 0
    for (let point of points) {
      let dx = x - point.getX ()
      let dy = y - point.getY ()
      total  = total + Math.hypot (dx, dy)
    }
    return total
  }

}

export default TDistance