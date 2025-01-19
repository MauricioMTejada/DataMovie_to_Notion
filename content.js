// Detecta el dominio actual y ejecuta la lógica específica
(function () {
    console.log("content.js se está ejecutando");
    console.log("Función anónima de content.js ejecutándose");
    const url = window.location.href;

    if (url.includes("www.imdb.com")) {
      console.log("Estás en IMDb.");
      // Lógica específica para IMDb
      imdbHandler();
    } else if (url.includes("www.themoviedb.org")) {
      console.log("Estás en The Movie Database.");
      // Lógica específica para The Movie Database
      tmdbHandler();
    } else if (url.includes("www.filmaffinity.com/ar")) {
      console.log("Estás en FilmAffinity (Argentina).");
      // Lógica específica para FilmAffinity
      filmAffinityHandler();
    } else {
      console.log("Ésta no ninguna página a implementar mi código");
    }

    // Función para manejar IMDb
    function imdbHandler() {
      console.log("Ejecutando código específico para IMDb...");
      // Aquí puedes añadir tu lógica para extraer datos de IMDb
    }

    // Función para manejar The Movie Database
    function tmdbHandler() {
      console.log("Ejecutando código específico para The Movie Database...");
      // Aquí puedes añadir tu lógica para extraer datos de TMDB
    }

    // Función para manejar FilmAffinity
    function filmAffinityHandler() {
      console.log("Ejecutando código específico para FilmAffinity...");
      // Aquí puedes añadir tu lógica para extraer datos de FilmAffinity
    }
  })();
