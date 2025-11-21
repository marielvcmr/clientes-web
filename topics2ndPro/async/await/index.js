const url = "https://pokeapi.co/api/v2/pokemo5n/pikachu"


/*fetch (url)
.then(response => response.json())
.then(data =>{
    console.log(data);
})
.catch(err => {
    console.log(err)
})
.finally(()=>{
    console.log("Termino la promesa")
})*/

// creating async functions

async function fetchPoke1(){
    const pokeapi = fetch(url);

}

const fetchPoke = async ()=>{ 

    try{
        const pokeapi = await fetch(url); // waits for this to be solved to keep going
        const data = await pokeapi.json();
        console.log(data);
    }catch
    {
        console.log(err);
    }
    finally
    {
        console.log("Termino esta prueba");
    }

    // inside async functions we have try catch
}

fetchPoke()
