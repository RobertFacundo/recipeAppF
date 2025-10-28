import React from "react";

const IngredientTag = ({ ingredient, isSelected, toggleIngredient }) => {
    let baseClasses = 'flex items-center px-4 py-2 rounded-full cursor-pointer transition duration-200 shadow-sm text-white-800 border-2';

    if (isSelected) {
        baseClasses += ' bg-orange-500 text-white border-orange-600 hover:bg-orange-600';
    } else {
        baseClasses += ' bg-white border-orange-200 hover:bg-orange-50';
    }

    return (
        <button
            className={baseClasses}
            onClick={() => toggleIngredient(ingredient.name)}
        >
            <span className="text-lg mr-2">{ingredient.emoji}</span>
            <span className="font-medium">{ingredient.name}</span>
        </button>
    );
}

export default IngredientTag;