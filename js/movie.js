const option1 = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdiNThiODQ1YTY5ZTdlY2IyNmY0OTgxNWZiOTI3MiIsIm5iZiI6MTczMzE2NTAyNi40LCJzdWIiOiI2NzRkZmZlMjU2MmIwMzBiYjVhZGU3MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.487BTYd3V5PDtBLIy3XD93cJQdQog7VbivKSEwVf7dk'
    }
  };
  
  fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', option1)
    .then(res => res.json())
    .then(res => {
      const movieImage = document.querySelectorAll(".movie_image")
      const movieTitle = document.querySelectorAll(".movie_title")
      const movieDes = document.querySelectorAll(".movie_des")

      const popMovie = res.results.sort((a, b) => b.popularity - a.popularity)

      movieImage.forEach((image, index) => {
          const imageLink = popMovie[index].poster_path
          image.setAttribute("src", `https://image.tmdb.org/t/p/w300${imageLink}`)
      })

      movieTitle.forEach((title, index) => {
        title.textContent = popMovie[index].title
      })

      movieDes.forEach((des, index) => {
        des.textContent = popMovie[index].overview
      })
    })
    .catch(err => console.error(err));

const option2 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdiNThiODQ1YTY5ZTdlY2IyNmY0OTgxNWZiOTI3MiIsIm5iZiI6MTczMzE2NTAyNi40LCJzdWIiOiI2NzRkZmZlMjU2MmIwMzBiYjVhZGU3MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.487BTYd3V5PDtBLIy3XD93cJQdQog7VbivKSEwVf7dk'
  }
};

fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', option2)
  .then(res => res.json())
  .then(res => {
    const tvImage = document.querySelectorAll(".tv_image")
    const tvTitle = document.querySelectorAll(".tv_title")
    const tvDes = document.querySelectorAll(".tv_des")

    const popTv = res.results.sort((a, b) => b.popularity - a.popularity)

    tvImage.forEach((image, index) => {
        const imageLink = popTv[index].poster_path
        image.setAttribute("src", `https://image.tmdb.org/t/p/w300${imageLink}`)
    })

    tvTitle.forEach((title, index) => {
      title.textContent = popTv[index].name
    })

    tvDes.forEach((des, index) => {
      des.textContent = popTv[index].overview
    })
  })
  .catch(err => console.error(err));

  const modalButton = document.querySelectorAll(".modal_button")
  modalButton.forEach((button) => {
    button.addEventListener("click", function() {
      console.log("button clicked")
      const prevOverlay = document.querySelector(".overlay")
      if (prevOverlay) {
        prevOverlay.remove()
      }
      const modalImage = this.parentElement.querySelector(".media_image").cloneNode()
      const modalTitle = this.parentElement.querySelector(".media_title").cloneNode(true)
      const modalDes = this.parentElement.querySelector(".media_des").cloneNode(true)
  
      const overlay = document.createElement("div")
      const modal = document.createElement("div")
      const modalRight = document.createElement("div")
      const closeModal = document.createElement("div")
      const closeIcon = document.createElement("p")
      
      overlay.className = "overlay"
      modal.className = "modal"
      modalRight.className = "modal_right"
      closeModal.className = "close_modal"
      closeIcon.className = "close_icon"
      closeIcon.innerHTML = "&#10006;"
  
      modalRight.append(modalTitle, modalDes)
      closeModal.appendChild(closeIcon)
      modal.append(modalImage, modalRight, closeModal)
      overlay.appendChild(modal)
      document.body.appendChild(overlay)
  
      closeModal.addEventListener("click", function() {
        overlay.remove()
      })
    })
  
    document.addEventListener("click", function(e) {
      if (document.querySelector(".overlay") && !e.target.closest(".modal")) {
        document.querySelector(".overlay").remove()
      }
    })
  
    document.querySelectorAll(".modal_button").forEach((element) => {
      element.addEventListener("click", function(e) {
        e.stopPropagation()
      })
    })
  })
  

