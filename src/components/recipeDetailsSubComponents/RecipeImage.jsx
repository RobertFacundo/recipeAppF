import React from "react";

const RecipeImage = ({ image, title, handleSaveFavorite, isAuthenticated, isSaved, error }) => (
    <div>
        <img
            src={image}
            alt={title}
            className="w-full h-auto max-h-96 object-cover rounded-xl shadow-xl border-4 border-white"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/800x600/FFA07A/FFFFFF?text=${title.replace(/\s/g, '+')}`;
            }}
        />

        {isAuthenticated && handleSaveFavorite && (
            <>
                <button
                    onClick={handleSaveFavorite}
                    disabled={isSaved}
                    className={`ml-4 mt-4 inline-flex items-center px-4 py-2 text-md font-semibold rounded-full text-white 
                        ${isSaved ? 'bg-orange-400 cursor-default' : 'bg-orange-600 hover:bg-orange-700'} 
                        transition duration-200 shadow-lg`}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {isSaved ? 'Saved' : 'Save to Favorites'}
                </button>
                {error && (
                    <p className="ml-4 mt-2 text-sm text-red-600 font-medium bg-red-50 px-3 py-2 rounded-lg shadow-sm">
                        {error}
                    </p>
                )}
            </>

        )}
    </div>
);

export default RecipeImage;