function TSphere () {

  return function (x, y) {
    let dx = x * x
    let dy = y * y
    return dx + dy
  }

}

export default TSphere ()