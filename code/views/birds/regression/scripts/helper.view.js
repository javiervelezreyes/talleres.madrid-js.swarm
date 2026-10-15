import Point from '../../../../src/models/birds/model.point.js'

const MODE    = '2d'
const CANVAS  = 'canvas'
const WIDTH   = 'width'
const HEIGHT  = 'height'
const LWIDTH  = 'lineWidth'
const LSTYLE  = 'strokeStyle'
const FSTYLE  = 'fillStyle'
const PFILL   = '#f8fafc'
const BCOLOR  = '#34d399'
const HUE     = 220
const SAT     = 70
const LMIN    = 15
const LSPAN   = 30
const RES     = 80
const PRADIUS = 3
const BRADIUS = 9
const BWIDTH  = 2

function VHelper (canvas) {

  let ctx  = canvas.getContext (MODE)
  let map  = document.createElement (CANVAS)
  let mctx = map.getContext (MODE)
  let min  = 0
  let max  = 1

  map[WIDTH]  = RES
  map[HEIGHT] = RES

  let toX = x => (x - min) / (max - min) * canvas[WIDTH]
  let toY = y => (y - min) / (max - min) * canvas[HEIGHT]

  function Color (time) {
    let light = LMIN + LSPAN * time
    let hue   = HUE * (1 - time)
    let sat   = SAT
    return `hsl(${hue}, ${sat}%, ${light}%)`
  }

  function doMap (terrain) {
    let scores = []
    let iy     = 0
    let idx    = 0
    min        = terrain.getMin ()
    max        = terrain.getMax ()
    let step   = (max - min) / RES
    while (iy < RES) {
      let ix = 0
      while (ix < RES) {
        let point = Point (min + step * (ix + 0.5), min + step * (iy + 0.5))
        scores.push (terrain.get (point))
        ix++
      }
      iy++
    }
    let low  = Math.min (...scores)
    let span = (Math.max (...scores) - low) || 1
    for (let score of scores) {
      let t = Math.sqrt ((score - low) / span)
      mctx[FSTYLE] = Color (t)
      mctx.fillRect (idx % RES, Math.floor (idx / RES), 1, 1)
      idx++
    }
  }

  function doBackground () {
    let {width}  = canvas
    let {height} = canvas
    ctx.drawImage (map, 0, 0, width, height)
  }

  function doParticle (x, y) {
    ctx[FSTYLE] = PFILL
    ctx.beginPath ()
    ctx.arc (toX (x), toY (y), PRADIUS, 0, Math.PI * 2)
    ctx.fill ()
  }

  function doShared (point) {
    ctx[LWIDTH] = BWIDTH
    ctx[LSTYLE] = BCOLOR
    ctx.beginPath ()
    ctx.arc (toX (point.getX ()), toY (point.getY ()), BRADIUS, 0, Math.PI * 2)
    ctx.stroke ()
  }

  return {
    doMap,
    doBackground,
    doParticle,
    doShared
  }

}

export default VHelper