import React from 'react';
import {
  Paper,
  Typography,
  Grid,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { format, parseISO, isToday } from 'date-fns';
import { SwapHoriz, Info, Restaurant } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  dayContainer: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    transition: 'all 0.3s ease',
  },
  todayContainer: {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.action.hover,
  },
  dayHeader: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  mealMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  mealTypeChip: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    zIndex: 1,
  },
  mealActions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2),
  },
  emptyMeal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: theme.spacing(4),
    textAlign: 'center',
    border: `1px dashed ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
}));

const MealDay = ({ 
  date, 
  meals, 
  isToday, 
  onMealClick, 
  onSwapMeal,
  onViewDetails 
}) => {
  const classes = useStyles();
  const parsedDate = parseISO(date);
  const dayName = format(parsedDate, 'EEEE');
  const formattedDate = format(parsedDate, 'MMMM do');

  const mealTypes = ['breakfast', 'lunch', 'dinner'];

  return (
    <Paper 
      className={`${classes.dayContainer} ${isToday ? classes.todayContainer : ''}`}
      elevation={isToday ? 3 : 1}
    >
      <div className={classes.dayHeader}>
        <div>
          <Typography variant="h5" component="h3">
            {dayName}
            {isToday && (
              <Chip 
                label="Today" 
                color="primary" 
                size="small" 
                style={{ marginLeft: 8 }} 
              />
            )}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {formattedDate}
          </Typography>
        </div>
      </div>

      <Grid container spacing={2}>
        {mealTypes.map((mealType) => {
          const meal = meals.find(m => m.mealType === mealType);
          
          return (
            <Grid item xs={12} sm={4} key={`${date}-${mealType}`}>
              {meal ? (
                <Card className={classes.mealCard}>
                  <Chip
                    label={mealType}
                    color="secondary"
                    size="small"
                    className={classes.mealTypeChip}
                  />
                  <CardMedia
                    className={classes.mealMedia}
                    image={meal.image || 'https://spoonacular.com/recipeImages/placeholder.png'}
                    title={meal.title}
                    onClick={() => onMealClick && onMealClick(meal.recipeId)}
                    style={{ cursor: 'pointer' }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {meal.title}
                    </Typography>
                  </CardContent>
                  <div className={classes.mealActions}>
                    <Tooltip title="Swap this meal">
                      <IconButton 
                        size="small" 
                        onClick={() => onSwapMeal && onSwapMeal(date, mealType)}
                      >
                        <SwapHoriz />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View details">
                      <IconButton 
                        size="small" 
                        onClick={() => onViewDetails && onViewDetails(meal.recipeId)}
                      >
                        <Info />
                      </IconButton>
                    </Tooltip>
                  </div>
                </Card>
              ) : (
                <Paper className={classes.emptyMeal}>
                  <Restaurant style={{ fontSize: 40, color: 'rgba(0, 0, 0, 0.12)', marginBottom: 8 }} />
                  <Typography variant="subtitle1" color="textSecondary">
                    No {mealType} planned
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    style={{ marginTop: 8 }}
                    onClick={() => onSwapMeal && onSwapMeal(date, mealType)}
                  >
                    Add Meal
                  </Button>
                </Paper>
              )}
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default MealDay;