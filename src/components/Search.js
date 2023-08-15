import React from 'react';

export default function Search(props){
    return(
        <form onSubmit={props.onSearch} className="flex flex-col items-center w-full">
            <input 
                type="text"
                value={props.inputValue}
                onChange={props.onChange}
                className="
                    block w-11/12 md:w-96 mt-20 mb-8
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-green-400 focus:ring focus:ring-green-300 focus:ring-opacity-50"
            />
            <button 
                type="submit" 
                disabled={props.inputValue.length === 0}
                className="
                    px-5 py-2 
                    bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-200 disabled:cursor-not-allowed active:bg-cyan-700
                    rounded-lg 
                    font-bold text-white 
                    rounded-md
                    shadow-sm" 
            >
            Search
            </button>
        </form>
    );
}