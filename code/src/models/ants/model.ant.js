import RHelper from './helpers/helper.random.js'

const DELTA = 1

let Add = (x, y) => x + y

function Ant (id, start, config) {

  let node  = start
  let nodes = new Set ([start])

  function getId () {
    return id
  }

  function getNode () {
    return node
  }

  function getNodes () {
    return [...nodes]
  }

  function getRoutes () {
    let routes = node.getRoutes ()
    let free   = routes.filter (function (route) {
      let to = route.getNode ()
      let ok = !nodes.has (to)
      return ok
    })
    return free.length && free
  }

  function getForce (route) {
    let {alpha}   = config
    let {beta}    = config
    let signal    = route.getSignal ()
    let weight    = route.getWeight ()
    let pheromone = Math.pow (signal, alpha)
    let closeness = Math.pow (1 / weight, beta)
    return pheromone * closeness
  }

  function getNext (routes) {
    let forces = routes.map (getForce)
    let total  = forces.reduce (Add, 0)
    let max    = RHelper.Float (0, total)
    let last   = routes.length - 1
    let idx    = 0
    while (idx < last && max > forces[idx]) {
      max = max - forces[idx]
      idx++
    }
    return routes[idx]
  }

  function next () {
    let routes = getRoutes ()
    let end    = !routes
    if (end) reset ()
    else {
      let route = getNext (routes)
      node = route.getNode ()
      nodes.add (node)
      route.inc (DELTA)
    }
  }

  function reset () {
    node  = start
    nodes = new Set ([start])
  }

  return {
    getId,
    getNode,
    getNodes,
    next,
    reset
  }

}

export default Ant