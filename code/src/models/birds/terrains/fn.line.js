const LENGTH = 'length'

function Line (points) {

  return function (a, b) {
    let total = 0
    for (let point of points) {
      let expected = a * point.getX () + b
      let error    = point.getY () - expected
      total        = total + error * error
    }
    return total / points[LENGTH]
  }

}

export default Line