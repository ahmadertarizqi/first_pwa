const Main = {
   renderLoader: function() {
      const parentLoader = document.querySelector('.loader-wrap');
      const markup = `
         <div class="loader-page">
            <svg>
               <use href="./img/icons.svg#icon-cw"></use>
            </svg>
         </div>
      `;
      parentLoader.insertAdjacentHTML('beforeend', markup);
   },
   clearLoader: function() {
      const loader = document.querySelector('.loader-page');
      if(loader) {
         loader.parentElement.removeChild(loader);
      }
   },
   /* == Get Movie List == */
   Movies: async function() {
      const movieList = document.querySelector('#movieList');
      this.renderLoader();
      try {
         const response = await fetch('./data/movies.json');
         const result = await response.json();
         this.RenderMovieList(result, movieList);
         this.clearLoader();
      } catch (error) {
         alert('wow, MovieList error bro');
         this.clearLoader();
         this.handleError(movieList);
         console.log(error, 'get movies error');
      }
   },
   RenderMovieList: function(movies, parentEl) {
      // console.log(movies);
      movies.forEach(movie => {
         const markup = `
            <div class="col s6 l3">
               <div class="card is-fullwidth">
                  <div class="card-image">
                     <img src="./data/imgs/movies${movie.poster_path}"/>
                  </div>
                  <div class="card-content">
                     <span class="card-title">${movie.title}</span>
                     <p>${movie.release_date}</p>
                  </div>
               </div>
            </div>
         `;
         parentEl.insertAdjacentHTML('beforeend', markup);
      });
   },
   
   /* == Get TV Show List == */
   TvShow: async function() {
      const tvList = document.querySelector('#tvshowList');
      this.renderLoader();
      try {
         const response = await fetch('./data/tvshows.json');
         const result = await response.json();
         this.RenderTvList(result, tvList);
         this.clearLoader();
      } catch (error) {
         alert('wow, Tv Shows error bro');
         this.clearLoader();
         this.handleError(tvList);
         console.log(error, 'get tvshow error');
      }
   },
   RenderTvList: function(tvshows, parentEl) {
      tvshows.forEach(tv => {
         const markup = `
            <div class="col s6 l3">
               <div class="card is-fullwidth">
                  <div class="card-image">
                     <img src="./data/imgs/tvshows${tv.poster_path}"/>
                  </div>
                  <div class="card-content">
                     <span class="card-title">${tv.name}</span>
                     <p>${tv.first_air_date}</p>
                  </div>
               </div>
            </div>
         `;
         parentEl.insertAdjacentHTML('beforeend', markup);
      });
   },
   handleError: function(parentEl) {
      const markup = `
         <div class="col s12">
            <h3>Ooops...ada sesuatu yg salah</h3>
         </div>
      `;
      parentEl.insertAdjacentHTML('afterbegin', markup);
   }
}