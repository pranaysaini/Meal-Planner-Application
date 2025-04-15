import React, { useState } from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button,
  IconButton,
  Collapse
} from '@material-ui/core';
import { 
  Favorite, 
  FavoriteBorder, 
  Info, 
  Close 
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { saveRecipe, unsaveRecipe } from '../../utils/api';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  expand: {
    marginLeft: 'auto',
  },
}));

const RecipeCard = ({ recipe, isSaved, onUnsave }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [isRecipeSaved, setIsRecipeSaved] = useState(isSaved);
  const [loading, setLoading] = useState(false);

  const handleSaveRecipe = async () => {
    setLoading(true);
    try {
      await saveRecipe({
        recipeId: recipe.id,
        title: recipe.title,
        image: recipe.image
      });
      setIsRecipeSaved(true);
    } catch (err) {
      console.error('Failed to save recipe', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsaveRecipe = async () => {
    setLoading(true);
    try {
      await unsaveRecipe(recipe.recipeId || recipe.id);
      setIsRecipeSaved(false);
      if (onUnsave) onUnsave();
    } catch (err) {
      console.error('Failed to unsave recipe', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={recipe.image || 'https://spoonacular.com/recipeImages/placeholder.png'}
        title={recipe.title}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h6" component="h3">
          {recipe.title}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="add to favorites"
          onClick={isRecipeSaved ? handleUnsaveRecipe : handleSaveRecipe}
          disabled={loading}
        >
          {isRecipeSaved ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
        <IconButton
          className={classes.expand}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {expanded ? <Close /> : <Info />}
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* Additional recipe details can be added here */}
          <Typography paragraph>
            Click the heart icon to {isRecipeSaved ? 'remove from' : 'add to'} your favorites.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeCard;