const sliders = document.querySelectorAll(".slider_container")
  const images = document.querySelectorAll(".media_image")
  let isMouseDown = false
  let startX, scrollLeft, scrollSpeed = 0, lastX, lastTime
  
  sliders.forEach(scrollContainer => {
    scrollContainer.addEventListener("mousedown", (e) => {
      isMouseDown = true
      startX = e.pageX - scrollContainer.offsetLeft
      scrollLeft = scrollContainer.scrollLeft
      lastX = e.pageX
      lastTime = Date.now()
      scrollSpeed = 0
      scrollContainer.style.userSelect = "none"

      images.forEach(image => {
        image.style.pointerEvents = "none"
      })
    })

    scrollContainer.addEventListener("mouseleave", () => {
      isMouseDown = false
      scrollContainer.style.userSelect = "auto"

      images.forEach(image => {
        image.style.pointerEvents = "auto"
      })

      inertia(scrollContainer)
    })

    scrollContainer.addEventListener("mouseup", () => {
      isMouseDown = false
      scrollContainer.style.userSelect = "auto"

      images.forEach(image => {
        image.style.pointerEvents = "auto"
      })

      inertia(scrollContainer)
    })

    scrollContainer.addEventListener("mousemove", (e) => {
      if (!isMouseDown) return
      e.preventDefault()
      const x = e.pageX - scrollContainer.offsetLeft
      const walk = (x - startX) * 2
      scrollContainer.scrollLeft = scrollLeft - walk

      const now = Date.now()
      const timeDelta = now - lastTime
      const distance = e.pageX - lastX
      scrollSpeed = distance / timeDelta
      lastX = e.pageX
      lastTime = now
    })
  })

  function inertia(scrollContainer) {
    if (Math.abs(scrollSpeed) > 0.1) {
      scrollContainer.scrollLeft -= scrollSpeed * 10
      scrollSpeed *= 0.95
      requestAnimationFrame(() => inertia(scrollContainer))
    }
  }