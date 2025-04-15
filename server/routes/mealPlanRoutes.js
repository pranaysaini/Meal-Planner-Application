const express = require('express')
const router = express.Router();
const mealPlanController = require('../controllers/mealPlanController')
const auth = require('../middleware/auth')

router.post('/generate', auth, mealPlanController.generateMealPlan)
router.get('/current', auth, mealPlanController.getCurrentMealPlan )

module.exports = router;