document.addEventListener("DOMContentLoaded", () => {
  const printButton = document.getElementById("printButton");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        func: () => {
          const url = window.location.href;
          return url;
        },
      },
      (results) => {
        const url = results[0].result;
        let domain = null;
        let icon = "icons/icon-gray.png";

        if (url.includes("www.filmaffinity.com/ar")) {
          domain = "FilmAffinity";
          icon = "icons/icon-green.png";
        } else if (url.includes("www.imdb.com")) {
          domain = "IMDb";
          icon = "icons/icon-green.png";
        } else if (url.includes("www.themoviedb.org")) {
          domain = "The Movie Database";
          icon = "icons/icon-green.png";
        }

        const statusDiv = document.getElementById("status");

        if (domain) {
          statusDiv.innerHTML = `
            <img src="${icon}" alt="Icono verde">
            <span>Estás en ${domain}</span>
          `;
        } else {
          statusDiv.innerHTML = `
            <img src="${icon}" alt="Icono gris">
            <span>No estás en una página soportada.</span>
          `;
        }
      }
    );
  });

  printButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => {
            extractData();
          },
        }
      );
    });
  });
});
