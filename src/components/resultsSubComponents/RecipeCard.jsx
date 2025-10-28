import React from "react";
import { useRecipesContext } from "../../contexts/RecipesContext";

const RecipeCard = ({ recipe }) => {
    const { handleRecipeClick } = useRecipesContext();

    return (
        <div
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
            onClick={() => handleRecipeClick(recipe.id)}
        >
            {/* Imagen Placeholder */}
            <div className="h-48 w-full overflow-hidden bg-gray-100">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition duration-300 hover:scale-105"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/600x400/FFA07A/FFFFFF?text=Recipe`;
                    }}
                />
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h4 className="text-xl font-bold text-gray-800 mb-2 leading-tight flex-grow">
                    {recipe.title}
                </h4>

                <div className="flex justify-between text-sm text-gray-500 border-t pt-3 mt-auto">
                    <button
                        onClick={() => handleRecipeClick(recipe.id)}
                        className="w-full px-4 py-2 text-md font-bold text-white bg-orange-500 cursor-pointer rounded-lg hover:bg-orange-600 transition duration-200 shadow-md transform hover:scale-[1.02]"
                    >
                        View Recipe
                    </button>
                </div>
            </div>
        </div>
    )
};

export default RecipeCard;