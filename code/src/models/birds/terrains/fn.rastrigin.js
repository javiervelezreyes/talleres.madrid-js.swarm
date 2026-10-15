const AMPLITUDE  = 10
const FREQUENCY  = 2 * Math.PI
const DIMENSIONS = 2

let Term = x => x * x - AMPLITUDE * Math.cos (FREQUENCY * x)

function TRastrigin () {

  return function (x, y) {
    let dx = Term (x)
    let dy = Term (y)
    return AMPLITUDE * DIMENSIONS + dx + dy
  }

}

export default TRastrigin ()