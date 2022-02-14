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
async function fetchAndPopulatePokemons(pokemons) {
  const namesList = document.createElement('select');
  document.body.insertAdjacentElement('afterbegin', namesList);
  await pokemons.results.forEach((pokemon) => {
    const name = document.createElement('option');
    name.setAttribute('value', pokemon.name);
    name.textContent = pokemon.name;
    namesList.appendChild(name);
  });

  return namesList;
}

async function fetchImage(namesList, pokemons) {
  const selectedName = namesList.options[namesList.selectedIndex].text;
  const results = pokemons.results;

  results.forEach((pokemon) => {
    if (pokemon.name === selectedName) {
      fetch(pokemon.url)
        .then((response) => {
          if (!response.ok) {
            throw 'HTTP ERROR';
          } else {
            return response.json();
          }
        })
        .then((data) => {
          const img = document.createElement('img');
          img.src = data.sprites.front_default;
          const container = document.getElementById('imageContainer');
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
          container.appendChild(img);
        })
        .catch((error) => console.log(error));
    }
  });
}

async function main() {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=151/`;
  try {
    const pokemons = await fetchData(url);
    const namesList = await fetchAndPopulatePokemons(pokemons);
    namesList.onchange = async () => {
      await fetchImage(namesList, pokemons);
    };
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', main);
//I'd like to See Your Notes about using async/await keyword. I'm not still totally sure which func should I call asynchronously and which one not . I know about promises but not yet quite comfortable with async/await even if my code works! specially using them with anonymous functions and arrow funcs.
