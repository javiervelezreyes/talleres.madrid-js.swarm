function HRange (min, max) {

  function range (value) {
    value = Math.max (min, value)
    value = Math.min (max, value)
    return value
  }

  return { range }

}

export default HRange