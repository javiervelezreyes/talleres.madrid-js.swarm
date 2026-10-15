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
const HOME   = 'H'
const FOOD   = 'F'
const CELL   = 'C'
const ANT    = 'A'
const ASIZE  = 'asize'
const DELAY  = 'delay'
const LENGTH = 'length'
const X      = 'x'
const Y      = 'y'
const ON     = true
const OFF    = false
const NULL   = undefined

let Sort = (x, y) => x - y

function SCase (cfg, view) {

  let {width}  = cfg
  let {height} = cfg
  let {lsize}  = cfg
  let {wsize}  = cfg
  let {asize}  = cfg
  let {alpha}  = cfg
  let {beta}   = cfg
  let {rate}   = cfg
  let params

  let CHelper
  let AHelper
  let engine
  let nodes
  let ants
  let active = OFF

  function Place (id, x, y) {
    let node = Node (id)
    node.set (X, x)
    node.set (Y, y)
    return node
  }

  function Layers () {
    let layers = []
    let xmax   = (width - 2 * MARGIN) / (lsize + 1)
    let ymax   = height - MARGIN
    let lIdx   = 1
    while (lIdx <= lsize) {
      let layer = []
      let ys    = []
      let x     = MARGIN + xmax * lIdx
      let nIdx  = 0
      while (nIdx < wsize) {
        let y = RHelper.Float (MARGIN, ymax)
        ys.push (y)
        nIdx++
      }
      ys.sort (Sort)
      for (let y of ys) {
        let id   = CHelper.create ()
        let node = Place (id, x, y)
        layer.push (node)
      }
      layers.push (layer)
      lIdx++
    }
    let middle = height / 2
    let home   = Place (HOME, MARGIN, middle)
    let food   = Place (FOOD, width - MARGIN, middle)
    return [[home], ...layers, [food]]
  }

  function Routes (layers) {
    let routes = []
    let last   = layers[LENGTH] - 1
    let idx    = 0
    while (idx < last) {
      for (let iNode of layers[idx]) {
        for (let oNode of layers[idx + 1]) {
          let weight = NHelper (iNode).mod (oNode)
          let route  = Route (oNode, weight)
          iNode.addRoute (route)
          routes.push (route)
        }
      }
      idx++
    }
    return routes
  }

  function ARefresh (size) {
    let start = nodes.at (0)
    while (ants[LENGTH] < size) {
      let id  = AHelper.create ()
      let ant = Ant (id, start, params)
      ants.push (ant)
    }
    while (ants[LENGTH] > size) {
      ants.pop ()
    }
  }

  function DRefresh (value) {
    engine.init ({ [DELAY] : value })
    active && engine.start ()
  }

  function config (key, value) {
    let isAnts  = key == ASIZE
    let isDelay = key == DELAY
    let isParam = !isAnts && !isDelay
    isAnts  && ARefresh (value)
    isDelay && DRefresh (value)
    isParam && (params[key] = value)
  }

  function init () {
    let layers, routes, graph, colony
    destroy ()
    params  = { alpha, beta, rate }
    CHelper = LHelper (CELL)
    AHelper = LHelper (ANT)
    layers  = Layers ()
    nodes   = layers.flat ()
    ants    = []
    routes  = Routes (layers)
    graph   = Graph  (nodes, routes)
    ARefresh (asize)
    colony  = Colony (graph, ants, params)
    engine  = Engine (colony, view)
    engine.init (cfg)
    return colony
  }

  function start () {
    if (!active) {
      active = ON
      engine.start ()
    }
  }

  function stop () {
    if (!active) {
      active = OFF
      engine.stop ()
    }
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

export default SCase