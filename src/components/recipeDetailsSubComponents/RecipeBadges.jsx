import React from "react";

const RecipeBadges = ({ recipe }) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {(recipe.diets || []).map((diet, idx) => (
      <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full shadow-sm">
        {diet}
      </span>
    ))}
    {recipe.glutenFree && <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full shadow-sm">Sin Gluten</span>}
    {recipe.vegan && <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full shadow-sm">Vegana</span>}
    {recipe.vegetarian && !recipe.vegan && <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full shadow-sm">Vegetariana</span>}
  </div>
);

export default RecipeBadges;