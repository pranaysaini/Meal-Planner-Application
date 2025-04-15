const express = require('express')
const router = express.Router();
const recipeController = require('../controllers/recipeController')
const auth = require('../middleware/auth')

router.get('/search', recipeController.searchByIngredients)

router.get('/:id', recipeController.getRepipeDetails)

router.post('/save', auth, recipeController.saveRecipe)

router.delete('/unsave/:recipeId', auth, recipeController.unsaveRecipe)

module.exports = router

