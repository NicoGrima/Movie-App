const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=45d65092bff0af2c6cc410fdc7dcc60d&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=45d65092bff0af2c6cc410fdc7dcc60d&query=";

//Get main from html and turn it into a js element
const main = document.getElementById("main");
const finder = document.getElementById("finder");
const search = document.getElementById("search");
const sort = document.getElementById("sort");
const dropdown = document.getElementById("drop");
const dropdowns = document.getElementsByClassName("dropdown");
const popular = document.getElementById("popular");

//Global url
var curURL = APIURL;

//Initially get fave movies
getMovies(curURL, "popular");

async function getMovies(url, filter) {

    //sortType {popular, rating, alphabetic, release}

    //Get url file and tranform it into a js object
    var resp = await fetch(url);
    var respData = await resp.json();

    //Apply filter based on type
    if(filter == "popular") {
        respData.results.sort((a,b) => (a.popularity < b.popularity) ? 1 : -1);
    }
    else if(filter == "rating") {
        respData.results.sort((a,b) => (a.vote_average < b.vote_average) ? 1 : -1);
    }
    else if(filter == "release") {
        respData.results.sort((a,b) => (a.release_date < b.release_date) ? 1 : -1);
    }
    else if(filter == "alphabetic") {
        respData.results.sort((a,b) => (a.title > b.title) ? 1 : -1);
    }

    showMovies(respData.results);

    //Outputs resData object to console
    console.log(respData);
}

function showMovies(movies) {

    //Clear main
    main.innerHTML = '';

    //for each loop of every movie (respData.results)
    movies.forEach((movie) => {

        //Assign variable names to match those within movie object
        const {title, poster_path, vote_average, overview} = movie;

        //Create new div element in html
        const moviePost = document.createElement('div');
        //Add movie to div element
        moviePost.classList.add('movie');

        //html code within js to custom modify posters, title, and vote average
        moviePost.innerHTML = `
        <img
            src="${IMGPATH + poster_path}"
            alt="${title}"
        />
        <div class = "movie_info">
            <h3>${title}</h3>
            <span class = "${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h4>Synopsis:</h4>
            ${overview}
        </div>
    `;

    //Display movies on main
    main.appendChild(moviePost);
    });
}

function getClassByRate(rating) {
    if (rating >= 9) {
        return "Awesometacular";
    }
    else if (rating >= 8) {
        return "BuyOnBluRay";
    }
    else if (rating >= 6.5) {
        return "GoodNoAlcReq";
    }
    else if (rating >= 5) {
        return "GoodIfDrunk";
    }
    else if (rating >= 3.5) {
        return "T-Minus";
    }
    else {
        return "DogShit";
    }
}

//Submit form if enter is pressed
finder.addEventListener('submit', (e) => {
    
    //If the event does not get explicitly handled, its default action should not be taken
    e.preventDefault();

    const searchTerm = search.value;

    curURL = SEARCHAPI + searchTerm;

    //Check if text is in search bar
    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm, "popular");

        search.value = "";
    }
});

//Return to home page (featured movies)
popular.addEventListener('click', (e) => {

    e.preventDefault();

    getMovies(APIURL, "popular");
});

//Show drop-down menu when user clicks on sort button
function showDrop() {
    dropdown.classList.toggle("show");
}

//Close drop-down menu if clicked outside it
window.onclick = function(event) {
    //If the click does not occur in sort button
    if (!event.target.matches('.sort')) {
        
        //Iterate through all buttons in drop-down menu and remove show
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
      }
    }
}

function filterCurURL(filter) {
    getMovies(curURL, filter);
}