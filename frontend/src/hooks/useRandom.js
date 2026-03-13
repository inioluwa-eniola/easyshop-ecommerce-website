const useRandom = () => {
  function randomIndex(length) {
    if (length <= 0) {
      return null
    } else {
      const index = Math.floor(Math.random() * length)
      return index
    }
  }

  return { randomIndex }
}

export { useRandom }