import React, { useEffect, useState } from "react";
import {Link, useHistory} from 'react-router-dom';
// useHistory me redirige a la ruta que yo le diga 
import { useDispatch, useSelector } from 'react-redux';
import { getAllDiets, createRecipe} from "../../redux/actions/index";
import styles from './CreateRecipe.module.css';
// validaciones

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "Name is required"
    } else if (!input.dishSummary) {
        errors.dishSummary = "Dish summary is required"
    } else if (!input.healthScore) {
        errors.healthScore = "Health Score is required" // para filtrar por eso 
    } else if (input.healthScore > 100 || input.healthScore < 0) {
        errors.healthScore = " Health Score must be between 0 and 100"
    } 
    return errors;
};

// aca la action de createRecipe
const CreateRecipe = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets);

    const [input, setInput] = useState({ // estado para poder guardar el formulario
        name: "",
        dishSummary: "",
        healthScore: "",
        stepByStep: [],
        image: "",
        dishTypes: [],
        diets: []
    })

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
        setErrors(validate({
            ...input, 
            [event.target.name]: event.target.value
            })
        );
        console.log(input)
    };

    const handleSelect = (event) => {
        setInput({
            ...input, 
            diets: [...input.diets, {name: event.target.value}]
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('ESTE ES MI INPUT:', input);
        dispatch(createRecipe(input));
        alert('Recipe created successfully!');
        setInput({
            name: "",
            dishSummary: "",
            healthScore: "",
            stepByStep: [],
            image: "",
            dishTypes: [],
            diets: []
        });
        history.push('/home');
    };

    const handleDelete = (el) => { // siempre devolver el estado anterior, sino se va a romper!
        console.log("handleDelete");
        setInput({
            ...input, 
            diets: input.diets.filter(diet => diet.name !== el.name)
        })
    };

    useEffect(() => { // voy a necesitar renderizar mis dietas
        dispatch(getAllDiets());
        console.log(diets);
    }, [dispatch]);

    console.log(diets);

    return (
        <div className={styles.mainContainer}>
            <Link to = '/home'><button className={styles.homeButton}>Back to Home</button></Link>
            <div>
                <h1 className={styles.title}> Create your own recipe! </h1>
            </div>
            <div className={styles.form}>

            <form onSubmit={(event) => handleSubmit(event)}>
                <div>
                    <label>Name: </label>
                    <input className={styles.filter1}
                    type = "text"
                    value = {input.name}
                    name = "name" // este tiene que llamarse igual que el que seteo en el estado, para dsp poder usarlo en el handlechange
                    onChange={(event) => handleInputChange(event)} // no se le pasa el event?
                    />
                    {
                        errors.name && ( // si tengo errors.name...
                            <p className="error">{errors.name}</p> // ... entonces mandame un msj de error
                        )
                    }
                </div>
                <div>
                    <label>Dish Summary: </label>
                    <input className={styles.filter2}
                    type = "text"
                    value = {input.dishSummary}
                    name = "dishSummary"
                    onChange={(event) => handleInputChange(event)}
                    />
                    {
                        errors.dishSummary && ( 
                            <p className="error">{errors.dishSummary}</p> 
                        )
                    }
                </div>
                <div>
                    <label>Health Score: </label>
                    <input className={styles.filter3}
                    type = "number"
                    value = {input.healthScore}
                    name = "healthScore"
                    onChange={(event) => handleInputChange(event)}
                    />
                    {
                        errors.healthScore && ( 
                            <p className="error">{errors.healthScore}</p> 
                        )
                    }
                </div>
                <div>
                    <label> Step By Step: </label>
                    <input className={styles.filter4}
                    type = "text"
                    value = {input.stepByStep}
                    name = "stepByStep"
                    onChange={(event) => handleInputChange(event)}         
                    />
                </div>
                <div>
                    <label> Image: </label>
                    <input className={styles.filter5}
                    type = "text"
                    value = {input.image}
                    name = "image"
                    onChange={(event) => handleInputChange(event)}           
                    />
                </div>
                <select className={styles.filterDiets} onChange={((event) => handleSelect(event))}>
                    {  
                        diets?.map((diet) => (
                            <option key = {diet.id} value = {diet.name}> {diet.name} </option>     
                        ))
                    }
                </select>
                <div className = {styles.diets}>
                {
                    input.diets.map(el =>
                        <div className = {styles.deleteDiet}>
                            <p>{el.name}</p>
                            <button type = "button" className = {styles.deleteButton} onClick={() => handleDelete(el)}>X</button>
                        </div>                        
                    )
                }
                </div>
                <button type = "submit" className = {styles.submitButton} disabled = {errors.name || errors.dishSummary || errors.healthScore}> Create recipe </button>
            </form>
            </div>
        </div>
    )
}

export default CreateRecipe;