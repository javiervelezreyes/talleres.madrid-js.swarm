import Engine  from '../../../core/core.engine.js'
import Ant     from '../model.ant.js'
import Colony  from '../model.colony.js'
import Node    from '../model.node.js'
import Route   from '../model.route.js'
import Graph   from '../model.graph.js'
import LHelper from '../helpers/helper.label.js'
import NHelper from '../helpers/helper.node.js'
import RHelper from '../helpers/helper.random.js'

const MARGIN = 20
const CITY   = 'C'
const ANT    = 'A'
const X      = 'x'
const Y      = 'y'
const NULL   = undefined

function TCase (cfg, view) {

  let {width}  = cfg
  let {height} = cfg
  let {csize}  = cfg
  let {asize}  = cfg
  let {alpha}  = cfg
  let {beta}   = cfg
  let {rate}   = cfg
  let params

  let CHelper
  let AHelper
  let engine

  function Nodes () {
    let nodes = []
    let xmax  = width  - MARGIN
    let ymax  = height - MARGIN
    let idx   = 0
    while (idx < csize) {
      let id   = CHelper.create ()
      let x    = RHelper.Float (MARGIN, xmax)
      let y    = RHelper.Float (MARGIN, ymax)
      let node = Node (id)
      node.set (X, x)
      node.set (Y, y)
      nodes.push (node)
      idx++
    }
    return nodes
  }

  function Routes (nodes) {
    let routes = []
    for (let iNode of nodes) {
      for (let oNode of nodes) {
        let ok = iNode !== oNode
        if (ok) {
          let weight = NHelper (iNode).mod (oNode)
          let route  = Route (oNode, weight)
          iNode.addRoute (route)
          routes.push (route)
        }
      }
    }
    return routes
  }

  function Ants (nodes) {
    let ants  = []
    let start = nodes.at (0)
    let idx   = 0
    while (idx < asize) {
      let id  = AHelper.create ()
      let ant = Ant (id, start, params)
      ants.push (ant)
      idx++
    }
    return ants
  }

  function config (key, value) {
    params[key] = value
  }

  function init () {
    destroy ()
    params  = { alpha, beta, rate }
    CHelper = LHelper (CITY)
    AHelper = LHelper (ANT)
    let nodes  = Nodes  ()
    let routes = Routes (nodes)
    let graph  = Graph  (nodes, routes)
    let ants   = Ants   (nodes)
    let colony = Colony (graph, ants, params)
    engine     = Engine (colony, view)
    engine.init (cfg)
    return colony
  }

  function start () {
    engine.start ()
  }

  function stop () {
    engine.stop ()
  }

  function destroy () {
    engine && engine.destroy ()
    engine = NULL
  }

  return {
    config,
    init,
    start,
    stop,
    destroy
  }

}

export default TCase