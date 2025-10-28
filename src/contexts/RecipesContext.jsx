import { createContext, useContext, useState } from "react";
import { getRecipeDetails, searchRecipes } from "../services/apiServices";
import useIngredients from "../hooks/useIngredients";
import { useNavigationContext } from './NavigationContext'

const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
    const { goToResults, goToDetails } = useNavigationContext()
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (selectedIngredients) => {
        console.log(selectedIngredients, 'log del handleSEARCCHHHH!!')
        if (!selectedIngredients || selectedIngredients.length === 0) {
            setError("Please select at least one ingredient");
            return;
        }

        setError(null);
        setIsLoading(true);

        goToResults();
        try {
            const data = await searchRecipes(selectedIngredients);
            setRecipes(data.recipes || data);
        } catch (err) {
            console.error(err);
            setError("Could not connect to the API server");
            setRecipes([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRecipeClick = async (recipeId) => {
        setError(null);
        setIsLoading(true);
        try {
            const details = await getRecipeDetails(recipeId);
            setSelectedRecipe(details);

            goToDetails();
        } catch (err) {
            console.error(err);
            setError("Could not load recipe details");
            setSelectedRecipe(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <RecipesContext.Provider
            value={{
                recipes,
                selectedRecipe,
                error,
                isLoading,
                handleSearch,
                handleRecipeClick,
                setRecipes,
                setSelectedRecipe,
            }}
        >
            {children}
        </RecipesContext.Provider>
    );
};

export const useRecipesContext = () => useContext(RecipesContext);