const MODE    = '2d'
const WIDTH   = 'width'
const HEIGHT  = 'height'
const LWIDTH  = 'lineWidth'
const LSTYLE  = 'strokeStyle'
const FSTYLE  = 'fillStyle'
const AXIS    = 'rgba(148, 163, 184, 0.35)'
const PFILL   = '#fbbf24'
const BCOLOR  = '#34d399'
const TCOLOR  = 'rgba(248, 250, 252, 0.45)'
const DASH    = [6, 6]
const PRADIUS = 4
const AWIDTH  = 1
const LNWIDTH = 3

function DHelper (canvas) {

  let ctx = canvas.getContext (MODE)
  let min = 0
  let max = 1

  let toX = x => (x - min) / (max - min) * canvas[WIDTH]
  let toY = y => (y - min) / (max - min) * canvas[HEIGHT]

  function setRange (low, high) {
    min = low
    max = high
  }

  function doAxes () {
    let {width}  = canvas
    let {height} = canvas
    ctx[LWIDTH]  = AWIDTH
    ctx[LSTYLE]  = AXIS
    ctx.beginPath ()
    ctx.moveTo (toX (0), 0)
    ctx.lineTo (toX (0), height)
    ctx.moveTo (0,     toY (0))
    ctx.lineTo (width, toY (0))
    ctx.stroke ()
  }

  function doPoint (point) {
    ctx[FSTYLE] = PFILL
    ctx.beginPath ()
    ctx.arc (toX (point.getX ()), toY (point.getY ()), PRADIUS, 0, Math.PI * 2)
    ctx.fill ()
  }

  function doLine (a, b, color, dash) {
    ctx[LWIDTH] = LNWIDTH
    ctx[LSTYLE] = color
    ctx.setLineDash (dash)
    ctx.beginPath ()
    ctx.moveTo (toX (min), toY (a * min + b))
    ctx.lineTo (toX (max), toY (a * max + b))
    ctx.stroke ()
    ctx.setLineDash ([])
  }

  function doShared (a, b) {
    doLine (a, b, BCOLOR, [])
  }

  function doReal (a, b) {
    doLine (a, b, TCOLOR, DASH)
  }

  function clear () {
    let {width}  = canvas
    let {height} = canvas
    ctx.clearRect (0, 0, width, height)
  }

  return {
    setRange,
    doAxes,
    doPoint,
    doShared,
    doReal,
    clear
  }

}

export default DHelper