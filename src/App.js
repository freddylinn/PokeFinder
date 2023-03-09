import { useState } from 'react';
import './App.css';
import Search from './components/Search';
import Results from './components/Results';

export default function App() {

  const [inputValue, setInputValue] = useState('');
  const [pokemon, setPokemon] = useState({
    number: '',
    name: '',
    image: 'https://lh3.googleusercontent.com/6f7EGWNzYPSDLIDpFmeJ9suDi0Zh2hsNaAuus28SBajO2tAx65thjuM0ZSVN-DySffZc_eTlJXSK_O8Gcnj6nQ',
    type1: '',
    type2: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  function clearResults(){
    setPokemon({...pokemon,
      number: '',
      name: '',
      image: '/sadPikachu.png',
      type1: '',
      type2: '',
    });
  }


  const searchPokemon = async (e) => {

    e.preventDefault();
    setError('');
    const validResult = validateInput(inputValue);
    setLoading(true);
    
    if(validResult === "INVALID"){
      setLoading(false);
      setError("Invalid input. Please try again.")
      clearResults();
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
        setLoading(false);
        console.log(result.types);

        let secondType = '';

        if(result.types.length === 2){
          secondType = result.types[1].type.name;
        }

        let sprite = '';
        console.log(result.sprites.front_default);

        if(result.sprites.front_default == null){
            sprite = '/notAvailable.png';
        }
        else{
          sprite = result.sprites.front_default;
        }

        setPokemon({...pokemon,
          number: result.id.toString(),
          name: result.name,
          image: sprite,
          type1: result.types[0].type.name,
          type2: secondType,
        });

      } catch (err) {

        console.log(err);
        setLoading(false);
        setError("Pokemon could not be found. Please try another input.")
        clearResults();
      }
    }
  };

  function handleChange(e){
    setInputValue(e.target.value);
  }

  return (
    <div className="flex flex-col items-center bg-neutral-100">
      <Search 
        onSearch={searchPokemon}
        onChange={handleChange}
        inputValue={inputValue}
      />
      {loading 
        ? 
          <p>Loading...</p>
        :
          <Results
            error={error} 
            pokemon={pokemon}
          />
      }
    </div>
  );
}
