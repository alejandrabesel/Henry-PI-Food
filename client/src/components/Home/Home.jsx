import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getAllRecipes, getAllDiets, getRecipesByDiet, getRecipesByCreator, getRecipesByOrder } from "../../redux/actions";
import { RecipeCard } from '../RecipeCard/RecipeCard';
import { Paginado } from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import styles from './Home.module.css';
import img from '../../images/default_image.jpg';

//vamos a usar hooks, de ultima dsp armamos otro componente con clase (hooks solo para funcionales!!)

// aca va ir la action getAllRecipes
const Home = (props) => {

    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes); // esto es lo mismo que el mapstatetoprops!
    const allDiets = useSelector(state => state.diets);
    // paginado desde el FE:
    //voy a definir varios estados locales
    const [currentPage, setCurrentPage] = useState(1); // estado local con la pagina actual y un set
    const [recipesPerPage, setRecipesPerPage] = useState(9); // estado con recetas por pagina
    const [order, setOrder] = useState('');
    const indexOfLastRecipe = currentPage * recipesPerPage; // va a ser la pagina actual en la que estoy * la cantidad de recetas x pag
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; // indice de la ultima receta - las recetas por pag
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);// constante que guarda todos los personajes que voy a tener por pag
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // todos los personajes por la cantidad de personajes que quiero por pagina

    useEffect(() => {
        dispatch(getAllRecipes());
        dispatch(getAllDiets());
        // dispatch(getRecipesByDiet());
    }, [dispatch]); // el arreglo del 2ndo parametro se usa cuando queres que el componente se monte siempre que pase algo antes, que dependa de algo para montarse
    // esto reemplaza al mapdipatchtoprops
   

    const handlerClick = (event) => {
        event.preventDefault(); // para evitar que se rompa : cada vez que recargamos la pag el useEffect se vuelve a montar, esto es para que no se monte a menos que yo se lo pida por el onclick
        dispatch(getAllRecipes()); // volver a cargar todos los personajes 
    };

    const handlerFilterByDiet = (event) => { // se la voy a pasar al select para decirle que cuando els e modifique, me ejecute esta fx (onChange)
        dispatch(getRecipesByDiet(event.target.value)); // aca le paso el value de la option del select que elija el usuario
    };

    const handlerFilterByCreator = (event) => {
        dispatch(getRecipesByCreator(event.target.value));
    };

    const handlerSort = (event) => {
        event.preventDefault();
        dispatch(getRecipesByOrder(event.target.value));
        setCurrentPage(1);
        setOrder(`Order ${event.target.value}`); // order es un estado ocal vacio, para lo unico que lo uso es para que cuanodo seteo la pag me modifique el esado local y se renderice 
    }

    return (
        <div className = {styles.home}>
            <Link to = '/home/create'> <button className={styles.createButton}> Create your own recipe </button></Link>
            <button className={styles.getAllButton} onClick={event => {handlerClick(event)}}> Get all the recipes </button>
            <div>
                <select className={styles.filter1} onChange={(event) => {handlerSort(event)}}>
                    <option value='NoOrd'> No order </option>
                    <option value = 'AscAlph'> A - Z </option>
                    <option value = 'DescAlph'> Z - A </option>
                    <option value = 'DescNum'> Highest Health Score </option>
                    <option value = 'AscNum'> Lowest Health Score </option>
                </select>

                <select className={styles.filter2} onChange={(event) => {handlerFilterByDiet(event)}}>
                    <option value = 'All'> All diets </option>
                    {
                        allDiets?.map(diet => 
                            <option key = {diet.id} value = {diet.name}> {diet.name} </option>
                        )
                    } 
                </select>

                <select className={styles.filter3} onChange={(event) => {handlerFilterByCreator(event)}}>
                    <option value = 'All'> All recipes</option>
                    <option value = 'Created'> Only your recipes </option>
                    <option value = 'Api'> Only others recipes </option>
                </select>

                <Paginado 
                    recipesPerPage = {recipesPerPage}
                    allRecipes = {allRecipes.length}
                    paginado = {paginado}       
                />

                <SearchBar/>

        <div className = {styles.recipes}>

        {   
            Array.isArray(currentRecipes)?
                currentRecipes[0]?
                currentRecipes.map(recipe => {
                return (
                    <div>
                        <Link to = {'/home/' + recipe.id} >
                            <RecipeCard 
                                name = {recipe.name}
                                image = {recipe.image? recipe.image : img}
                                dietType = {recipe.diets.map(diet => diet.name + " ")}
                                healthScore = {recipe.healthScore}
                                key = {recipe.id}
                            />
                        </Link>
                    </div>
                    )
                 }) :
                 <div><p className={styles.loader}>Loading...</p></div>
            :
            <div><p className={styles.noRecipeFound}>No recipes found with that name</p></div>
        }
        </div>    



        </div>
    </div>
    )
}
// upward / downward 
// si hay recetas, haceme un map (p que no rompa)

export default Home;