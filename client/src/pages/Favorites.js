import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../utils/api';
import RecipeList from '../components/Recipe/RecipeList';

const Favorites = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);


    const fetchSavedRecipes = async () => {
      try {
        const user = await getCurrentUser();
        setSavedRecipes(user.savedRecipes || []);
      } catch (err) {
        console.error('Failed to fetch saved recipes', err);
      } finally {
        setLoading(false);
      }
    };


  useEffect(() => {
    fetchSavedRecipes();
  }, [])

  return (
    <div className="favorites">
      <h2>Your Saved Recipes</h2>
      {loading ? (
        <p>Loading your saved recipes...</p>
      ) : savedRecipes.length === 0 ? (
        <p>You haven't saved any recipes yet.</p>
      ) : (
        <RecipeList 
          recipes={savedRecipes} 
          isSavedList={true}
          onUnsave={() => fetchSavedRecipes()}
        />
      )}
    </div>
  );
};

export default Favorites;