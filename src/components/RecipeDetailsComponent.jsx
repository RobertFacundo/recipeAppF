import useFavorites from '../hooks/useFavorites';
import RecipeBadges from './recipeDetailsSubComponents/RecipeBadges';
import IngredientsList from './recipeDetailsSubComponents/IngredientLists';
import InstructionsList from './recipeDetailsSubComponents/IntructionsList';
import RecipeImage from './recipeDetailsSubComponents/RecipeImage';
import { useNavigationContext } from '../contexts/NavigationContext';
import { useRecipesContext } from '../contexts/RecipesContext';
import { useAuthContext } from '../contexts/AuthContext';

const RecipeDetailsComponent = () => {
    const { selectedRecipe } = useRecipesContext();
    const { goToResults } = useNavigationContext();
    const { handleSaveFavorite } = useFavorites();
    const { isAuthenticated } = useAuthContext();

    console.log(selectedRecipe, 'LOG DEL RECIPEDETAILS!!!');

    if (!selectedRecipe) {
        return (
            <div className="max-w-4xl mx-auto p-8 bg-red-100 text-red-800 rounded-xl mt-10 shadow-lg text-center">
                <p className="text-xl font-semibold">Could not find any recipes... go back to search</p>
                <button
                    onClick={goToResults}
                    className="mt-4 px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition duration-200"
                >
                    &larr; Keep Searching!
                </button>
            </div>
        );
    }

    const renderSummary = () => {
        return { __html: selectedRecipe.summary || <p>No summary available for this recipe...</p> };
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
                            {selectedRecipe.title}
                        </h1>


                        <RecipeBadges recipe={selectedRecipe} />

                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4 mt-8">Summary</h2>
                        <div
                            className="text-gray-600 leading-relaxed text-base prose max-w-none mb-8"
                            dangerouslySetInnerHTML={renderSummary()}
                        />
                    </div>

                    <div className="lg:col-span-1 order-1 lg:order-2 mb-6 lg:mb-0">
                        <RecipeImage
                            image={selectedRecipe.image}
                            title={selectedRecipe.title}
                            handleSaveFavorite={() => handleSaveFavorite(selectedRecipe)}
                            isAuthenticated={isAuthenticated}
                        />
                    </div>
                </div>

                <div className="lg:grid lg:grid-cols-2 lg:gap-10 mt-10">
                    <IngredientsList ingredients={selectedRecipe.extendedIngredients} />
                    <InstructionsList instructions={selectedRecipe.instructions} />
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