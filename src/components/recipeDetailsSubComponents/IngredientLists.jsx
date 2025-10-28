import React from "react";

const IngredientsList = ({ ingredients }) => (
  <div>
    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
      Ingredientes ({ingredients?.length || 0})
    </h2>
    <ul className="space-y-3 bg-gray-100 p-6 rounded-xl shadow-inner max-h-96 overflow-y-auto">
      {(ingredients || []).map((ingredient, idx) => (
        <li key={idx} className="flex items-center text-gray-700 border-b border-gray-200 pb-2 last:border-b-0">
          <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></span>
          <span className="text-base font-medium">{ingredient.original}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default IngredientsList;