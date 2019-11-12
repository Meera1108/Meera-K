
const log = console.log;
//const $ = document.querySelector.bind(document);
// Selecting elements from the DOM
const searchButton = document.querySelector('#search');;
const searchInput = document.querySelector('#searchText');

 const url='http://www.omdbapi.com/?&apikey=c377a648';
 
function resetInput() {
    searchInput.value = '';
}


window.onload = function()
{
searchButton.onclick = function (event) {
    event.preventDefault();
    const value = searchInput.value

   if (value) {
    searchMovie(value);
   }
    resetInput();
}
}

function searchMovie(value) {
    const newUrl=url +'&s=' +value;

        fetch(newUrl)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          
            const movies = data.Search;
            var output = '';
            
            for (let i = 0; i < movies.length; i++) 
            {
                 output += 

                `<div class="col-md-3">
                  <div class="well text-center">
                  <img src="${movies[i].Poster}">
                    <h5>${movies[i].Title}</h5>
                    
                    <a onclick="movieSelected('${movies[i].imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                  </div>
                </div> `;
              
              

              document.getElementById("movies").innerHTML=output;
            };
      
            
          })
          .catch((err) => {
            console.log(err);
          });
      }


function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'main.html';
    return false;
  }
 
  

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    const idUrl=url + '&i=' +movieId;
    fetch(idUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      
       const movie = data;
       var outsample =`
          <div class="column">
            <div class="col-md-4">
              <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${movie.Title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
              </ul>
            </div>
          </div>
          <div class="column">
            <div class="well">
              <h3>Plot</h3>
              ${movie.Plot}
              <hr>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="home.html" class="btn btn-default">Go Back To Search</a>
            </div>
          </div>
        `;
  
        document.getElementById("movie").innerHTML=outsample;
      })
      .catch((err) => {
        console.log(err);
      });
    }