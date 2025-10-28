import React from "react";
import RecipeCard from "./resultsSubComponents/RecipeCard";
import { useRecipesContext } from "../contexts/RecipesContext";
import { useNavigationContext } from "../contexts/NavigationContext";

const ResultsComponent = () => {
    const { goToSearch } = useNavigationContext();
    const {recipes} = useRecipesContext()

    if (!recipes || recipes.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-10 mb-10 text-center">
                <h3 className="text-3xl font-extrabold text-orange-900 tracking-tight mb-4">
                    ¡Ups! 😔 We could not find any recipe.
                </h3>
                <p className="text-gray-600 mb-6">
                    Try selecting a different combination of ingredients.
                </p>
                <button
                    onClick={goToSearch}
                    className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition duration-200 shadow-md"
                >
                    Go back to search...
                </button>
            </div>
        );
    }


    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 mt-4">

            {/* Encabezado */}
            <div className="flex justify-between items-center mb-6 border-b border-orange-300 pb-3">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Found recipes ({recipes.length})
                </h2>
                <button
                    onClick={goToSearch}
                    className="px-4 py-2 text-sm font-semibold rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-200 shadow-sm"
                >
                    &larr; New Search
                </button>
            </div>

            {/* Grid de Tarjetas de Recetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    )
};

export default ResultsComponent;