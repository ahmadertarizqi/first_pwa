document.addEventListener('DOMContentLoaded', function() {
   const elems = document.querySelectorAll('.sidenav');
   M.Sidenav.init(elems);
   loadNav();

   let hasPage = window.location.hash.substr(1);
   if(hasPage === '') {
      hasPage = 'home';
   }

   loadPage(hasPage);
});

function loadNav() {
   const xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
      if(this.readyState === 4) {

         if(this.status !== 200) return;

         document.querySelectorAll('.topnav, .sidenav').forEach(function(elm) {
            elm.innerHTML = xhr.responseText;
         });

         /**
          * EVENT LISTENER ROUTING
          */
         document.querySelectorAll('.sidenav a, .topnav a').forEach(function(elm) {
            elm.addEventListener('click', function() {
               const sidenav = document.querySelector('.sidenav');
               M.Sidenav.getInstance(sidenav).close();

               let hasPage = event.target.getAttribute('href').substr(1);
               loadPage(hasPage);
            });
         });
      }
   }

   xhr.open('GET', 'navigation.html', true);
   xhr.send();
}

function loadPage(hasPage) {
   const xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
      if(this.readyState === 4) {
         const nodeContent = document.querySelector('#body-content');
         
         if(this.status === 200) {
            nodeContent.innerHTML = xhr.responseText;

            // load data
            switch (hasPage) {
               case 'home':
                  renderHome(hasPage);
                  break;
               case 'movies':
                  renderMovies();
                  break;
               case 'tvshows':
                  renderTvShows();
                  break;
            }

         } else if (this.status === 400) {
            nodeContent.innerHTML = `<p>Halaman tidak ditemukan</p>`;
         } else {
            nodeContent.innerHTML = `<p>Oops...halaman tidak dapat di akses bro</p>`;
         }
      }
   }

   xhr.open('GET', `pages/${hasPage}.html`, true);
   xhr.send();
}