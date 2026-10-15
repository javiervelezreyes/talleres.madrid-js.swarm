const LENGTH = 'length'
const NULL   = undefined

let Not    = x => x == NULL
let Equals = y => x => x.getNode () === y

function PathHelper (nodes) {

  function isBetter (a, b) {
    let sa   = a.getSignal ()
    let sb   = b.getSignal ()
    let same = sa === sb
    return same ? a.getWeight () < b.getWeight () : sa > sb
  }

  function getRoute (node) {
    let routes = node.getRoutes ()
    let best
    for (let route of routes) {
      let win = !best || isBetter (route, best)
      win && (best = route)
    }
    return best
  }

  function getBest () {
    let path  = [nodes.at (0)]
    let route = getRoute (path.at (-1))
    while (route) {
      let node = route.getNode ()
      path.push (node)
      route = getRoute (node)
    }
    return path
  }

  function getShortest () {
    let costs  = new Map ([[nodes.at (0), 0]])
    let oNodes = new Map ()
    for (let node of nodes) {
      let base   = costs.get (node)
      let routes = node.getRoutes ()
      for (let route of routes) {
        let oNode   = route.getNode ()
        let weights = base + route.getWeight ()
        let cost    = costs.get (oNode)
        let win     = Not (cost) || weights < cost
        if (win) {
          costs .set (oNode, weights)
          oNodes.set (oNode, node)
        }
      }
    }
    let path     = [nodes.at (-1)]
    let previous = oNodes.get (path.at (0))
    while (previous) {
      path.unshift (previous)
      previous = oNodes.get (path.at (0))
    }
    return path
  }

  function getLength (path) {
    let length = 0
    let idx    = 1
    while (idx < path[LENGTH]) {
      let bNode  = path[idx - 1]
      let eNode  = path[idx]
      let routes = bNode.getRoutes ()
      let route  = routes.find (Equals (eNode))
      length = length + route.getWeight ()
      idx++
    }
    return length
  }

  return {
    getBest,
    getShortest,
    getLength
  }

}

export default PathHelper