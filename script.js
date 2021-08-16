const APIURL = 'http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = 'http://image.tmdb.org/t/p/w1280';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query='

//------- initially get fav movies 
getMovies(APIURL);

//------- Get Movies 

async function getMovies(url){
    const resp = await fetch(url);
    const respDate = await resp.json();
    console.log(respDate);
    showMovies(respDate.results)
}

//------- search show movie

function showMovies(movies){
    //clear main
    main.innerHTML='';

    movies.forEach((movie)=>{
        const {poster_path , title , vote_average ,overview }= movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
       
            <img src="${IMGPATH + poster_path}"
             alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">
                ${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview :</h3>
                ${overview}
            </div>
    
        `
        main.appendChild(movieEl);
    })
}
//------- Get Rateing
 function getClassByRate(vote){
     if(vote >= 8){
         return 'green'
     }else if(vote >= 5){
         return 'orange'
     }else{
         return 'red'
     }

 }

//------- search form
form.addEventListener('submit' , (e)=>{
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){

        getMovies(SEARCHAPI + searchTerm);
        search.value= '';
    }
})


