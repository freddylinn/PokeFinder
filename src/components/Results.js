import React from 'react';
import clsx from 'clsx';


export default function Results(props){

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const typeBackgrounds = {
        bug: 'bg-lime-600',
        dark: 'bg-stone-700',
        electric: 'bg-yellow-500',
        fighting: 'bg-red-800',
        fire: 'bg-red-500',
        flying: 'bg-blue-400',
        grass: 'bg-emerald-500',
        poison: 'bg-fuchsia-500',
        water: 'bg-sky-500',
        ice: 'bg-sky-300',
        normal: 'bg-neutral-400',
        steel: 'bg-slate-400',
        fairy: 'bg-pink-300',
        psychic: 'bg-pink-500',
        ghost: 'bg-indigo-800',
        dragon: 'bg-indigo-500',
        ground: 'bg-ground',
        rock: 'bg-rock',
    }

    return(
        <>

        {props.pokemon.name !== ''
          ?
            <p className="pt-12 pb-4 font-vcr text-2xl text-center">#{props.pokemon.number} - {capitalize(props.pokemon.name)}</p>
          :
            <p className="pt-12 pb-4 font-medium text-xl text-center">{props.error}</p>
        }

        <img src={props.pokemon.image} alt="pokemon sprite" className="w-48 h-48 object-cover"/>

        <div className="flex justify-center items-center gap-6 pt-4">
            <div className={clsx("font-semibold text-xl text-white",
                "px-8 py-2 rounded-3xl",
                typeBackgrounds[props.pokemon.type1])}
            >
            {capitalize(props.pokemon.type1)}
            </div>
            {props.pokemon.type2 !== ''
                ?
                    <div className={clsx("font-semibold text-xl text-white",
                        "px-8 py-2 rounded-3xl",
                        typeBackgrounds[props.pokemon.type2])}
                    >
                        {capitalize(props.pokemon.type2)}
                    </div>
                :
                    <></>
            }
        </div>

        </>
    );
}