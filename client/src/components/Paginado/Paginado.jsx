import React from 'react';
import './Paginado.css';


export const Paginado = ({recipesPerPage, allRecipes, paginado})  =>{
    
    const pageNumbers = [];

    for (var i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) { // math ceil redondea para arriba. mientras i no se pase de la cantidad de paginas que se necesitan para cubrir todas las recetas
        pageNumbers.push(i);
    } 

    return (
        <nav>
            <ul className='paginado'>
                {
                    pageNumbers && pageNumbers.map(num => (   
                        <li className='num' key = {num}>
                            <a onClick={() => paginado(num)}> {num} </a>
                        </li>
                    ))  
                }
            </ul>
        </nav>
    )
};