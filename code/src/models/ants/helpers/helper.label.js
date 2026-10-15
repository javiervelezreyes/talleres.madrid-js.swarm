const PREFIX = ''
const SEP    = ''

function LHelper (prefix) {

  let idx = 0

  function create (n) {
    let label = prefix || PREFIX 
    let key    = n     || idx++
    return [label, key].join (SEP)
  }

  return { create }

}

export default LHelper