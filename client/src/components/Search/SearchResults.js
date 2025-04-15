import React from 'react';
import RecipeList from '../Recipe/RecipeList';

export const SearchResults = ({ recipes }) => {
  return (
    <div className="search-results">
      {recipes.length === 0 ? (
        <p>No recipes found. Try adding more ingredients.</p>
      ) : (
        <RecipeList recipes={recipes} />
      )}
    </div>
  );
};