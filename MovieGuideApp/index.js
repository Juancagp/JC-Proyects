let movieNameRef = document.getElementById('movie-name');
let searchBtn = document.getElementById('search-btn');
let result = document.getElementById('result');

//función to fetch 


let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`

    //si el input está vacio

    if(movieName.length <= 0){
        result.innerHTML = `<h3 class ="msg">Please enter a movie name</h3>`
    }

    //si el input no está vacio

    else{
        fetch(url)
            .then((response) => response.json())
                .then((data) => {
                    //si la pelicula existe en la base de datos
                    if(data.Response == 'True'){
                        result.innerHTML = `<div class="info">
                                                <img src=${data.Poster} class="poster">
                                                <div>
                                                    <h2>${data.Title}</h2>
                                                    <div class="rating">
                                                        <img src="star-icon.svg">
                                                        <h4>${data.imdbRating}</h4>
                                                    </div>
                                                    <div class="details">
                                                        <span>${data.Rated}</span>
                                                        <span>${data.Year}</span>
                                                        <span>${data.Runtime}</span>
                                                    </div>

                                                    <div class="genre">
                                                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h3>Plot:</h3>
                                        <p>${data.Plot}</p>
                                        <h3>Cast:</h3>
                                        <p>${data.Actors}</p>
                                        `;
                    }

                    //si la pelicula no existe en la base de datos
                    else{
                        console.log("error de consola")
                        result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                    }
                })
                .catch(()=>{
                    result.innerHTML = `<h3 class="msg"> Error Occure</h3>`;
                })
    }

};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie)
document.addEventListener("keydown", function(event) {
    // Verifica si la tecla presionada es la tecla Enter (código 13)
    if (event.keyCode === 13) {
      // Ejecuta la misma función getMovie cuando se presiona la tecla Enter
      getMovie();
    }
  });