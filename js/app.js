'use strict'

const getMovies = (onSuccess, onFailed) => {
   fetch('./data/movies.json')
      .then(res => res.json())
      .then(result => onSuccess(result))
      .catch(error => {
         if(onFailed) onFailed(error);
      });
}

const getTvShows = (onSuccess, onFailed) => {
   fetch('./data/tvshows.json')
      .then(res => res.json())
      .then(result => onSuccess(result))
      .catch(error => {
         if(onFailed) onFailed(error);
      });
}

const movieListItem = (movies, parentEl, currentPage) => {
   if(!currentPage) {
      movies.forEach(movie => movieCardItem(movie, parentEl));
   } else {
      randomIndex(movies).slice(0, 4).forEach(movie => movieCardItem(movie, parentEl));
   }
}

const movieCardItem = (movie, parentEl) => {
   const markup = `
      <div class="col s6 l3">
         <a class="card is-customized" href="https://www.themoviedb.org/movie/${movie.id}" target="_blank">
            <div class="card-image">
               <img src="${movie.poster_path}" alt="${movie.title}"/>
               <span class="btn-floating halfway-fab blue darken-1 center-align" title="Popularity">${Math.round((movie.vote_average * 100) / 10)}<small>%</small></span>
            </div>
            <div class="card-content">
               <span class="card-title">${movie.title}</span>
               <p class="text-date">
                  <svg class="svg-icon" viewBox="0 0 20 20">
                     <path fill="none" d="M16.254,3.399h-0.695V3.052c0-0.576-0.467-1.042-1.041-1.042c-0.576,0-1.043,0.467-1.043,1.042v0.347H6.526V3.052c0-0.576-0.467-1.042-1.042-1.042S4.441,2.476,4.441,3.052v0.347H3.747c-0.768,0-1.39,0.622-1.39,1.39v11.813c0,0.768,0.622,1.39,1.39,1.39h12.507c0.768,0,1.391-0.622,1.391-1.39V4.789C17.645,4.021,17.021,3.399,16.254,3.399z M14.17,3.052c0-0.192,0.154-0.348,0.348-0.348c0.191,0,0.348,0.156,0.348,0.348v0.347H14.17V3.052z M5.136,3.052c0-0.192,0.156-0.348,0.348-0.348S5.831,2.86,5.831,3.052v0.347H5.136V3.052z M16.949,16.602c0,0.384-0.311,0.694-0.695,0.694H3.747c-0.384,0-0.695-0.311-0.695-0.694V7.568h13.897V16.602z M16.949,6.874H3.052V4.789c0-0.383,0.311-0.695,0.695-0.695h12.507c0.385,0,0.695,0.312,0.695,0.695V6.874z M5.484,11.737c0.576,0,1.042-0.467,1.042-1.042c0-0.576-0.467-1.043-1.042-1.043s-1.042,0.467-1.042,1.043C4.441,11.271,4.908,11.737,5.484,11.737z M5.484,10.348c0.192,0,0.347,0.155,0.347,0.348c0,0.191-0.155,0.348-0.347,0.348s-0.348-0.156-0.348-0.348C5.136,10.503,5.292,10.348,5.484,10.348z M14.518,11.737c0.574,0,1.041-0.467,1.041-1.042c0-0.576-0.467-1.043-1.041-1.043c-0.576,0-1.043,0.467-1.043,1.043C13.475,11.271,13.941,11.737,14.518,11.737z M14.518,10.348c0.191,0,0.348,0.155,0.348,0.348c0,0.191-0.156,0.348-0.348,0.348c-0.193,0-0.348-0.156-0.348-0.348C14.17,10.503,14.324,10.348,14.518,10.348z M14.518,15.212c0.574,0,1.041-0.467,1.041-1.043c0-0.575-0.467-1.042-1.041-1.042c-0.576,0-1.043,0.467-1.043,1.042C13.475,14.745,13.941,15.212,14.518,15.212z M14.518,13.822c0.191,0,0.348,0.155,0.348,0.347c0,0.192-0.156,0.348-0.348,0.348c-0.193,0-0.348-0.155-0.348-0.348C14.17,13.978,14.324,13.822,14.518,13.822z M10,15.212c0.575,0,1.042-0.467,1.042-1.043c0-0.575-0.467-1.042-1.042-1.042c-0.576,0-1.042,0.467-1.042,1.042C8.958,14.745,9.425,15.212,10,15.212z M10,13.822c0.192,0,0.348,0.155,0.348,0.347c0,0.192-0.156,0.348-0.348,0.348s-0.348-0.155-0.348-0.348C9.653,13.978,9.809,13.822,10,13.822z M5.484,15.212c0.576,0,1.042-0.467,1.042-1.043c0-0.575-0.467-1.042-1.042-1.042s-1.042,0.467-1.042,1.042C4.441,14.745,4.908,15.212,5.484,15.212z M5.484,13.822c0.192,0,0.347,0.155,0.347,0.347c0,0.192-0.155,0.348-0.347,0.348s-0.348-0.155-0.348-0.348C5.136,13.978,5.292,13.822,5.484,13.822z M10,11.737c0.575,0,1.042-0.467,1.042-1.042c0-0.576-0.467-1.043-1.042-1.043c-0.576,0-1.042,0.467-1.042,1.043C8.958,11.271,9.425,11.737,10,11.737z M10,10.348c0.192,0,0.348,0.155,0.348,0.348c0,0.191-0.156,0.348-0.348,0.348s-0.348-0.156-0.348-0.348C9.653,10.503,9.809,10.348,10,10.348z"></path>
                  </svg>
                  <span class="value">${dayjs(movie.release_date).format('DD MMM, YYYY')}</span>
               </p>
            </div>
         </a>
      </div>
   `;
   parentEl.insertAdjacentHTML('beforeend', markup);
}

