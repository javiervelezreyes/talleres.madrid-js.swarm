function Node (id) {

  let routes  = new Set ()
  let context = new Map ()

  function getId () {
    return id
  }

  function get (key) {
    return (
       key && context.get (key) ||
      !key && context.keys ()
    )
  }

  function set (key, value) {
    context.set (key, value)
  }

  function getRoutes () {
    return [...routes]
  }

  function addRoute (route) {
    routes.add (route)
  }

  function removeRoute (route) {
     route && routes.delete (route)
    !route && routes.clear  ()
  }

  return {
    getId,
    get,
    set,
    getRoutes,
    addRoute,
    removeRoute
  }

}

export default Node