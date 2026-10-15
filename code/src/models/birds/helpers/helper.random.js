function RHelper () {

  function Float (min, max) {
    let value = Math.random ()
    value = min + value * (max - min)
    return value
  }

  function Int (min, max) {
    let value = Float (min, max)
    value = Math.floor (value)
    return value
  }

  return {
    Float,
    Int
  }

}

export default RHelper ()