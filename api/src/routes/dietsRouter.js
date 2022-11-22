const { Router } = require('express');
const { addBasicsDiets } = require('../controllers/controllers');
const { Diet, recipes_diets } = require('../db');;
const dietsRouter = Router();
// requerir controllers

// GET

dietsRouter.get('/', async (req, res) => {
    let allDiets = await Diet.findAll();
    try {
        if (!allDiets[0]) await addBasicsDiets();
        allDiets = await Diet.findAll();
        return res.status(200).json(allDiets);
    } catch (error) {
        res.status(400).json(error.message);
    }   
});

module.exports = dietsRouter;