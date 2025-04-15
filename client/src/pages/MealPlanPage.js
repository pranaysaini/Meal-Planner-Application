import React, { useState, useEffect } from 'react';
import { generateMealPlan, getCurrentMealPlan } from '../utils/api';
import MealPlan from '../components/MealPlan/MealPlan';

const MealPlanPage = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentMealPlan = async () => {
      try {
        const plan = await getCurrentMealPlan();
        setMealPlan(plan);
      } catch (err) {
        console.error('Failed to fetch meal plan', err);
      }
    };

    fetchCurrentMealPlan();
  }, []);

  const handleGeneratePlan = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const plan = await generateMealPlan({
        targetCalories: 2000,
        diet: 'balanced',
        exclude: ''
      });
      setMealPlan(plan);
    } catch (err) {
      setError('Failed to generate meal plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="meal-plan-page">
      <h2>Your Weekly Meal Plan</h2>
      
      <button 
        onClick={handleGeneratePlan}
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? 'Generating...' : 'Generate New Plan'}
      </button>
      
      {error && <p className="error">{error}</p>}
      
      {mealPlan ? (
        <MealPlan plan={mealPlan} />
      ) : (
        <p>No meal plan generated yet. Click the button above to create one!</p>
      )}
    </div>
  );
};

export default MealPlanPage;