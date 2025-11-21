const listaPokemon = document.querySelector("#lista-pokemon")


const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";
fetch(pokemonUrl)
.then(response => response.json())
.then(data => 
{
    const pokemons = data.results;
    pokemons.forEach(element => {
        const li = document.createElement("li")
        li.innerText= element.name
        listaPokemon.append(li)
    });
}
)