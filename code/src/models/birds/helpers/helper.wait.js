const DELAY = 3000

function WHelper () {

  function wait (ms) {
    return new Promise (function (ok) {
      setTimeout (ok, ms || DELAY)
    })
  }

  return { wait }

}

export default WHelper ()