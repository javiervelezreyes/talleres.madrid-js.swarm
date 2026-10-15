let Next   = x  => x.next  ()
let Reset  = x  => x.reset ()
let Nexts  = xs => xs.forEach (Next)
let Resets = xs => xs.forEach (Reset)

function Flock (terrain, particles, shared) {

  function getTerrain () {
    return terrain
  }

  function getParticles () {
    return particles
  }

  function getShared () {
    return shared
  }

  function refresh () {
    let point = shared.getPoint ()
    let score = point && terrain.get (point)
    point && shared.refresh (score)
  }

  function next () {
    terrain.next ()
    refresh ()
    Nexts (particles)
  }

  function reset () {
    terrain.reset ()
    shared .reset ()
    Resets (particles)
  }

  return {
    getTerrain,
    getParticles,
    getShared,
    next,
    reset
  }

}

export default Flock