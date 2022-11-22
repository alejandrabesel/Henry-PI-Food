import React, { Component } from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNameRecipes  } from "../../redux/actions";
import styles from './SearchBar.module.css'
// en el searchbar va a ir la ruta getRecipesByName 

const NavBar = (props) => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInputChange = (event) => {
        event.preventDefault();
        setName(event.target.value); // va a ir guardando en el estado local el input
        console.log(name); // para ver como va cambiando el estado
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getNameRecipes(name));
        setName('');
    };

    return (
        <div > 
            <input className={styles.input}
                type = 'text'
                placeholder= 'Search for recipes here...'
                onChange={ (event) => handleInputChange(event)}
            />
            <button className={styles.button}
                type = 'submit'
                onClick={(event) => handleSubmit(event)}> Search </button>
        </div>
    )
}

export default NavBar;