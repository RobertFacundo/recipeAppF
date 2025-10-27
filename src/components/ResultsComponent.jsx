import React from "react";

const ResultsComponent = ({ recipes, handleRecipeClick, goToSearch }) => {
    if (!recipes || recipes.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-10 mb-10 text-center">
                <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
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

    const RecipeCard = ({ recipe }) => {
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
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/FFA07A/FFFFFF?text=Recipe` }}
                    />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    {/* Título */}
                    <h4 className="text-xl font-bold text-gray-800 mb-2 leading-tight flex-grow">
                        {recipe.title}
                    </h4>

                    {/* button to go to that recipe detail */}
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
        );
    };

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