const { API_KEY } = process.env; 
const axios = require('axios');
const { Recipe, Diet, recipes_diets } = require('../db');
const { Op } = require('sequelize');


                            ///////////// RECIPES //////////////

// PRIMERO ME TRAIGO LAS RECETAS DE LA API Y LA BD POR SEPARADO:

// API

const dataAPI = async () => {
    const arr = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5");
    // console.log('ESTO ME DEVUELVE LA API: ', arr.data.results[0]); // devuelve un array de objetos
   const recipes = arr.data.results.map(recipe => {
    return {
        id:recipe.id,
        name: recipe.title,
        image: recipe.image,
        dishTypes: recipe.dishTypes?.map(dishType => dishType),
        dishSummary: recipe.summary,
        healthScore: recipe.healthScore,
        stepByStep: recipe.analyzedInstructions.steps?.map(step => step),
        // analizedInstructions = [{name:""}, {steps: []}]
        // voy a recibir un array de steps
        diets: recipe.diets?.map(diet => diet = { name: diet } ),
    }
   });
   return recipes;
}

// "https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5"
// `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
                                            // para limitar los registros q me trae // para traer mas info

// DATABASE

// esto va a hacer que las recetas que muestre en el post me vengan con las dietas (solo con el name)
const dataDB = () => {
    const arr = Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'], // en este caso como solo tenemos name no hace falta esta parte pero si tuvieramos mas atributos y solo quisieramos name, si!
            through: { // mediante los atributos 
                attributes: []
            }
        }}); // tiene que incluir al modelo Diet porque sino cuando cree una receta nunca me va a traer la asociacion con la dieta 
        return arr;
}

// AHORA LOS UNO:

const getAllRecipes = async () => {
    const allAPIRecipes = await dataAPI();
    const allDBRecipes = await dataDB();
    const allRecipes = [...allDBRecipes, ...allAPIRecipes]; // allAPIRecipes.concat(allDBRecipes)
    return allRecipes;
}


                                      //// DETAILS ////

const apiRecipeDetail = async (id) => {
    const arr = await axios.get("https://run.mocky.io/v3/43d17cbe-c46f-418a-b0d6-658e17dc8e32");
    console.log('ESTO ME DEVUELVE LA API: ', arr.data[0]); // devuelve un array de objetos
    const recipe = arr.data;
    const recipeDetail = {
            name: recipe.title,
            image: recipe.image,
            dishTypes: recipe.dishTypes?.map(dishType => dishType),
            dishSummary: recipe.summary,
            healthScore: recipe.healthScore,
            stepByStep: recipe.analyzedInstructions.steps?.map(step => step),
            diets: recipe.diets?.map(diet => diet = { name: diet } )
        }
       return recipeDetail;
}

// "https://run.mocky.io/v3/43d17cbe-c46f-418a-b0d6-658e17dc8e32"
// `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}` // para que agregue los tipos de dietas asociados


/////////////////////

// Para los tipos de dieta deben tener en cuenta las propiedades vegetarian, vegan, glutenFree por un lado y también analizar las que se incluyan dentro de la propiedad diets: 



                              //////////POST RECIPE//////////
                              
const createNewRecipe = async (name, image, dishTypes, dishSummary, healthScore, stepByStep, diets) => {
    if (!name || !dishSummary || !healthScore) throw Error("The name, dish summary and healthscore are required");
    console.log('stepByStep:', stepByStep);
    const newRecipe = await Recipe.create({
        name: name, 
        image: image, 
        dishTypes: dishTypes,
        dishSummary:dishSummary, 
        healthScore: healthScore, 
        stepByStep: [[stepByStep]], // el modelo espera un array de objetos y yo le estaba pasando un string :)        
    });
    
    let dietsAux = diets.map(diet => diet.name.toLowerCase());
    let dietsDb = await Diet.findAll();
    let dietsDbmapFiltered = dietsDb.filter(diet => dietsAux.includes(diet.dataValues.name))
    await newRecipe.addDiets(dietsDbmapFiltered, {through: {recipes_diets}});  
    console.log("newRecipe", newRecipe);
    return newRecipe;  
};


                            /////////////////// DIETS /////////////////

const addBasicsDiets = async() => {
    const recipesApi = await dataAPI();
    const allDiets = recipesApi.map(recipe => recipe.diets);
    allDiets.forEach(dietsPerRecipe => {
        dietsPerRecipe.map(diet => { // diet es un array de dietas. Por c/ dieta 
            Diet.findOrCreate({ // encontrame o creame la dieta
                where: {name : diet.name} // cuyo nombre coincida con el nombre de mi dieta
            })
        })
       
    });
    const totalDiets = await Diet.findAll();
    console.log(totalDiets);
    // console.log(totalDiets.map(diet => diet = diet.dataValues.name));
    return totalDiets;
}

/* ES IGUAL A :

    const recipes = await dataAPI();
    const dietsFromAPI = [];
    recipes.forEach(recipe => recipe.diets.forEach(diet => dietsFromAPI.push(diet)));
    basicDiets = new Set(dietsFromAPI);
    basicDiets = Array.from(basicDiets)
    basicDietsToObj = [];
    basicDiets.map(diet => basicDietsToObj.push({name: diet}));
    await Diet.bulkCreate(basicDietsToObj);
    let result = await Diet.findAll();
    return result;

*/
    
module.exports = {
    getAllRecipes,
    apiRecipeDetail,
    createNewRecipe, 
    addBasicsDiets
}