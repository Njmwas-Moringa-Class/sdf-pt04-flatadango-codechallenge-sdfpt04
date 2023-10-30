// Your code here
$(document).ready(function () {
    const baseURL = 'http://localhost:3000';
  
    // Function to make a GET request to fetch movie data
    function fetchMovieData(movieId) {
      $.get(`${baseURL}/films/${movieId}`, function (movie) {
        $('#title').text(movie.title);
        $('#runtime').text(`${movie.runtime} minutes`);
        $('#film-info').text(movie.description);
        $('#showtime').text(movie.showtime);
        const availableTickets = movie.capacity - movie.tickets_sold;
        $('#ticket-num').text(availableTickets);
        $('#poster').attr('src', movie.poster);
      });
    }
  
    // Function to populate the movie menu
    function populateMovieMenu() {
      $.get(`${baseURL}/films`, function (movies) {
        const filmsList = $('#films');
        filmsList.empty(); 
        movies.forEach(function (movie) {
          const listItem = $('<li>');
          listItem.addClass('film item');
          listItem.text(movie.title);
          listItem.click(function () {
            fetchMovieData(movie.id);
          });
          filmsList.append(listItem);
        });
      });
    }
  
    // Function to handle buying a ticket
    function buyTicket() {
      const availableTickets = parseInt($('#ticket-num').text());
      if (availableTickets > 0) {
        $('#ticket-num').text(availableTickets - 1);
      } else {
        alert('This showing is sold out.');
      }
    }
  
    // Initial setup: Populate the movie menu and show details of the first movie
    populateMovieMenu();
    fetchMovieData(1);
  
    $('#buy-ticket').click(buyTicket);
  });
  