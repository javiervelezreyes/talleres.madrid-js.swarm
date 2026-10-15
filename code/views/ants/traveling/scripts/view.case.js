import THelper from './helper.tour.js'
import VHelper from './helper.view.js'

const X    = 'x'
const Y    = 'y'
const TSEP = ' - '
const LSEP = ' : '
const TEXT = 'textContent'

let Id     = x => x.getId ()
let Signal = x => x.getSignal ()

function TView (canvas, output) {

  let helper = VHelper (canvas)
  let delay  = 100
  let stamp  = 0
  let model
  let tour

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

  function doTour (tour) {
    tour && helper.doTour (tour)
  }

  requestAnimationFrame (function render (now) {
    helper.clear ()
    if (model) {
      let graph = model.getGraph ()
      let ants  = model.getAnts ()
      let time  = Math.max (0, Math.min (1, (now - stamp) / delay))
      doRoutes (graph)
      doTour   (tour)
      doNodes  (graph)
      doAnts   (ants, time)
    }
    requestAnimationFrame (render)
  })

  function execute (context) {
    model = context
    Stamp ()
    let graph   = model.getGraph ()
    let nodes   = graph.getNodes ()
    let tHelper = THelper (nodes)
        tour    = tHelper.getTour ()
    let ids     = tour.map (Id)
    let path    = ids.join (TSEP)
    let length  = tHelper.getLength (tour) | 0
    output[TEXT] = [path, length].join (LSEP)
  }

  return { execute }

}

export default TView