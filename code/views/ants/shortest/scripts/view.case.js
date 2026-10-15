import PHelper from './helper.path.js'
import VHelper from './helper.view.js'

const X      = 'x'
const Y      = 'y'
const TEXT   = 'textContent'
const BCOLOR = '#34d399'
const SCOLOR = '#2c2e30'
const SEP    = ' / '

let Signal = x => x.getSignal ()

function SView (canvas, output) {

  let helper = VHelper (canvas)
  let delay  = 100
  let stamp  = 0
  let best
  let short
  let model

  function Stamp () {
    let now = performance.now ()
    delay   = stamp ? now - stamp : delay
    stamp   = now
  }

  function doRoutes (graph) {
    let routes  = graph.getRoutes ()
    let signals = routes.map (Signal)
    let max     = Math.max (...signals)
    let span    = (max - 1) || 1
    let nodes   = graph.getNodes ()
    for (let iNode of nodes) {
      let oRoutes = iNode.getRoutes ()
      for (let oRoute of oRoutes) {
        let oNode = oRoute.getNode ()
        let value = (oRoute.getSignal () - 1) / span
        helper.doRoute (iNode, oNode, value)
      }
    }
  }

  function doNodes (graph) {
    let nodes = graph.getNodes ()
    for (let node of nodes) {
      helper.doNode (node)
    }
  }

  function doAnts (ants, time) {
    for (let ant of ants) {
      let visited = ant.getNodes ()
      let oNode   = visited.at (-1)
      let iNode   = visited.at (-2) || oNode
      let x       = iNode.get (X) + (oNode.get (X) - iNode.get (X)) * time
      let y       = iNode.get (Y) + (oNode.get (Y) - iNode.get (Y)) * time
      helper.doAnt (x, y)
    }
  }

  function doLayers (graph) {
    let nodes = graph.getNodes ()
    let xs    = new Set ()
    for (let node of nodes) {
      xs.add (node.get (X))
    }
    for (let x of xs) {
      helper.doLayer (x)
    }
  }

  requestAnimationFrame (function render (now) {
    helper.clear ()
    if (model) {
      let graph = model.getGraph ()
      let ants  = model.getAnts ()
      let time  = Math.max (0, Math.min (1, (now - stamp) / delay))
      doLayers (graph)
      doRoutes (graph)
      best  && helper.doPath (best,  BCOLOR)
      short && helper.doPath (short, SCOLOR)
      doNodes  (graph)
      doAnts   (ants, time)
    }
    requestAnimationFrame (render)
  })

  function execute (context) {
    Stamp ()
    model = context
    let graph    = model.getGraph ()
    let nodes    = graph.getNodes ()
    let paths    = PHelper (nodes)
        best     = paths.getBest ()
        short    = paths.getShortest ()
    let colonia  = paths.getLength (best) .toFixed (0)
    let optimo   = paths.getLength (short).toFixed (0)
    output[TEXT] = [colonia, optimo].join (SEP)
  }

  return { execute }

}

export default SView