const tvListItem = (tvshows, parentEl, currentPage) => {
   if(!currentPage) {
      tvshows.forEach(tv => tvCardItem(tv, parentEl));
   } else {
      randomIndex(tvshows).slice(0, 4).forEach(tv => tvCardItem(tv, parentEl));
   }
}

const tvCardItem = (tv, parentEl) => {
   const markup = `
      <div class="col s6 l3">
         <a class="card is-customized" href="https://www.themoviedb.org/tv/${tv.id}" target="_blank">
            <div class="card-image">
               <img src="${tv.poster_path}" alt="${tv.name}" />
               <span class="btn-floating halfway-fab blue darken-1 center-align" title="Popularity">${Math.round((tv.vote_average * 100) / 10)}<small>%</small></span>
            </div>
            <div class="card-content">
               <span class="card-title">${tv.name}</span>
               <p class="text-date">
                  <svg class="svg-icon" viewBox="0 0 20 20">
                     <path fill="none" d="M16.254,3.399h-0.695V3.052c0-0.576-0.467-1.042-1.041-1.042c-0.576,0-1.043,0.467-1.043,1.042v0.347H6.526V3.052c0-0.576-0.467-1.042-1.042-1.042S4.441,2.476,4.441,3.052v0.347H3.747c-0.768,0-1.39,0.622-1.39,1.39v11.813c0,0.768,0.622,1.39,1.39,1.39h12.507c0.768,0,1.391-0.622,1.391-1.39V4.789C17.645,4.021,17.021,3.399,16.254,3.399z M14.17,3.052c0-0.192,0.154-0.348,0.348-0.348c0.191,0,0.348,0.156,0.348,0.348v0.347H14.17V3.052z M5.136,3.052c0-0.192,0.156-0.348,0.348-0.348S5.831,2.86,5.831,3.052v0.347H5.136V3.052z M16.949,16.602c0,0.384-0.311,0.694-0.695,0.694H3.747c-0.384,0-0.695-0.311-0.695-0.694V7.568h13.897V16.602z M16.949,6.874H3.052V4.789c0-0.383,0.311-0.695,0.695-0.695h12.507c0.385,0,0.695,0.312,0.695,0.695V6.874z M5.484,11.737c0.576,0,1.042-0.467,1.042-1.042c0-0.576-0.467-1.043-1.042-1.043s-1.042,0.467-1.042,1.043C4.441,11.271,4.908,11.737,5.484,11.737z M5.484,10.348c0.192,0,0.347,0.155,0.347,0.348c0,0.191-0.155,0.348-0.347,0.348s-0.348-0.156-0.348-0.348C5.136,10.503,5.292,10.348,5.484,10.348z M14.518,11.737c0.574,0,1.041-0.467,1.041-1.042c0-0.576-0.467-1.043-1.041-1.043c-0.576,0-1.043,0.467-1.043,1.043C13.475,11.271,13.941,11.737,14.518,11.737z M14.518,10.348c0.191,0,0.348,0.155,0.348,0.348c0,0.191-0.156,0.348-0.348,0.348c-0.193,0-0.348-0.156-0.348-0.348C14.17,10.503,14.324,10.348,14.518,10.348z M14.518,15.212c0.574,0,1.041-0.467,1.041-1.043c0-0.575-0.467-1.042-1.041-1.042c-0.576,0-1.043,0.467-1.043,1.042C13.475,14.745,13.941,15.212,14.518,15.212z M14.518,13.822c0.191,0,0.348,0.155,0.348,0.347c0,0.192-0.156,0.348-0.348,0.348c-0.193,0-0.348-0.155-0.348-0.348C14.17,13.978,14.324,13.822,14.518,13.822z M10,15.212c0.575,0,1.042-0.467,1.042-1.043c0-0.575-0.467-1.042-1.042-1.042c-0.576,0-1.042,0.467-1.042,1.042C8.958,14.745,9.425,15.212,10,15.212z M10,13.822c0.192,0,0.348,0.155,0.348,0.347c0,0.192-0.156,0.348-0.348,0.348s-0.348-0.155-0.348-0.348C9.653,13.978,9.809,13.822,10,13.822z M5.484,15.212c0.576,0,1.042-0.467,1.042-1.043c0-0.575-0.467-1.042-1.042-1.042s-1.042,0.467-1.042,1.042C4.441,14.745,4.908,15.212,5.484,15.212z M5.484,13.822c0.192,0,0.347,0.155,0.347,0.347c0,0.192-0.155,0.348-0.347,0.348s-0.348-0.155-0.348-0.348C5.136,13.978,5.292,13.822,5.484,13.822z M10,11.737c0.575,0,1.042-0.467,1.042-1.042c0-0.576-0.467-1.043-1.042-1.043c-0.576,0-1.042,0.467-1.042,1.043C8.958,11.271,9.425,11.737,10,11.737z M10,10.348c0.192,0,0.348,0.155,0.348,0.348c0,0.191-0.156,0.348-0.348,0.348s-0.348-0.156-0.348-0.348C9.653,10.503,9.809,10.348,10,10.348z"></path>
                  </svg>
                  <span class="value">${dayjs(tv.first_air_date).format('DD MMM, YYYY')}</span>
               </p>
            </div>
         </a>
      </div>
   `;
   parentEl.insertAdjacentHTML('beforeend', markup);
} 

