let Next   = x  => x.next  ()
let Reset  = x  => x.reset ()
let Nexts  = xs => xs.forEach (Next)
let Resets = xs => xs.forEach (Reset)

function Colony (graph, ants, config) {

  let routes = graph.getRoutes ()

  function getAnts () {
    return ants
  }

  function getGraph () {
    return graph
  }

  function evaporate () {
    let {rate} = config
    for (let route of routes) {
      let weight = route.getWeight ()
      let delta  = rate * weight
      route.dec (delta)
    }
  }

  function next () {
    Nexts (ants)
    evaporate ()
  }

  function reset () {
    Resets (ants)
    Resets (routes)
  }

  return {
    getGraph,
    getAnts,
    next,
    reset
  }

}

export default Colony