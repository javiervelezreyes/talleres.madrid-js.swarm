const AMPLITUDE  = 20
const DECAY      = 0.2
const FREQUENCY  = 2 * Math.PI
const DIMENSIONS = 2

function TAckley () {

  return function (x, y) {
    let radius = Math.sqrt ((x * x + y * y) / DIMENSIONS)
    let waves  = (Math.cos (FREQUENCY * x) + Math.cos (FREQUENCY * y)) / DIMENSIONS
    return -AMPLITUDE * Math.exp (-DECAY * radius) - Math.exp (waves) + AMPLITUDE + Math.E
  }
  
}

export default TAckley ()