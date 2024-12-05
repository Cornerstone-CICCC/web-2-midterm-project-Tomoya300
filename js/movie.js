const movie = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdiNThiODQ1YTY5ZTdlY2IyNmY0OTgxNWZiOTI3MiIsIm5iZiI6MTczMzE2NTAyNi40LCJzdWIiOiI2NzRkZmZlMjU2MmIwMzBiYjVhZGU3MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.487BTYd3V5PDtBLIy3XD93cJQdQog7VbivKSEwVf7dk'
    }
  };
  
  fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', movie)
    .then(res => res.json())
    .then(res => {
      const movieImage = document.querySelectorAll(".movie_image")
      const movieTitle = document.querySelectorAll(".movie_title")
      const movieDes = document.querySelectorAll(".movie_des")
      const movieGenre = document.querySelectorAll(".movie_genre")

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

      movieGenre.forEach((genre, index) => {
        genre.textContent = popMovie[index].genre_ids
      })
    })
    .catch(err => console.error(err));

const tv = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdiNThiODQ1YTY5ZTdlY2IyNmY0OTgxNWZiOTI3MiIsIm5iZiI6MTczMzE2NTAyNi40LCJzdWIiOiI2NzRkZmZlMjU2MmIwMzBiYjVhZGU3MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.487BTYd3V5PDtBLIy3XD93cJQdQog7VbivKSEwVf7dk'
  }
};

fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', tv)
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

const genres = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdiNThiODQ1YTY5ZTdlY2IyNmY0OTgxNWZiOTI3MiIsIm5iZiI6MTczMzE2NTAyNi40LCJzdWIiOiI2NzRkZmZlMjU2MmIwMzBiYjVhZGU3MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.487BTYd3V5PDtBLIy3XD93cJQdQog7VbivKSEwVf7dk'
  }
};

fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', genres)
  .then(res => res.json())
  .then(res => {

    const genreArr = res.genres
    const mediaGenre = document.querySelectorAll(".media_genre")

    mediaGenre.forEach((genre) => {
      const idsString = genre.textContent
      const stringToNum = idsString.split(",").map(id => parseInt(id.trim()))
      const numToName = stringToNum.map(id => {
        const findId = genreArr.find(genre => genre.id === id)
        return findId ? findId.name : null;
      })
      const genreName = numToName.filter(name => name !== null)
      const newGenre = document.createElement("p")
      newGenre.classList.add("media_genre", "genre_name")
      newGenre.textContent = "Genre: " + genreName.join(", ")
      genre.after(newGenre)

    })
  })
  .catch(err => console.error(err));

const searchMedia = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdiNThiODQ1YTY5ZTdlY2IyNmY0OTgxNWZiOTI3MiIsIm5iZiI6MTczMzE2NTAyNi40LCJzdWIiOiI2NzRkZmZlMjU2MmIwMzBiYjVhZGU3MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.487BTYd3V5PDtBLIy3XD93cJQdQog7VbivKSEwVf7dk'
  }
};

const searchQuery = document.querySelector("input").value
const searchURL = `https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(searchQuery)}`;

fetch(searchURL, searchMedia)
  .then(res => res.json())
  .then(res => {
    console.log(res);
    if (res.results.length > 0) {
      res.results.forEach(result => {
        console.log(`Title: ${result.title || result.name}`);
        console.log(`Overview: ${result.overview}`);
        console.log(`Genres: ${result.genre_ids}`);
      });
    } else {
      console.log('No results found.');
    }
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
      const modalGenre = this.parentElement.querySelector(".genre_name").cloneNode(true)

      modalGenre.classList.remove("media_genre")
  
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
  
      modalRight.append(modalTitle, modalDes, modalGenre)
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
  

