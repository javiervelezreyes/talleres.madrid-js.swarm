const MODE    = '2d'
const SPREFIX = 'rgba(251,191,36,'
const SSUFFIX = ')'
const LWIDTH  = 'lineWidth'
const LSTYLE  = 'strokeStyle'
const FSTYLE  = 'fillStyle'
const FONT    = 'font'
const TALING  = 'textAlign'
const TBASE   = 'textBaseline'
const AFILL   = '#f8fafc'
const NFILL   = '#38bdf8'
const LFILL   = '#0f172a'
const GSTYLE  = 'rgba(237, 238, 241, 0.65)'
const LFONT   = 'bold 9px system-ui, sans-serif'
const CENTER  = 'center'
const MIDDLE  = 'middle'
const X       = 'x'
const Y       = 'y'

const MIN     = 0.5
const MAX     = 6
const RADIUS  = 10
const TWIDTH  = 3
const GWIDTH  = 1

function VHelper (canvas) {

  let ctx = canvas.getContext (MODE)

  function doNode (node) {
    let x  = node.get (X)
    let y  = node.get (Y)
    let id = node.getId ()
    ctx[FSTYLE] = NFILL
    ctx.beginPath ()
    ctx.arc (x, y, RADIUS, 0, Math.PI * 2)
    ctx.fill ()
    ctx[FSTYLE] = LFILL
    ctx[FONT]   = LFONT
    ctx[TALING] = CENTER
    ctx[TBASE]  = MIDDLE
    ctx.fillText (id, x, y)
  }

  function doRoute (iNode, oNode, value) {
    let style = 0.06 + 0.8 * value
    ctx[LWIDTH] = MIN + (MAX - MIN) * value
    ctx[LSTYLE] = SPREFIX + style + SSUFFIX
    ctx.beginPath ()
    ctx.moveTo (iNode.get (X), iNode.get (Y))
    ctx.lineTo (oNode.get (X), oNode.get (Y))
    ctx.stroke ()
  }

  function doAnt (x, y) {
    ctx[FSTYLE] = AFILL
    ctx.beginPath ()
    ctx.arc (x, y, 3, 0, Math.PI * 2)
    ctx.fill ()
  }

  function doPath (nodes, style) {
    let first = nodes.at (0)
    ctx[LWIDTH] = TWIDTH
    ctx[LSTYLE] = style
    ctx.beginPath ()
    ctx.moveTo (first.get (X), first.get (Y))
    for (let node of nodes) {
      ctx.lineTo (node.get (X), node.get (Y))
    }
    ctx.stroke ()
    ctx.setLineDash ([])
  }

  function doLayer (x) {
    let {height} = canvas
    ctx[LWIDTH]  = GWIDTH
    ctx[LSTYLE]  = GSTYLE
    ctx.setLineDash ([1, 5])
    ctx.beginPath ()
    ctx.moveTo (x, 0)
    ctx.lineTo (x, height)
    ctx.stroke ()
    ctx.setLineDash ([])
  }

  function clear () {
    let {width}  = canvas
    let {height} = canvas
    ctx.clearRect (0, 0, width, height)
  }

  return { 
    doAnt,
    doNode, 
    doRoute,
    doPath,
    doLayer,
    clear
   }

}

export default VHelper