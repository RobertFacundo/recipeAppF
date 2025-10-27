import React from "react";

const SearchComponent = ({
    allIngredients,
    selectedIngredients,
    toggleIngredient,
    handleSearch,
    error,
    isLoading
}) => {
    const renderIngredientTag = (ingredient) => {
        const isSelected = selectedIngredients.includes(ingredient.name);
        let baseClasses = 'flex items-center px-4 py-2 rounded-full cursor-pointer transition duration-200 shadow-sm text-white-800 border-2';

        if (isSelected) {
            baseClasses += ' bg-orange-500 text-white border-orange-600 hover:bg-orange-600';
        } else {
            baseClasses += ' bg-white border-orange-200 hover:bg-orange-50';
        }

        return (
            <button
                key={ingredient.name}
                className={baseClasses}
                onClick={() => toggleIngredient(ingredient.name)}
            >
                <span className="text-lg mr-2">{ingredient.emoji}</span>
                <span className="font-medium">{ingredient.name}</span>
            </button>
        );
    };

    const handleSearchClick = () => {
        handleSearch();
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b border-orange-300 pb-3">Select the ingredients that you have</h2>

            {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 border border-red-400">{error}</p>}

            <div className="flex flex-wrap gap-3 mb-6">
                {allIngredients.map(renderIngredientTag)}
            </div>

            <div className="flex justify-center items-center pt-4 border-t border-orange-300">
                <button
                    className={`px-8 py-3 text-lg font-bold rounded-lg transition duration-200 shadow-lg 
                        ${selectedIngredients.length === 0 || isLoading
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed shadow-none'
                            : 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700'
                        }`
                    }
                    onClick={handleSearchClick}
                    disabled={selectedIngredients.length === 0 || isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Searchin for recipes...
                        </span>
                    ) : (
                        'Search Recipe'
                    )}
                </button>
            </div>
        </div>
    )
};

export default SearchComponent;