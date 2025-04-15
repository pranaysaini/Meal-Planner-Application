import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const MealSwapDialog = ({ open, onClose, onConfirm, mealType }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Mock alternative recipes (replace with API call in real app)
  const alternatives = [
    {
      id: 1,
      title: `Alternative ${mealType} 1`,
      image: 'https://spoonacular.com/recipeImages/715538-312x231.jpg',
    },
    {
      id: 2,
      title: `Alternative ${mealType} 2`,
      image: 'https://spoonacular.com/recipeImages/716429-312x231.jpg',
    },
    {
      id: 3,
      title: `Alternative ${mealType} 3`,
      image: 'https://spoonacular.com/recipeImages/716381-312x231.jpg',
    },
  ];

  const handleSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleConfirm = () => {
    if (selectedRecipe) {
      onConfirm(selectedRecipe);
      setSelectedRecipe(null);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Swap {mealType}</DialogTitle>
      <DialogContent dividers>
        <List>
          {alternatives.map((recipe) => (
            <ListItem
              button
              key={recipe.id}
              selected={selectedRecipe?.id === recipe.id}
              onClick={() => handleSelect(recipe)}
            >
              <ListItemAvatar>
                <Avatar src={recipe.image} />
              </ListItemAvatar>
              <ListItemText primary={recipe.title} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleConfirm} 
          disabled={!selectedRecipe} 
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MealSwapDialog;
