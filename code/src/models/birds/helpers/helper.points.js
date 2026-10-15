import Point   from '../model.point.js'
import HRange  from './helper.range.js'
import RHelper from './helper.random.js'

const MARGIN = 0.2
const SPREAD = 0.12

function CHelper (bounds) {

  let {min}  = bounds
  let {max}  = bounds
  let span   = max - min
  let helper = HRange (min, max)

  function Centers (groups) {
    let centers = []
    let low     = min + span * MARGIN
    let high    = max - span * MARGIN
    let idx     = 0
    while (idx < groups) {
      let x = RHelper.Float (low, high)
      let y = RHelper.Float (low, high)
      centers.push (Point (x, y))
      idx++
    }
    return centers
  }

  function Around (center) {
    let reach = span * SPREAD
    let x     = center.getX () + RHelper.Float (-reach, reach)
    let y     = center.getY () + RHelper.Float (-reach, reach)
    return Point (helper.range (x), helper.range (y))
  }

  function create (size, groups) {
    let centers = Centers (groups)
    let points  = []
    let idx     = 0
    while (idx < size) {
      let center = centers[idx % groups]
      points.push (Around (center))
      idx++
    }
    return points
  }

  return { create }

}

export default CHelper