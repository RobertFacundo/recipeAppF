import React from "react";
import SearchComponent from './SearchComponent.jsx';
import ResultsComponent from './ResultsComponent.jsx';
import RecipeDetailsComponent from './RecipeDetailsComponent.jsx';
import LoadingScreen from './LoadingScreen.jsx';
import FavoritesComponent from './FavoritesComponent.jsx';
import { useNavigationContext } from "../contexts/NavigationContext.jsx";
import { useRecipesContext } from "../contexts/RecipesContext.jsx";


const RecipeAppView = () => {
    const { currentView } = useNavigationContext();
    const { isLoading } = useRecipesContext();


    if (isLoading) {
        return <LoadingScreen />;
    }

    switch (currentView) {
        case 'search':
            return (
                <SearchComponent />
            );
        case 'results':
            return (
                <ResultsComponent />
            );
        case 'details':
            return (
                <RecipeDetailsComponent />
            );

        case 'favorites':
            return (
                <FavoritesComponent />
            );
        default:
            return (
                <SearchComponent />
            )
    }
};

export default RecipeAppView;