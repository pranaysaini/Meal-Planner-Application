import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import { AuthContext } from '../context/AuthContext';

const Home = () => {

    const {isAuthenticated} = useAuth();

    return (
        <div className='home'>
            <h1>Welcome to Recipe Finder + Meal Planner</h1>
            <p>Discover recipes based on ingredients you have and plan your meals for the week!</p>

            {!isAuthenticated ? (
                <div className='authButtons'>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            ):(
                <div className='app-features'>
                    <Link to="/search">Search Recipes</Link>
                    <Link to="/mealPlan">Generate Meal Plan</Link>
                </div>

            )}
        </div>
    )
}
export default Home