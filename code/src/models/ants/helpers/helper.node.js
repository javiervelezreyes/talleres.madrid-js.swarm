const X = 'x'
const Y = 'y'

function NHelper (p) {

  function add (q) {
    let dx = p.get (X) + q.get (X)
    let dy = p.get (Y) + q.get (Y)
    return {
      [X] : dx,
      [Y] : dy,
    }
  }

  function sub (q) {
    let dx = p.get (X) - q.get (X)
    let dy = p.get (Y) - q.get (Y)
    return {
      [X] : dx,
      [Y] : dy,
    }
  }

  function mod (q) {
    let dx = p.get (X) - q.get (X)
    let dy = p.get (Y) - q.get (Y)
    return Math.hypot (dx, dy)
  }

  function asPoint () {
    let x = p.get (X)
    let y = p.get (y)
    return {x, y}
  }

  return { 
    add,
    sub,
    mod,
    asPoint
   }

}

export default NHelper