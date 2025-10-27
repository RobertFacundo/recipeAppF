import React from "react";
import SearchComponent from './SearchComponent.jsx';
import ResultsComponent from './ResultsComponent.jsx';
import RecipeDetailsComponent from './RecipeDetailsComponent.jsx';
import LoadingScreen from './LoadingScreen.jsx';
import FavoritesComponent from './FavoritesComponent.jsx';


const RecipeAppView = (props) => {
    const {
        currentView,
        isLoading,
        recipes,
        selectedRecipe,
        error,
        allIngredients
    } = props;


    if (isLoading) {
        return <LoadingScreen />;
    }

    switch (currentView) {
        case 'search':
            return (
                <SearchComponent
                    allIngredients={allIngredients}
                    selectedIngredients={props.selectedIngredients}
                    toggleIngredient={props.toggleIngredient}
                    handleSearch={props.handleSearch}
                    error={error}
                    isLoading={isLoading}
                />
            );
        case 'results':
            return (
                <ResultsComponent
                    recipes={recipes}
                    handleRecipeClick={props.handleRecipeClick}
                    goToSearch={props.goToSearch}
                />
            );
        case 'details':
            return (
                <RecipeDetailsComponent
                    recipe={selectedRecipe}
                    handleSaveFavorite={props.handleSaveFavorite}
                    goToResults={props.goToResults}
                    checkIfSaved={props.checkIfSaved}
                    isAuthenticated={props.isAuthenticated}
                />
            );

        case 'favorites':
            return (
                <FavoritesComponent
                    recipes={props.favorites}
                    handleRecipeClick={props.handleRecipeClick}
                />
            );
        default:
            return (
                <SearchComponent
                    allIngredients={allIngredients}
                    selectedIngredients={props.selectedIngredients}
                    toggleIngredient={props.toggleIngredient}
                    handleSearch={props.handleSearch}
                    error={error}
                    isLoading={isLoading}
                />
            )
    }
};

export default RecipeAppView;