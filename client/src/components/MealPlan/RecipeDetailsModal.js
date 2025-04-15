import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

const RecipeDetailsModal = ({ recipe, onClose, onSave }) => {
  return (
    <Dialog open={!!recipe} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{recipe.title}</DialogTitle>
      <DialogContent dividers>
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: 8 }} 
        />
        <Typography variant="h6" gutterBottom style={{ marginTop: '16px' }}>
          Ingredients
        </Typography>
        <List>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index}>
              <ListItemText primary={ingredient} />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" gutterBottom style={{ marginTop: '16px' }}>
          Instructions
        </Typography>
        <Typography variant="body1">
          {recipe.instructions}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSave}>Save to Favorites</Button>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeDetailsModal;
