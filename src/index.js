document.addEventListener('DOMContentLoaded', () => {
  console.log(POKEMON)

})
//

function pokeFinder(id, response){
    return response.find(function(ele){
      if (ele["id"] === id){
        return ele;
      };
  })
}
// <input id="pokemon-search-input" type="text" name="">



function getPokemon(url) {
  fetch(url).then(function(response){
    return response.json()
  }).then(function(response){
    const pokeDiv = document.getElementById('pokemon-container')
    const input = document.querySelector("#pokemon-search-input")
    const form = document.querySelector("#pokemon-search-form")

    let filteredArr;
    filteredArr = response;
    makePoke(filteredArr)

    form.addEventListener('submit', (e) => e.preventDefault())

    input.addEventListener("keyup", (e)=>{
      // e.preventDefault()
      // keyup
      // keydown
      let searchInput = input.value
      filteredArr = response.filter(function(poke){
        return poke["name"].includes(searchInput)
      })
      pokeDiv.innerHTML = ""
      makePoke(filteredArr)
    })

    function makePoke(filteredArr){
      if (filteredArr.length === 0){
        let errorMsg = document.getElementById('pokemon-container')
        errorMsg.innerHTML = `<center>There are no Pokemon here</center>`
      }
      
      for(poke of filteredArr) {
        let imgFlip = 0
        let pC = document.createElement('div')
        pC.className = "pokemon-container"
        let pF = document.createElement('div')
        pF.className = "pokemon-frame"
        pF.innerHTML  += `<h1>${poke["name"]}</h1>`
        let imgDiv = document.createElement('div')
        let imgTag = document.createElement('img')
        imgTag.dataset.id = `${poke['id']}`
        imgTag.src = poke['sprites']['front']
        imgDiv.addEventListener('click',(event)=>{
          findPoke = pokeFinder(parseInt(event.target.dataset.id), response)
          if (imgFlip === 0) {
            imgTag.src = findPoke['sprites']['front']
            imgFlip = 1
          } else {
            imgTag.src = findPoke['sprites']['back']
            imgFlip = 0
          }
        })
        imgDiv.appendChild(imgTag)
        pF.appendChild(imgDiv)
        pC.appendChild(pF)
        pokeDiv.appendChild(pC)
      }
    }
  })
}


getPokemon('http://localhost:3000/pokemon')
