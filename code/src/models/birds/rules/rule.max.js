const INIT = -Infinity

function RMax () {

  function getInit () {
    return INIT
  }

  function check (score, value) {
    return score > value
  }

  return {
    getInit,
    check
  }

}

export default RMax