import React from "react";

const FavoritesComponent = ({ recipes, handleRecipeClick }) => {
    if (!recipes || recipes.length === 0) {
        return <p className="text-center mt-8 text-gray-500">You have no favorite recipes yet.</p>;
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {recipes.map((recipe) => (
                <div
                    key={recipe._id}
                    className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
                    onClick={() => handleRecipeClick(recipe.externalId)}
                >
                    <h3 className="text-lg font-semibold">{recipe.title}</h3>
                    {recipe.imageUrl && (
                        <img src={recipe.imageUrl} alt={recipe.title} className="mt-2 rounded-md w-full h-40 object-cover" />
                    )}
                </div>
            ))}
        </div>
    )
};

export default FavoritesComponent;