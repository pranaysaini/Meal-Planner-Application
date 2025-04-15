import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Set auth token
export const setAuthToken = (token) => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token
    }
    else{

    }delete axios.defaults.headers.common['x-auth-token'];
}

// Auth API
export const registerUser = async(userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data
}

export const loginUser = async(userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData)
    return response.data
}

export const searchRecipes = async(ingredients) => {
    const response = await axios.get(`${API_URL}/recipes/search`, {
        params:{ingredients}
    })
    return response.data;
}

export const getRecipeDetails = async(id) => {
    const response = await axios.get(`${API_URL}/recipes/${id}`);
    return response.data;
}

export const saveRecipe = async (recipeData) => {
    const response = await axios.post(`${API_URL}/recipes/save`, recipeData);
    return response.data;
  };

export const unsaveRecipe = async(recipeId) => {
    const response = await axios.delete(`${API_URL}/recipes/unsave/${recipeId}`)
    return response.data;
}

// Meal Plan API
export const generateMealPlan = async(planData) => {
    const response = await axios.post(`${API_URL}/mealplan/generate`, planData);
    return response.data;
}

export const getCurrentMealPlan = async(planData) => {
    const response = await axios.get(`${API_URL}/mealplan/generate`, planData);
    return response.data; 
}

export const getCurrentUser = async () => {
    const response = await axios.get(`${API_URL}/auth/me`);
    return response.data;
}

  
  export const updateUser = async (userData) => {
    const response = await axios.put(`${API_URL}/auth/me`, userData);
    return response.data;
  };
  
  export const deleteUser = async () => {
    const response = await axios.delete(`${API_URL}/auth/me`);
    return response.data;
  };
