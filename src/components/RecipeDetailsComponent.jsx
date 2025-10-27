import React from 'react';

const RecipeDetailsComponent = ({ recipe, goToResults, handleSaveFavorite, isAuthenticated }) => {
    if (!recipe) {
        return (
            <div className="max-w-4xl mx-auto p-8 bg-red-100 text-red-800 rounded-xl mt-10 shadow-lg text-center">
                <p className="text-xl font-semibold">Could not find any recipes... go back to search</p>
                <button
                    onClick={goToResults}
                    className="mt-4 px-6 py-2 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition duration-200"
                >
                    &larr; Keep Searching!
                </button>
            </div>
        );
    }

    const renderSummary = () => {
        return { __html: recipe.summary || <p>No summary available for this recipe...</p> };
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 bg-gray-50 min-h-screen">

            <button
                onClick={goToResults}
                className="inline-flex items-center px-4 py-2 text-md font-semibold rounded-full text-white bg-orange-500 hover:bg-orange-600 transition duration-200 shadow-lg mb-6"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Back to results
            </button>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-6 lg:p-10">

                <div className="lg:grid lg:grid-cols-3 lg:gap-10">

                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                            {recipe.title}
                        </h1>


                        <div className="flex flex-wrap gap-2 mb-6">
                            {(recipe.diets || []).map((diet, index) => (
                                <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full shadow-sm">
                                    {diet}
                                </span>
                            ))}
                            {recipe.glutenFree && <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full shadow-sm">Sin Gluten</span>}
                            {recipe.vegan && <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full shadow-sm">Vegana</span>}
                            {recipe.vegetarian && !recipe.vegan && <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full shadow-sm">Vegetariana</span>}
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4 mt-8">Summary</h2>
                        <div
                            className="text-gray-600 leading-relaxed text-base prose max-w-none mb-8"
                            dangerouslySetInnerHTML={renderSummary()}
                        />
                    </div>

                    <div className="lg:col-span-1 order-1 lg:order-2 mb-6 lg:mb-0">
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-auto max-h-96 object-cover rounded-xl shadow-xl border-4 border-white"
                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/800x600/FFA07A/FFFFFF?text=${recipe.title.replace(/\s/g, '+')}` }}
                        />

                         {isAuthenticated && (
                            <button
                                onClick={() => handleSaveFavorite(recipe)}
                                className="ml-4 mt-4 inline-flex items-center px-4 py-2 text-md font-semibold rounded-full text-white bg-orange-600 cursor-pointer hover:bg-orange-700 transition duration-200 shadow-lg"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Save to Favorites
                            </button>
                        )}
                    </div>
                </div>

                <div className="lg:grid lg:grid-cols-2 lg:gap-10 mt-10">

                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                            Ingredientes ({recipe.extendedIngredients?.length || 0})
                        </h2>
                        <ul className="space-y-3 bg-gray-100 p-6 rounded-xl shadow-inner max-h-96 overflow-y-auto">
                            {(recipe.extendedIngredients || []).map((ingredient, index) => (
                                <li key={index} className="flex items-center text-gray-700 border-b border-gray-200 pb-2 last:border-b-0">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></span>
                                    <span className="text-base font-medium">{ingredient.original}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-8 lg:mt-0">Instructions</h2>
                        <div className="text-gray-700 space-y-4 bg-gray-100 p-6 rounded-xl shadow-inner max-h-96 overflow-y-auto">
                            {recipe.instructions ? (
                                recipe.instructions.split('\n').map((step, index) => (
                                    step.trim() ? (
                                        <p key={index} className="flex items-start">
                                            <span className="text-lg font-bold text-orange-600 mr-3 flex-shrink-0">{index + 1}.</span>
                                            <span>{step.trim()}</span>
                                        </p>
                                    ) : null
                                ))
                            ) : (
                                <p className="text-gray-500 italic">Intructions for this recipe are not available...</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-10 mb-20 text-center">
                <button
                    onClick={goToResults}
                    className="inline-flex items-center px-8 py-3 text-lg font-bold rounded-full text-white bg-orange-500 hover:bg-orange-600 transition duration-200 shadow-xl transform hover:scale-[1.02]"
                >
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Back to Recipe List
                </button>
            </div>

        </div>
    )
}

export default RecipeDetailsComponent;