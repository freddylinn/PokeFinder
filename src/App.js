import { useState } from 'react';
import './App.css';

function App() {

  const [inputValue, setInputValue] = useState('');
  const [pokemon, setPokemon] = useState({
    name: '',
    image: 'https://lh3.googleusercontent.com/6f7EGWNzYPSDLIDpFmeJ9suDi0Zh2hsNaAuus28SBajO2tAx65thjuM0ZSVN-DySffZc_eTlJXSK_O8Gcnj6nQ',
    type1: '',
    type2: '',
  });
  const [error, setError] = useState('');

  const Pokedex = require("pokeapi-js-wrapper");
  const P = new Pokedex.Pokedex();

  function validateInput(input){
      if(isNaN(input)){ // if the string is NOT a valid number 
        if(input.length < 25 && input.length >= 1){
          return "validName";
        }
      }
      else{
        if(input % 1 == 0 && input >= 1 && input.length <= 4){
          return "validNumber";
        }
      }
      return "INVALID";
  }


  const searchPokemon = async (e) => {

    e.preventDefault();
    setError('');
    const validResult = validateInput(inputValue);
    
    if(validResult === "INVALID"){
      setError("Invalid input. Please try again.")
      setPokemon({...pokemon,
        name: '',
        image: '',
        type1: '',
        type2: '',
      });
    }
    else{

      let query;

      if(validResult === "validName"){
        query = inputValue.toLowerCase();
      }
      else if(validResult === "validNumber"){
        query = parseInt(inputValue);
      }

      try {

        const result = await P.getPokemonByName(query);
        console.log(result.types);

        let secondType = '';

        if(result.types.length === 2){
          secondType = result.types[1].type.name;
        }

        setPokemon({...pokemon,
          name: result.name,
          image: result.sprites.front_default,
          type1: result.types[0].type.name,
          type2: secondType,
        });

      } catch (err) {

        console.log(err);
        setError("Pokemon could not be found. Please try another input.")

      }
    }
  };

  function handleChange(e){
    setInputValue(e.target.value);
  }

  return (
    <div className="flex flex-col items-center bg-neutral-200">
      <form onSubmit={searchPokemon} className="flex flex-col items-center">
            <input 
              className="block w-64 mt-32 mb-8"
              type="text"
              value={inputValue}
              onChange={handleChange}
            />
        <button type="submit" className="px-5 py-2 bg-cyan-200 rounded-lg">Search</button>
        <p>{error}</p>
        <div>{pokemon.name}</div>
        <img src={pokemon.image} alt="pokemon sprite" className="w-48 h-48"/>
        <div>{pokemon.type1}</div>
        <div>{pokemon.type2}</div>
      </form>
    </div>
  );
}

export default App;
