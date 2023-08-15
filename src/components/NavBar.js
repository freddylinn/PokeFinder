import React from 'react';

export default function NavBar() {
    return(
        <nav>
            <div className="flex justify-center md:justify-start md:pl-8 py-2 gap-8 
            bg-emerald-600 text-lg text-white font-semibold">
                <a href="" className="">Search</a>
                <a href="">Pokedex</a>
            </div>
        </nav>
    );
}