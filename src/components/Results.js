import React from 'react';

export default function Results(props){
    return(
        <>

        <p>{props.error}</p>

        {props.pokemon.name !== ''
          ?
            <div>#{props.pokemon.number} - {props.pokemon.name}</div>
          :
            <></>
        }

        <img src={props.pokemon.image} alt="pokemon sprite" className="w-48 h-48 object-cover"/>

        <div>{props.pokemon.type1}</div>
        <div>{props.pokemon.type2}</div>

        </>
    );
}