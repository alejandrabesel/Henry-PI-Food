import axios from "axios";
// Aca deben declarar las variables donde tengan el action types.
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
// estos primeros dos deberian ser el mismo por venir de la misma ruta? No! van en componentes distintos
export const GET_RECIPE_DETAILS = "GET_RECIPE_DETAILS";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const GET_RECIPES_BY_DIET = "GET_RECIPES_BY_DIET";
export const GET_RECIPES_BY_CREATOR = "GET_RECIPES_BY_CREATOR";
export const GET_RECIPES_BY_ORDER = "GET_RECIPES_BY_ORDER";
export const GET_NAME_CHARACTERS = "GET_NAME_CHARACTERS";



                            ////////////// HOME ///////////////


// aca no va async await porque estamos trabajando con .then (promesas)
// con axios seria igual, o puedo hacerlo con async await ...
export const getAllRecipes = () => dispatch => {
    return (
        fetch("http://localhost:3001/recipes") 
        .then(response => response.json())
        .then(data => {
            dispatch({ type: GET_ALL_RECIPES, payload: data })
        })
    );
};

export const getAllDiets = () => dispatch => {
    return (
        fetch("http://localhost:3001/diets")
        .then(response => response.json())
        .then(data => {
            dispatch({ type: GET_ALL_DIETS, payload: data})
        })
    )
};

                                //------------------ FILTERS ------------------

export const getRecipesByDiet = (diet) => {
    return {
        type: GET_RECIPES_BY_DIET,
        payload: diet
    }
};

export const getRecipesByCreator = (creator) => {
    return {
        type: GET_RECIPES_BY_CREATOR,
        payload: creator
    }
};

export const getRecipesByOrder = (order) => {
    return {
        type: GET_RECIPES_BY_ORDER,
        payload: order
    }
}
                            // ------------- SEARCH BAR --------------

export const getNameRecipes = (name) => {
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/recipes?name=${name}`) // + name
            return dispatch ({
                type: GET_NAME_CHARACTERS,
                payload: json.data
            })
        } catch (error) {
            console.log(error) // aca mandamos el catch porque en este caso puede haber un error
        }
    }
}

/*
export const getNameRecipes = (name) => dispatch => {
    return (
        fetch(`http://localhost:3001/recipes?name=${name}`)
        .then(response => response.json())
        .then(data => {
            dispatch({ type: GET_NAME_CHARACTERS, payload: data})
        })
    )
};
*/

                        ///////////////// CREATE RECIPE ////////////////

export function createRecipe(payload) {
    return async function (dispatch) {
        console.log('payload', payload);
        const response = await axios.post("http://localhost:3001/recipes", payload)
        console.log("response", response);
        return response;
    }
}

// export function createRecipe(payload) {
//     fetch("http://localhost:3001/recipes", {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload.id)
//     })
//     .then(response => response.json())
//     .then(response => console.log(response))
// }

                                        //////////// RECIPE DETAILS ///////////////

export const getRecipeDetails = (id) => {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({
                type: GET_RECIPE_DETAILS,
                payload: json.data
            })
        } catch(error) {
            console.log(error)
        }
    }
}