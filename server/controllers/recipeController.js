const axios = require('axios');
const User = require('../models/User');

// Search all Recipes by ingredients
exports.searchByIngredients = async (req, res) => {
    try{
        const {ingredients} = req.query;
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/findByIngredients`,

            {
                params: {
                    ingredients: ingredients,
                    number: 10,
                    apiKey:  process.env.SPOONACULAR_API_KEY
                }
            }
        );
        res.json(response.data);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Get Repipe Details of any one repipe
exports.getRepipeDetails = async (req, res) => {
    try{
        const {id} = req.params;
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information`,
            {
                params:{
                    includeNutrition: false,
                    apikey:  process.env.SPOONACULAR_API_KEY
                }
            }
        );
        res.json(response.data);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

//Save recipe to favourite
exports.saveRecipe = async(req, res) => {
    try{
        const {recipeId, title, image} = req.body;
        const user = await User.findById(req.userId)

        if(user.savedRecipes.some(recipe => recipe.recipeId === recipeId)){
            return res.status(400).json({msg: "Recipe Already Saved"})
        }

        user.savedRecipes.unshift({recipeId, title, image})
        await user.save()

        res.json(user.savedRecipes);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

//Remove Recipies from favourites
exports.unsaveRecipe = async(req, res) => {
    try{
        const {recipeId} = req.params;
        const user = await User.findById(req.userId)

        // Get remove from index
        const removeIndex = user.savedRecipes.
                            map(recipe => recipeId).
                            indexOf(recipeId);
        
        if(removeIndex == -1){
            return res.status(400).json({msg: 'Recipe Not Found'});
        }

        user.savedRecipes.splice(removeIndex, 1);
        await user.save();
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
};