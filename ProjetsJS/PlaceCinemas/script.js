const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUi();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//  update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // Copy selected seats into array
  // Map through array
  // return a new array indexes

  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  // ENREGISTRER LES DONNES AVEC LOCAL STORAGE
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Recupérer les données de localstorage and populate UI

function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", (evenement) => {
  ticketPrice = +evenement.target.value;
  setMovieData(evenement.target.selectedIndex, evenement.target.value);
  updateSelectedCount();
});

// seat click event
container.addEventListener("click", (evenement) => {
  if (
    evenement.target.classList.contains("seat") &&
    !evenement.target.classList.contains("occupied")
  ) {
    evenement.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set

updateSelectedCount();
