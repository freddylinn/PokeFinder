import { useEffect, useLayoutEffect, useState } from 'react';
import './App.css';
import Search from './components/Search';
import Results from './components/Results';
import Loading from './components/Loading';
import NavBar from './components/NavBar';

export default function App() {

  const Pokedex = require("pokeapi-js-wrapper");
  const P = new Pokedex.Pokedex();

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
  const [maxPokemonID, setMaxPokemonID] = useState(0);

  useEffect(() => { // Check max pokemon id on initial render
    fetchMaxPokemonID();
  }, [] )

  async function fetchMaxPokemonID() {
    const result = await P.getPokemonSpeciesList();
    setMaxPokemonID(result.count);
  }

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


  function updateResults(result){

    let secondType = '';
    if(result.types.length === 2){
      secondType = result.types[1].type.name;
    }

    let sprite = '';
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
        updateResults(result);

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
    <>
    <NavBar></NavBar>
    <div className="h-screen bg-gradient-to-r from-neutral-100 to-neutral-200">
      <div className="flex flex-col items-center">
        <h1
          className="font-semibold text-2xl md:text-3xl text-center
            px-6 pt-16"
        >
        Search a Pokemon by Name or ID!
        </h1>
        <h3
          className="font-medium text-lg md:text-xl text-center
            px-6 pt-2"
        >
          {maxPokemonID !== 0 ? `Current Pokemon: 1 to ${maxPokemonID}` : <></>}
        </h3>
        <Search 
          onSearch={searchPokemon}
          onChange={handleChange}
          inputValue={inputValue}
        />
        {loading 
          ? 
            <Loading/>
          :
            <Results
              error={error} 
              pokemon={pokemon}
            />
        }
      </div>
    </div>
    </>
  );
}
