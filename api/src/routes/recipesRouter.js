const { Router } = require('express');
const recipesRouter = Router();
const { Recipe, Diet } = require('../db');
require('dotenv').config();
const { getAllRecipes, createNewRecipe, apiRecipeDetail } = require('../controllers/controllers');
const { Op } = require('sequelize');


// ME TRAIGO LA DATA DE LA API


///// GETS /////

// GET ALL THE RECIPES

recipesRouter.get('/', async (req, res) => {
    const { name } = req.query; // me traigo el name por query
    const allRecipes = await getAllRecipes();
    try {
        if (!name) return res.status(200).json(allRecipes);
        const recipesByName = allRecipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
        // const myRecipes = await Recipe.findAll({where: { name: { [Op.substring]: name }
        if (!recipesByName[0]) return res.status(200).json('No recipes found with that name');        
        res.status(200).json(recipesByName);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

/*
PAGINADO Y FILTROS: el tema es que aca lo hace todo desde la bd porque fede agrega lo de la api a su bd, yo lo tengo por separado...

                    let recipes = Recipe.findAll({
                    where: {
                        diets: {[Op.contains]: req.query.filter}
                    },
                    limit: 6, // cantidad de recetas que vas a mostrar por pag
                    offset: req.query.page, // paginado --> voy a escuchar este evento desde mi useffect
                    order: [["name", req.query.order]], // para que pueda ser desc o asc
                    include: { model: Diet } // para incluir la dieta

*/
// aca me falta filtrar: Botones/Opciones para filtrar por por tipo de dieta


                                    /////// GET RECIPES BY ID /////////
recipesRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (id.includes("-")){
            const dbRecipeDetail = await Recipe.findOne({ where: {id},
            include: {model: Diet}});
            // ACA DEBERIA AGREGAR LAS DIETAS ASOCIADAS (tanto las que creo como las q vienen de la api)
            //findByPk tmb es valido
            if(!dbRecipeDetail) throw Error('No recipe found with that id');
            return res.status(200).json(dbRecipeDetail);
        } else {
            const result = await apiRecipeDetail(id);// 
    
            // TENGO QUE HACER UN CONTROLLER QUE ME TRAIGA TODAS LAS DIETAS ASOCIADAS A X ID A TRAVES DE LA TABLA INTERMEDIA -- pero esa tabla me une MIS recetas con MIS dietas, puedo tmb usarla para la api?
            // NO NECESITO: para la api ya lo tengo resuelto con la url q me dan
            if(!result) throw Error('No recipe found with that id');
            res.status(200).json(result);
        }  
    } catch (error) {
        res.status(400).json(error.message)
    }
});

// POST

recipesRouter.post('/', async (req, res) => {
    // RECIBE los datos recolectados desde el formulario
    
    try {
        const { 
            name, 
            image, 
            dishTypes,
            dishSummary, 
            healthScore, 
            stepByStep,  
            diets,
 } = req.body; // diets es un array de objetos
        // CREA una receta en la bd relacionada con sus TIPOS de DIETAS
        console.log('BODY:', req.body);
        const newRecipe = await createNewRecipe(name, image, dishTypes, dishSummary, healthScore, stepByStep, diets);
        res.send("Recipe created successfully!");
    } catch (error) {
        res.status(404).send(error.message)
    }
});

/*

    // RECIBE los datos recolectados desde el formulario
    const { 
        name, 
        dishSummary, 
        healthScore, 
        stepByStep, 
        image, 
        dishTypes, 
        diets } = req.body;
    // CREA una receta en la bd relacionada con sus TIPOS de DIETAS
    try {
        const newRecipe = await createNewRecipe(name, dishSummary, healthScore, stepByStep,  image, dishTypes, diets);
        res.status(201).json({"Recipe successfully created": newRecipe});
    } catch (error) {
        res.status(400).json(error.message);
    }    
*/

module.exports = recipesRouter;