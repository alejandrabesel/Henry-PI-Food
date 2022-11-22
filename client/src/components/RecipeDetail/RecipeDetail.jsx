import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRecipeDetails } from '../../redux/actions/index';
import img from '../../images/default_image.jpg';
import styles from './RecipeDetail.module.css';

const RecipeDetail = (props) => { // props.match.params / useParams (hook)

    console.log(props);
    const dispatch = useDispatch();
    
    useEffect(() => {
        console.log(props.match.params.id);
        dispatch(getRecipeDetails(props.match.params.id));
        
    }, [dispatch]);

    const myRecipe = useSelector((state) => state.recipeDetail);
    console.log("myRecipe:", myRecipe);
    return (
        <div className={styles.mainContainer}>
            <Link to='/home'>
                <button className = {styles.buttonHome}> Back to Home </button>
            </Link>
            {
                myRecipe?
                <div className={styles.recipeContainer}>
                    <h1>{myRecipe.name}</h1>
                    {
                        myRecipe.image? 
                        <img src={myRecipe.image} alt = 'img not found' width='300px' height='250px'/> :
                        <img src={img} alt = 'default image' width='300px' height='250px'/>
                    }
                    <h4 className={styles.summary}>Dish Summary: {myRecipe.dishSummary?.replace(/<[^>]*>?/g,'')}</h4>
                    <h4 className={styles.dishTypes}>Dish Types: {myRecipe.dishTypes?.map(d => d)}</h4>
                    <h4>HealthScore: {myRecipe.healthScore}</h4>
                    <h4>Step by Step: {myRecipe.stepByStep?.map(d => d)}</h4>
                    <h4 className={styles.diets}> Diets: {myRecipe.diets?.map(d => <li> {d.name} </li>)}</h4>
                </div>
                :
                <p>Loading...</p>
            }
        </div>
    )
}

export default RecipeDetail;