import React from "react";
import styles from './RecipeCard.module.css';


export const RecipeCard = ({name, dietType, image, healthScore}) => {
    return (
        <div className = {styles.mainContainer} >
            <h3 className={styles.name}> {name} </h3>
            <div className={styles.imgContainer}>
                <img src={image} alt = 'img not found' width='300px' height='250px' />
            </div>
            <ul className={styles.dietTypes}> 
                <p>Diet Types:</p>
                <h1></h1>
            {
                dietType?.map(el => {
                    return (
                        <li className={styles.diet}>{el}</li> 
                    )
                })
            }
            </ul>
            <h4> Health Score: {healthScore} </h4>
        </div>
    )
};
