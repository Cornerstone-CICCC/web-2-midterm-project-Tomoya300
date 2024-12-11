const fetchGenres = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdiNThiODQ1YTY5ZTdlY2IyNmY0OTgxNWZiOTI3MiIsIm5iZiI6MTczMzE2NTAyNi40LCJzdWIiOiI2NzRkZmZlMjU2MmIwMzBiYjVhZGU3MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.487BTYd3V5PDtBLIy3XD93cJQdQog7VbivKSEwVf7dk'
    }
  }).then(res => res.json())
    .then(res => new Map(res.genres.map(genre => [genre.id, genre.name])));
};

let movieGenreMap, tvGenreMap;

Promise.all([
  fetchGenres('https://api.themoviedb.org/3/genre/movie/list?language=en'),
  fetchGenres('https://api.themoviedb.org/3/genre/tv/list?language=en')
]).then(([movieMap, tvMap]) => {
  movieGenreMap = movieMap;
  tvGenreMap = tvMap;

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
      const movieImage = document.querySelectorAll(".movie_image");
      const movieTitle = document.querySelectorAll(".movie_title");
      const movieDes = document.querySelectorAll(".movie_des");
      const movieGenre = document.querySelectorAll(".movie_genre");

      const popMovie = res.results.sort((a, b) => b.popularity - a.popularity);

      movieImage.forEach((image, index) => {
        if (index < res.results.length) {
          const imageLink = popMovie[index].poster_path;
          image.setAttribute("src", `https://image.tmdb.org/t/p/w300${imageLink}`);
        }
      });

      movieTitle.forEach((title, index) => {
        if (index < res.results.length) {
          const rank = document.createElement("span");
          rank.className = "rank";
          rank.textContent = `${index + 1}`;
          title.appendChild(rank);
          title.appendChild(document.createTextNode(`${popMovie[index].title}`));
        }
      });

      movieDes.forEach((des, index) => {
        if (index < res.results.length) {
          des.textContent = popMovie[index].overview;
        }
      });

      movieGenre.forEach((genre, index) => {
        if (index < res.results.length) {
          const genreIds = popMovie[index].genre_ids;
          const genreNames = genreIds.map(id => movieGenreMap.get(id)).filter(name => name);
          genre.textContent = `Genre: ${genreNames.length ? genreNames.join(" / ") : "Unknown"}`;
        }
      });
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
      const tvImage = document.querySelectorAll(".tv_image");
      const tvTitle = document.querySelectorAll(".tv_title");
      const tvDes = document.querySelectorAll(".tv_des");
      const tvGenre = document.querySelectorAll(".tv_genre");

      const popTv = res.results.sort((a, b) => b.popularity - a.popularity);

      tvImage.forEach((image, index) => {
        if (index < res.results.length) {
          const imageLink = popTv[index].poster_path;
          image.setAttribute("src", `https://image.tmdb.org/t/p/w300${imageLink}`);
        }
      });

      tvTitle.forEach((title, index) => {
        if (index < res.results.length) {
          const rank = document.createElement("span");
          rank.className = "rank";
          rank.textContent = `${index + 1}`;
          title.appendChild(rank);
          title.appendChild(document.createTextNode(`${popTv[index].name}`));
        }
      });

      tvDes.forEach((des, index) => {
        if (index < res.results.length) {
          des.textContent = popTv[index].overview;
        }
      });

      tvGenre.forEach((genre, index) => {
        if (index < res.results.length) {
          const genreIds = popTv[index].genre_ids;
          const genreNames = genreIds.map(id => tvGenreMap.get(id)).filter(name => name);
          genre.textContent = `Genre: ${genreNames.length ? genreNames.join(" / ") : "Unknown"}`;
        }
      });
    })
    .catch(err => console.error(err));
}).catch(err => console.error(err));

const moon = document.querySelector(".moon")
const body = document.body

moon.addEventListener("click", function() {
  body.classList.toggle("dark_mode")

  if (body.classList.contains('dark_mode')) {
      localStorage.setItem('theme', 'dark');
  } else {
      localStorage.setItem('theme', 'light');
  }
})

window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
      body.classList.add('dark_mode');
  } else {
      body.classList.remove('dark_mode');
  }
});

