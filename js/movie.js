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
        if (index < res.results.length) {
          const imageLink = popMovie[index].poster_path
          image.setAttribute("src", `https://image.tmdb.org/t/p/w300${imageLink}`)
        }
      })

      movieTitle.forEach((title, index) => {
        if (index < res.results.length) {
          const rank = document.createElement("span")
          rank.className = "rank"
          rank.textContent = `${index+1}`
          title.appendChild(rank)
          title.appendChild(document.createTextNode(`${popMovie[index].title}`))
        }
      })

      movieDes.forEach((des, index) => {
        if (index < res.results.length) {
          des.textContent = popMovie[index].overview
        }
      })

      movieGenre.forEach((genre, index) => {
        if (index < res.results.length) {
          genre.textContent = popMovie[index].genre_ids
        }
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
    const tvGenre = document.querySelectorAll(".tv_genre")

    const popTv = res.results.sort((a, b) => b.popularity - a.popularity)

    tvImage.forEach((image, index) => {
        const imageLink = popTv[index].poster_path
        image.setAttribute("src", `https://image.tmdb.org/t/p/w300${imageLink}`)
    })

    tvTitle.forEach((title, index) => {
      const rank = document.createElement("span")
      rank.className = "rank"
      rank.textContent = `${index+1}`
      title.appendChild(rank)
      title.appendChild(document.createTextNode(`${popTv[index].name}`))
    })

    tvDes.forEach((des, index) => {
      des.textContent = popTv[index].overview
    })

    tvGenre.forEach((genre, index) => {
      genre.textContent = popTv[index].genre_ids
    })
  })
  .catch(err => console.error(err));

const genresM = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdiNThiODQ1YTY5ZTdlY2IyNmY0OTgxNWZiOTI3MiIsIm5iZiI6MTczMzE2NTAyNi40LCJzdWIiOiI2NzRkZmZlMjU2MmIwMzBiYjVhZGU3MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.487BTYd3V5PDtBLIy3XD93cJQdQog7VbivKSEwVf7dk'
  }
};

fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', genresM)
  .then(res => res.json())
  .then(res => {

    const genreMap = new Map(res.genres.map(genre => [genre.id, genre.name]))
    const movieGenre = document.querySelectorAll(".movie_genre")

    movieGenre.forEach((genre) => {
      const idsString = genre.textContent
      const stringToNum = idsString.split(",").map(id => parseInt(id.trim()))
      const numToName = stringToNum.map(id => genreMap.get(id)).filter(name => name)
      const newGenre = document.createElement("p")
      newGenre.classList.add("media_genre", "genre_name")
      newGenre.textContent = "Genre: " + (numToName.length ? numToName.join(" / ") : "Unknown")
      genre.after(newGenre)
    })
  })
  .catch(err => console.error(err));

const genresTv = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdiNThiODQ1YTY5ZTdlY2IyNmY0OTgxNWZiOTI3MiIsIm5iZiI6MTczMzE2NTAyNi40LCJzdWIiOiI2NzRkZmZlMjU2MmIwMzBiYjVhZGU3MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.487BTYd3V5PDtBLIy3XD93cJQdQog7VbivKSEwVf7dk'
  }
};

fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', genresTv)
  .then(res => res.json())
  .then(res => {
    const genreMap = new Map(res.genres.map(genre => [genre.id, genre.name]))
    const tvGenre = document.querySelectorAll(".tv_genre")

    tvGenre.forEach((genre) => {
      const idsString = genre.textContent
      const stringToNum = idsString.split(",").map(id => parseInt(id.trim()))
      const numToName = stringToNum.map(id => genreMap.get(id)).filter(name => name)
      const newGenre = document.createElement("p")
      newGenre.classList.add("media_genre", "genre_name")
      newGenre.textContent = "Genre: " + (numToName.length ? numToName.join(" / ") : "Unknown")
      genre.after(newGenre)
    })
  })
  .catch(err => console.error(err));


const moonContainer = document.querySelector(".moon_container")
const allEl = document.querySelectorAll("*")
const styleSheet = document.styleSheets[0]
const modal = document.querySelectorAll(".modal")
const h1 = document.querySelector("h1")
const headerMenu = document.querySelector(".header_menu")
const footer = document.querySelector("footer")

moonContainer.addEventListener("click", function() {
  document.body.classList.toggle("dark_mode")
  if (document.body.classList.contains("dark_mode")) {
    document.body.style.backgroundColor = "black"
    document.body.style.color = "white"
    h1.classList.add("dark")
    headerMenu.classList.add("dark")
    footer.classList.add("dark_footer")
    footer.classList.remove("white_footer")
    searchInput.classList.add("dark")
  } else {
    document.body.style.backgroundColor = "white"
    document.body.style.color = "black"
    h1.classList.remove("dark")
    headerMenu.classList.remove("dark")
    footer.classList.add("white_footer")
    footer.classList.remove("dark_footer")
    searchInput.classList.remove("dark")
  }
})