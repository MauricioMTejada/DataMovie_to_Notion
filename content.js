// Detecta el dominio actual y ejecuta la lógica específica
function extractData() {
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
    console.log("Estás en FilmAffinity (Argentina). Extrayendo datos...");
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
      const el = document.querySelector('#mt-content-cell');
      if (!el) {
          console.error("No se encontró el elemento #mt-content-cell");
          return;
      }

      // Helper function to find dt by text content and get next dd
      const getDtDdValue = (dtText) => {
          const dtElements = Array.from(el.querySelectorAll('.movie-info dt'));
          const targetDt = dtElements.find(dt => dt.textContent.trim() === dtText);
          if (targetDt) {
              const nextDd = targetDt.nextElementSibling;
              if (nextDd) {
                  // Elimina elementos adicionales como "aka" si existen
                  const clone = nextDd.cloneNode(true);
                  clone.querySelectorAll('.show-akas, .akas').forEach(node => node.remove());
                  return clone.textContent.trim();
              }
          }
          return '';
      };

      const titulo = el.querySelector('h1 span[itemprop="name"]')?.innerText || '';
      const tituloOriginal = getDtDdValue('Título original');
      const año = getDtDdValue('Año');
      const pais = getDtDdValue('País').replace(/^\s*\n\s*/, ''); // Limpia espacios/saltos
      const bandera = el.querySelector('#country-img img')?.getAttribute('src') || '';

      const direccion = getDtDdValue('Dirección');
      const reparto = Array.from(el.querySelectorAll('.card-cast .cast-wrapper')).map(cast => cast.textContent.trim()).join(', ');
      const companias = Array.from(el.querySelectorAll('.card-producer .credits a')).map(company => company.textContent.trim()).join(', ');
      const genero = Array.from(el.querySelectorAll('.card-genres a')).map(genre => genre.textContent.trim()).join(', ');
      const sinopsis = el.querySelector('.movie-info dd[itemprop="description"]')?.innerText.trim() || '';

      // Enlace de la imagen
      const imagen = el.querySelector('#movie-main-image-container img')?.getAttribute('src') || '';

      const data = {
          Título: titulo,
          "Título original": tituloOriginal,
          Año: año,
          País: pais,
          Bandera: bandera,
          Dirección: direccion,
          Reparto: reparto,
          Compañías: companias,
          Género: genero,
          Sinopsis: sinopsis,
          Imagen: imagen
      };

      // Imprimir datos en consola
      console.log(data);

      // Guardar en CSV
      saveToCSV([data]);  // Pasar los datos como un array de objetos
  }

  function saveToCSV(data) {
    // Obtener los encabezados (keys del primer objeto del array)
    const headers = Object.keys(data[0]);

    // Crear las filas (valores correspondientes a cada key)
    const rows = data.map(item => Object.values(item));

    // Combinar los encabezados y las filas en una sola cadena de texto con tabulaciones
    const csvContent = [
      headers.join("\t"), // Encabezados con tabulaciones
      ...rows.map(row => row.join("\t")) // Filas de datos con tabulaciones
    ].join("\n"); // Unir todo con saltos de línea

    // Crear un Blob con el contenido CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Crear una URL para el Blob
    const url = URL.createObjectURL(blob);

    // Crear un enlace invisible para iniciar la descarga
    const link = document.createElement("a");
    link.href = url;
    link.download = "movie_data.csv"; // Nombre del archivo CSV
    link.style.visibility = "hidden"; // Ocultarlo de la vista
    document.body.appendChild(link); // Agregarlo al DOM
    link.click(); // Simular un click para iniciar la descarga
    document.body.removeChild(link); // Eliminar el enlace del DOM
  }

}
