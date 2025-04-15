import React from 'react';
import RecipeCard from './RecipeCard';
import { Grid } from '@material-ui/core';

const RecipeList = ({ recipes, isSavedList, onUnsave }) => {
  return (
    <Grid container spacing={3}>
      {recipes.map((recipe) => (
        <Grid item xs={12} sm={6} md={4} key={recipe.recipeId || recipe.id}>
          <RecipeCard 
            recipe={recipe} 
            isSaved={isSavedList}
            onUnsave={onUnsave}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default {RecipeList}

