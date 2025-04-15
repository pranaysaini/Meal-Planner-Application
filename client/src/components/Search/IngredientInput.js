import React, { useState } from 'react';
import { TextField, Button, Chip, Box } from '@material-ui/core';
import { Add, Search as SearchIcon } from '@material-ui/icons';

export const IngredientInput = ({ ingredients, setIngredients, onSearch }) => {

    const [input, setInput] = useState('');

    const handleAddIngredient = () => {
        if(input.trim() && !ingredients.include(input.trim().toLowerCase())){
            setIngredients([...ingredients, input.trim().toLowerCase()])
            setInput('');
        }
    }

    const handleRemoveIngredient = (ingredientToRemove) => {
        setIngredients(ingredients.filter(ing => ing !== ingredientToRemove));
      };
    
    const handleKeyPress = (e) => {
       if (e.key === 'Enter') {
            handleAddIngredient();
        }
    };

    return (
        <div>
            <Box mb={3}>
                <Box display="flex" alignItems="center" mb={2}>
                    <TextField
                    label="Add an ingredient"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    fullWidth
                    variant="outlined"
                    />
                    <Button
                    color="primary"
                    onClick={handleAddIngredient}
                    startIcon={<Add />}
                    style={{ marginLeft: '8px' }}
                    >
                    Add
                    </Button>
                </Box>
                
                <Box mb={2}>
                    {ingredients.map((ingredient, index) => (
                    <Chip
                        key={index}
                        label={ingredient}
                        onDelete={() => handleRemoveIngredient(ingredient)}
                        style={{ margin: '4px' }}
                    />
                    ))}
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSearch}
                    startIcon={<SearchIcon />}
                    disabled={ingredients.length === 0}
                >
                    Search Recipes
                </Button>
            </Box>
            
            


        </div>
    )


}