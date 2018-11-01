
document.addEventListener('DOMContentLoaded', () => {
  const pokemonContainer = document.querySelector('#pokemon-container');

  const spriteURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  pokemonContainer.innerHTML = '';
  const search = document.querySelector('#pokemon-search-input');
  search.addEventListener('input', (e) => filterPokemon(e));
  getPokemons();

  function getPokemons () {
    const URL = 'https://pokeapi.co/api/v2/pokemon/';
    for (let i = 1; i < 152; i++) {
      getPokemon(URL + i + '/');
    }
  }

  function getPokemon (url) {
    fetch(url)
      .then(resp => resp.json())
      .then(json => displayPokemon(json));
  }

  function displayPokemon (poke) {
    const smallContainer = document.createElement('div');
    smallContainer.className = 'pokemon-container';
    let div = document.createElement('div');
    div.style = 'width:230px;margin:10px;background:#fecd2f;color:#2d72fc';
    div.className = 'pokemon-frame';
    let h = document.createElement('h1');
    h.innerText = poke.name;
    h.className = 'center-text';
    let innerDiv1 = document.createElement('div');
    innerDiv1.style = 'width:239px;margin:auto';
    let innerDiv2 = document.createElement('div');
    innerDiv2.style = 'width:96px;margin:auto';
    let img = document.createElement('img');
    img.src = poke.sprites.front_default;
    img.dataset.id = poke.id;
    img.addEventListener('click', (e) => {
      let p = e.target;
      p.src === `${spriteURL + p.dataset.id}.png` ? p.src = `${spriteURL}back/${p.dataset.id}.png` : p.src = `${spriteURL + p.dataset.id}.png`;
    });
    innerDiv2.append(img);
    innerDiv1.append(innerDiv2);
    div.append(h, innerDiv1);
    smallContainer.append(div);
    pokemonContainer.append(smallContainer);
  }

  function filterPokemon (e) {
    let value = e.target.value.toUpperCase();
    const allPokemon = document.querySelectorAll('.pokemon-container');
    allPokemon.forEach((pokemon) => {
      if ((pokemon.innerText.toUpperCase().search(value)) === -1) {
        pokemon.hidden = true;
      } else {
        pokemon.hidden = false;
      }
    });
  }
});
