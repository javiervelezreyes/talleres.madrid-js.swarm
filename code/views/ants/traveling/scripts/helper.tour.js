import NHelper from '../../../../src/models/ants/helpers/helper.node.js'

let  asSet = xs => new Set (xs) 

function THelper (nodes) {

  function isBetter (a, b) {
    let sa   = a.getSignal ()
    let sb   = b.getSignal ()
    let same = sa === sb
    return same ? a.getWeight () < b.getWeight () : sa > sb
  }

  function getNext (node, visited) {
    let routes  = node.getRoutes ()
    let best
    for (let route of routes) {
      let free = !visited.has (route.getNode ())
      let win  = free && (!best || isBetter (route, best))
      win && (best = route)
    }
    return best
  }

  function getTour () {
    let start   = nodes.at (0)
    let tour    = [start]
    let visited = asSet (tour)
    let route   = getNext (start, visited)
    while (route) {
      let node = route.getNode ()
      tour.push (node)
      visited.add (node)
      route = getNext (node, visited)
    }
    return tour
  }

  function getLength (tour) {
    let length = 0
    for (let i = 0; i < tour.length; i++) {
      let a = tour.at (i - 1)
      let b = tour[i]
      length = length + NHelper (a).mod (b)
    }
    return length
  }

  return {
    getTour,
    getLength
  }

}

export default THelper