const handleError = (parentEl) => {
   const markup = `
      <div class="col s12">
         <h3>Ooops...ada sesuatu yg salah</h3>
      </div>
   `;
   parentEl.insertAdjacentHTML('afterbegin', markup);
}

const renderLoader = () => {
   const parentLoader = document.querySelector('.loader-wrap');
   const markup = `
      <div class="loader-page">
         <svg>
            <use href="./img/icons.svg#icon-cw"></use>
         </svg>
      </div>
   `;
   parentLoader.insertAdjacentHTML('beforeend', markup);
}

const clearLoader = () => {
   const loader = document.querySelector('.loader-page');
   if(loader) {
      loader.parentElement.removeChild(loader);
   }
}

const randomIndex = (items) => {
   /** 
    * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    * */ 

   let currentIndex = items.length, 
      temporaryValue, 
      randomIndex;
   
   while(0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      
      temporaryValue = items[currentIndex];
      items[currentIndex] = items[randomIndex];
      items[randomIndex] = temporaryValue;
   }

   return items;
}

/**
 * RENDER HALAMAN
 */
const renderHome = (currentPage) => {
   const movieList = document.querySelector('#movieListHome');
   const tvList = document.querySelector('#tvshowListHome')
   
   renderLoader();
   
   getMovies(result => {
      movieListItem(result, movieList, currentPage);
      clearLoader();
   }, error => {
      alert('wow, MovieList error bro');
      clearLoader();
      handleError(movieList);
      console.log(error, 'get movies error');
   });

   getTvShows(result => {
      tvListItem(result, tvList, currentPage);
      clearLoader();
   }, error => {
      alert('wow, Tvshows error bro');
      clearLoader();
      handleError(movieList);
      console.log(error, 'get tvshows error');
   });
}

const renderMovies = () => {
   const movieList = document.querySelector('#movieList');
   renderLoader();
   
   getMovies(result => {
      movieListItem(result, movieList);
      clearLoader();
   }, error => {
      alert('wow, MovieList error bro');
      clearLoader();
      handleError(movieList);
      console.log(error, 'get movies error');
   });
}

const renderTvShows = () => {
   const tvList = document.querySelector('#tvshowList');
   renderLoader();

   getTvShows(result => {
      tvListItem(result, tvList);
      clearLoader()
   }, error => {
      alert('wow, Tv Shows error bro');
      clearLoader();
      handleError(tvList);
      console.log(error, 'get tvshow error');
   });
}