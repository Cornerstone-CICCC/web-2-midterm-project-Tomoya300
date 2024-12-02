const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdiNThiODQ1YTY5ZTdlY2IyNmY0OTgxNWZiOTI3MiIsIm5iZiI6MTczMzE2NTAyNi40LCJzdWIiOiI2NzRkZmZlMjU2MmIwMzBiYjVhZGU3MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.487BTYd3V5PDtBLIy3XD93cJQdQog7VbivKSEwVf7dk'
    }
  };
  
  fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));

const movieImage = document.querySelectorAll(".movie_image")
const movieTitle = document.querySelectorAll(".movie_title")
const movieDes = document.querySelectorAll(".movie_description")

movieImage.forEach((index, image) => {
    const imageLink = res.results[index].poster_path
    image.setAttribute("src", `${imageLink}`)
})
