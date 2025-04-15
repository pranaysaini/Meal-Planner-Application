import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import MealDay from './MealDay';
import MealSwapDialog from './MealSwapDialog';
import RecipeDetailsModal from './RecipeDetailsModal';

const MealPlan = ({ initialPlan }) => {
  const [plan, setPlan] = useState(initialPlan);
  const [swapDialogOpen, setSwapDialogOpen] = useState(false);
  const [currentSwapData, setCurrentSwapData] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  // Format date for display
  const formatDate = (dateString) => {
    return format(parseISO(dateString), 'MMMM do, yyyy');
  };

  // 1. Handle meal click - navigate to recipe details page
  const handleMealClick = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  // 2. Handle meal swap - open dialog with available alternatives
  const handleSwapMeal = (date, mealType) => {
    setCurrentSwapData({ date, mealType });
    setSwapDialogOpen(true);
  };

  // 3. Handle view details - show modal with recipe info
  const handleViewDetails = (recipeId) => {
    // In a real app, you would fetch full recipe details here
    const fakeRecipeDetails = {
      id: recipeId,
      title: "Sample Recipe",
      image: "https://spoonacular.com/recipeImages/12345-556x370.jpg",
      ingredients: ["Ingredient 1", "Ingredient 2"],
      instructions: "Detailed cooking instructions..."
    };
    setSelectedRecipe(fakeRecipeDetails);
  };

  // 4. Confirm meal swap
  const confirmMealSwap = (newRecipe) => {
    setPlan(prevPlan => {
      const updatedDays = prevPlan.days.map(day => {
        if (day.date.split('T')[0] === currentSwapData.date.split('T')[0]) {
          const updatedMeals = day.meals.map(meal => {
            if (meal.mealType === currentSwapData.mealType) {
              return { 
                ...meal, 
                recipeId: newRecipe.id,
                title: newRecipe.title,
                image: newRecipe.image 
              };
            }
            return meal;
          });
          return { ...day, meals: updatedMeals };
        }
        return day;
      });
      return { ...prevPlan, days: updatedDays };
    });
    setSwapDialogOpen(false);
  };

  return (
    <div className="weekly-plan">
      <h2>Meal Plan: {formatDate(plan.weekStart)}</h2>
      
      {plan.days.map(day => (
        <MealDay
          key={day.date}
          date={day.date}
          meals={day.meals}
          isToday={day.date.split('T')[0] === today}
          onMealClick={handleMealClick}
          onSwapMeal={handleSwapMeal}
          onViewDetails={handleViewDetails}
        />
      ))}

      {/* Meal Swap Dialog */}
      <MealSwapDialog
        open={swapDialogOpen}
        onClose={() => setSwapDialogOpen(false)}
        onConfirm={confirmMealSwap}
        mealType={currentSwapData?.mealType}
      />

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <RecipeDetailsModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onSave={() => {
            // Implement save to favorites if needed
          }}
        />
      )}
    </div>
  );
};

export default MealPlan;

// // import React from 'react';
// // import { 
// //   Typography, 
// //   Paper, 
// //   Grid, 
// //   Card, 
// //   CardContent, 
// //   CardMedia,
// //   Chip
// // } from '@material-ui/core';
// // import { makeStyles } from '@material-ui/core/styles';
// // import { format, parseISO, isToday } from 'date-fns';

// // const useStyles = makeStyles((theme) => ({
// //   root: {
// //     marginTop: theme.spacing(3),
// //   },
// //   dayPaper: {
// //     padding: theme.spacing(2),
// //     marginBottom: theme.spacing(2),
// //   },
// //   todayPaper: {
// //     padding: theme.spacing(2),
// //     marginBottom: theme.spacing(2),
// //     border: `2px solid ${theme.palette.primary.main}`,
// //   },
// //   mealCard: {
// //     marginBottom: theme.spacing(2),
// //     height: '100%',
// //     display: 'flex',
// //     flexDirection: 'column',
// //   },
// //   mealMedia: {
// //     height: 0,
// //     paddingTop: '56.25%', // 16:9 aspect ratio
// //   },
// //   mealTypeChip: {
// //     marginRight: theme.spacing(1),
// //     marginBottom: theme.spacing(1),
// //   },
// // }));

// // const MealPlan = ({ plan }) => {
// //   const classes = useStyles();

// //   return (
// //     <div className={classes.root}>
// //       <Typography variant="h4" gutterBottom>
// //         Meal Plan for Week of {format(parseISO(plan.weekStart), 'MMMM do, yyyy')}
// //       </Typography>
      
// //       {plan.days.map((day) => {
// //         const date = parseISO(day.date);
// //         const isCurrentDay = isToday(date);
        
// //         return (
// //           <Paper 
// //             key={day.date} 
// //             className={isCurrentDay ? classes.todayPaper : classes.dayPaper}
// //             elevation={isCurrentDay ? 3 : 1}
// //           >
// //             <Typography variant="h5" gutterBottom>
// //               {format(date, 'EEEE, MMMM do')}
// //               {isCurrentDay && (
// //                 <Chip 
// //                   label="Today" 
// //                   color="primary" 
// //                   size="small" 
// //                   style={{ marginLeft: 8 }} 
// //                 />
// //               )}
// //             </Typography>
            
// //             <Grid container spacing={2}>
// //               {day.meals.map((meal) => (
// //                 <Grid item xs={12} sm={6} md={4} key={`${day.date}-${meal.mealType}`}>
// //                   <Card className={classes.mealCard}>
// //                     <CardMedia
// //                       className={classes.mealMedia}
// //                       image={meal.image || 'https://spoonacular.com/recipeImages/placeholder.png'}
// //                       title={meal.title}
// //                     />
// //                     <CardContent>
// //                       <Chip
// //                         label={meal.mealType}
// //                         color="secondary"
// //                         size="small"
// //                         className={classes.mealTypeChip}
// //                       />
// //                       <Typography variant="h6" component="h3">
// //                         {meal.title}
// //                       </Typography>
// //                     </CardContent>
// //                   </Card>
// //                 </Grid>
// //               ))}
// //             </Grid>
// //           </Paper>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // export default MealPlan;