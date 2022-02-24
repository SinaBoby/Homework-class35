'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw `HTTP ERROR`;
    } else {
      return await response.json();
    }
  } catch (error) {
    console.log(error);
  }
}
function fetchAndPopulatePokemons(pokemons) {
  const namesList = document.createElement('select');
  if (!document.querySelector('select')) {
    document.body.appendChild(namesList);
  }
  pokemons.results.forEach((pokemon) => {
    const pokemonNumber = pokemon.url.split('/')[6];
    const name = document.createElement('option');
    name.setAttribute('value', pokemonNumber);
    name.textContent = pokemon.name;

    namesList.appendChild(name);
  });

  return namesList;
}

async function fetchImage(pokemonChar) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonChar}/`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw 'HTTP ERROR';
      } else {
        return response.json();
      }
    })
    .then((data) => {
      loadImage(data);
    })
    .catch((error) => console.log(error));
}

async function main() {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=151/`;
    const getDataBtn = document.createElement('button');
    getDataBtn.setAttribute('type', 'button');
    getDataBtn.id = 'get-data';
    getDataBtn.textContent = 'Get Data';
    document.body.appendChild(getDataBtn);
    getDataBtn.addEventListener('click', async () => {
      const pokemons = await fetchData(url);

      const namesList = fetchAndPopulatePokemons(pokemons);
      namesList.onchange = async (e) => {
        console.log(e.target.value);
        const pokemonChar = e.target.value;
        await fetchImage(pokemonChar);
      };
    });
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', main);
//I'd like to See Your Notes about using async/await keyword. I'm not still totally sure which func should I call asynchronously and which one not . I know about promises but not yet quite comfortable with async/await even if my code works! specially using them with anonymous functions and arrow funcs.
function loadImage(data) {
  const img = document.createElement('img');
  img.src = data.sprites.front_default;
  const container = document.getElementById('imageContainer');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  container.appendChild(img);
}
