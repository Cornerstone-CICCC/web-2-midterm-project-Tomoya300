const searchInput = document.querySelector(".search_input");
const searchButton = document.querySelector(".hover_cover");
const searchResult = document.querySelector(".search_result");

// Fetch movie genres once and reuse them
let genreMap = new Map();

function fetchGenres() {
  const genreApi = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdiNThiODQ1YTY5ZTdlY2IyNmY0OTgxNWZiOTI3MiIsIm5iZiI6MTczMzE2NTAyNi40LCJzdWIiOiI2NzRkZmZlMjU2MmIwMzBiYjVhZGU3MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.487BTYd3V5PDtBLIy3XD93cJQdQog7VbivKSEwVf7dk",
    },
  };

  return fetch("https://api.themoviedb.org/3/genre/movie/list", genreApi)
    .then((res) => res.json())
    .then((data) => {
      genreMap = new Map(data.genres.map((genre) => [genre.id, genre.name]));
    })
    .catch((err) => console.error("Failed to fetch genres:", err));
}

function searchFunc() {
  const searchWord = searchInput.value.trim();

  const searchUrl = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
    searchWord
  )}&include_adult=false&language=en-US&page=1`;

  const searchApi = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTdiNThiODQ1YTY5ZTdlY2IyNmY0OTgxNWZiOTI3MiIsIm5iZiI6MTczMzE2NTAyNi40LCJzdWIiOiI2NzRkZmZlMjU2MmIwMzBiYjVhZGU3MzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.487BTYd3V5PDtBLIy3XD93cJQdQog7VbivKSEwVf7dk",
    },
  };

  fetch(searchUrl, searchApi)
    .then((res) => res.json())
    .then((res) => {
        const filteredResults = res.results.filter(result => result.media_type !== "person")
        showResult(filteredResults)
    })
    .catch((err) => console.error(err));
}

searchButton.addEventListener("click", searchFunc);

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchFunc();
  }
});

function showResult(results) {
  searchResult.innerHTML = ""; // Clear previous results

  if (results.length === 0) {
    searchResult.innerHTML = "<p>No results found.</p>";
    return;
  }

  results.forEach((result) => {
    const mediaType = result.media_type;
    const title = result.title || result.name || "Unknown Title";
    const des = result.overview || "No description found";
    const medImage = result.poster_path
      ? `https://image.tmdb.org/t/p/w300${result.poster_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";

    const medGenre = result.genre_ids || []; // Ensure it's an array    

    // Map genre IDs to names
    const genreNames = medGenre
      .map((id) => genreMap.get(id))
      .filter((name) => name); // Remove undefined genres
    const genreText = genreNames.length
      ? genreNames.join(" / ")
      : "Unknown";

    const resultCard = document.createElement("div");
    resultCard.className = "result_card";
    resultCard.innerHTML = `
        <h5 class="result_title">${title} (${mediaType})</h5>
        <img src="${medImage}" alt="${title}" class="result_image">
        <p class="result_des">${des}</p>
        <p class="result_genre genre_name">Genre: ${genreText}</p>
        <p class="modal_button">see more</p>
        `

    searchResult.appendChild(resultCard);

    const slider = document.querySelector(".slider")
    slider.classList.add("hide")
  });
}

// Fetch genres on page load
fetchGenres();

document.addEventListener("click", function (e) {
    // Close modal if the overlay exists and the click is outside the modal
    const overlay = document.querySelector(".overlay");
    if (overlay && !e.target.closest(".modal")) {
        overlay.remove();
    }
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal_button")) {
        const resultCard = e.target.closest(".result_card, .slider_card");
        if (resultCard) {
            const modalImage = resultCard.querySelector(".result_image, .media_image").cloneNode();
            const modalTitle = resultCard.querySelector(".result_title, .media_title").cloneNode(true);
            const modalDes = resultCard.querySelector(".result_des, .media_des").cloneNode(true);
            const modalGenre = resultCard.querySelector(".genre_name").cloneNode(true);
            const spans = modalTitle.querySelectorAll("span");
            spans.forEach(span => span.remove());

            modalTitle.classList.add("modal_title");
            modalImage.classList.add("modal_image");
            modalGenre.classList.remove("media_genre");

            const overlay = document.createElement("div");
            const modal = document.createElement("div");
            const modalRight = document.createElement("div");
            const closeModal = document.createElement("div");
            const closeIcon = document.createElement("p");

            overlay.className = "overlay";
            modal.className = "modal";
            modalRight.className = "modal_right";
            closeModal.className = "close_modal";
            closeIcon.className = "close_icon";
            closeIcon.innerHTML = "&#10006;";

            if (document.body.classList.contains("dark_mode")) {
                modal.classList.add("dark_modal")
                modal.classList.remove("white_modal")
            } else {
                modal.classList.remove("dark_modal")
                modal.classList.add("white_modal")
            }

            modalRight.append(modalTitle, modalDes, modalGenre);
            closeModal.appendChild(closeIcon);
            modal.append(modalImage, modalRight, closeModal);
            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            closeModal.addEventListener("click", function () {
                overlay.remove();
            });
        }
    }
});