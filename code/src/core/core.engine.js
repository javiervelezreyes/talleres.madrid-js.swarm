const DELAY = 'delay'
const MS    = 100

const ON  = true
const OFF = false

function Engine (model, view) {

  let timer
  let delay  = MS
  let active = OFF

  function init (cfg) {
    stop ()
    delay = cfg[DELAY] || MS
  }

  function start () {
    if (!active) {
      active = ON
      timer  = setInterval (function () {
        model.next ()
        view.execute (model)
      }, delay)
    }
  }

  function stop () {
    if (active) {
      active = OFF
      clearInterval (timer)
    }
  }

  function destroy () {
    stop ()
    model.reset ()
    view.execute (model)
  }

  return {
    init,
    start,
    stop,
    destroy
  }

}

export default Engine