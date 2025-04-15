const axios = require('axios');
const User = require('../models/User');

exports.generateMealPlan = async (req, res) => {

    try{
        const {targetCalories, diet, exclude} = req.body;
        const user = await User.findById(req.userId);

        // Call Spoonacular's Meal Planner API
        const response = await axios.get(
            'https://api.spoonacular.com/mealplanner/generate',
            {
                params: {
                    timeFrame: 'week',
                    targetCalories: targetCalories || 2000,
                    exclude: exclude || '',
                    apiKey: process.env.SPOONACULAR_API_KEY
                }
            }
        );

        // Format the plan with additional metadata
        const realPlan = {
            weekStart: new Date(),
            spoonacularId: response.data.id,
            days: response.data.week
        }

        // Save to user's mealPlans array (newest first)
        user.mealPlans.unshift(realPlan);
        await user.save()

    }
    catch(err){
        console.error('Spoonacular API Error:', err.message);
        
        // Handle Spoonacular API errors specifically

        // For response error
        if (err.response) {
            return res.status(err.response.status).json({
              error: 'Spoonacular API failed',
              details: err.response.data
            });
          }
          
          /// For Server error
          res.status(500).send('Server error');
    }
}


// To get current meal plan
exports.getCurrentMealPlan = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      
      // Return null if no plans exist
      if (!user.mealPlans || user.mealPlans.length === 0) {
        return res.json(null); 
      }
      
      // Return the newest plan (first in array)
      res.json(user.mealPlans[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


