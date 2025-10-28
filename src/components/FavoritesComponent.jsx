import {useEffect} from "react";
import useFavorites from "../hooks/useFavorites";
import { useNavigationContext } from "../contexts/NavigationContext";
import { useRecipesContext } from "../contexts/RecipesContext";

const FavoritesComponent = () => {
    const { favorites, fetchFavorites, isLoading } = useFavorites();
    const { handleRecipeClick } = useRecipesContext();
    const { goToSearch } = useNavigationContext();

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites])

    if (isLoading) {
        return <p className="text-center mt-10">Loading favorites...</p>
    }

    if (!favorites || favorites.length === 0) {
        return (
            <div className="text-center mt-10">
                <p className="text-gray-500 text-lg mb-6">
                    You have no favorite recipes yet.
                </p>
                <button
                    onClick={goToSearch}
                    className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition duration-200 shadow-md"
                >
                    Go back to search
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 mt-4">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">
                My Favorite Recipes ({favorites.length})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {favorites.map((recipe) => (
                    <div
                        key={recipe._id}
                        className="bg-white shadow-md rounded-xl p-4 cursor-pointer hover:shadow-2xl transition transform hover:scale-[1.02]"
                        onClick={() => handleRecipeClick(recipe.externalId)}
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {recipe.title}
                        </h3>
                        {recipe.imageUrl && (
                            <img
                                src={recipe.imageUrl}
                                alt={recipe.title}
                                className="rounded-lg w-full h-48 object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://placehold.co/400x300/FFA07A/FFFFFF?text=${recipe.title.replace(/\s/g, "+")}`;
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default FavoritesComponent;