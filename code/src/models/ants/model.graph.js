function Graph (nodes, routes) {

  function getNodes () {
    return [...nodes]
  }

  function getRoutes () {
    return [...routes]
  }

  return {
    getNodes,
    getRoutes
  }

}

export default Graph