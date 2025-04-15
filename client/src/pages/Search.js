import React, { useState, useEffect } from 'react';
import { searchRecipes } from '../utils/api';
import {IngredientInput} from '../components/Search/IngredientInput';
import {SearchResults} from '../components/Search/SearchResults';

const Search = () => {
    const [ingredients, setIngredients] = useState([]);
    const [recipes, setRecipies] = useState([]);
    const[loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if(ingredients.length === 0) return;

        setLoading(true)
        setError(null)

        try{
            const results = await searchRecipes(ingredients.join(','));
            setRecipies(results);
        }
        catch(err){
            setError('Failed to fetch recipes. Please try again.');
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className="search-page">
             <h2>Search Recipes by Ingredients</h2>

            <IngredientInput ingredients={ingredients} setIngredients={setIngredients} onSearch={handleSearch} />

            {loading && <p>Loading recipes...</p>}
            {error && <p className="error">{error}</p>}
            
            <SearchResults recipes={recipes} />
            
        </div>
    )
}
export default {Search}