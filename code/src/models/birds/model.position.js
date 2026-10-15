const NULL = undefined

function Position (rule) {

  let Point = NULL
  let Score = rule.getInit ()

  function getPoint () {
    return Point
  }

  function getScore () {
    return Score
  }

  function check (point, score) {
    let ok = rule.check (score, Score)
    if (ok) {
      Point = point
      Score = score
    }
    return ok
  }

  function refresh (score) {
    Point && (Score = score)
  }

  function reset () {
    Point = NULL
    Score = rule.getInit ()
  }

  return {
    getPoint,
    getScore,
    check,
    refresh,
    reset
  }

}

export default Position