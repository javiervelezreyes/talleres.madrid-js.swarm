const MIN = 1

function Route (node, weight) {

  let signal = MIN

  function getNode () {
    return node
  }

  function getWeight () {
    return weight
  }

  function getSignal () {
    return signal
  }

  function inc (value) {
    signal = signal + value
  }

  function dec (value) {
    signal = Math.max (MIN, signal - value)
  }

  function reset () {
    signal = MIN
  }

  return {
    getNode,
    getWeight,
    getSignal,
    inc,
    dec,
    reset
  }

}

export default Route