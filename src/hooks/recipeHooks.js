import React, { useCallback, useState, useMemo, useEffect } from "react"
import { getRecipeDetails, loginUser, registerUser, saveFavorite, searchRecipes, getFavsRecipes, authToken } from "../services/apiServices";

const INITIAL_INGREDIENTS = {
    Vegetales: [
        { name: 'Onion', emoji: '🧅', spanish: 'Cebolla' },
        { name: 'Tomato', emoji: '🍅', spanish: 'Tomate' },
        { name: 'Potato', emoji: '🥔', spanish: 'Patata' },
        { name: 'Carrot', emoji: '🥕', spanish: 'Zanahoria' },
        { name: 'Broccoli', emoji: '🥦', spanish: 'Brócoli' },
        { name: 'Garlic', emoji: '🧄', spanish: 'Ajo' },
        { name: 'Bell Pepper', emoji: '🫑', spanish: 'Pimiento' },
        { name: 'Spinach', emoji: '🥬', spanish: 'Espinaca' },
        { name: 'Mushroom', emoji: '🍄', spanish: 'Champiñón' },
        { name: 'Zucchini', emoji: '🥒', spanish: 'Calabacín' },
        { name: 'Corn', emoji: '🌽', spanish: 'Maíz' },
        { name: 'Avocado', emoji: '🥑', spanish: 'Aguacate' },
        { name: 'Cucumber', emoji: '🥒', spanish: 'Pepino' },
        { name: 'Lemon', emoji: '🍋', spanish: 'Limón' },
    ],
    Proteinas: [
        { name: 'Chicken', emoji: '🐔', spanish: 'Pollo' },
        { name: 'Beef', emoji: '🥩', spanish: 'Carne de Res' },
        { name: 'Fish', emoji: '🐟', spanish: 'Pescado' },
        { name: 'Egg', emoji: '🥚', spanish: 'Huevo' },
        { name: 'Pork', emoji: '🐖', spanish: 'Cerdo' },
        { name: 'Shrimp', emoji: '🦐', spanish: 'Camarón' },
        { name: 'Tofu', emoji: '⬜', spanish: 'Tofu' },
        { name: 'Sausage', emoji: '🌭', spanish: 'Salchicha' },
        { name: 'Lentils', emoji: '🥣', spanish: 'Lentejas' },
        { name: 'Milk', emoji: '🥛', spanish: 'Leche' },
        { name: 'Cheese', emoji: '🧀', spanish: 'Queso' },
        { name: 'Butter', emoji: '🧈', spanish: 'Mantequilla' },
        { name: 'Yogurt', emoji: '🍦', spanish: 'Yogur' },
        { name: 'Cream', emoji: '🍶', spanish: 'Crema' },
        { name: 'Oil', emoji: '🏺', spanish: 'Aceite' },
        { name: 'Feta', emoji: '⚪', spanish: 'Queso Feta' },
        { name: 'Rice', emoji: '🍚', spanish: 'Arroz' },
        { name: 'Pasta', emoji: '🍝', spanish: 'Pasta' },
        { name: 'Bread', emoji: '🍞', spanish: 'Pan' },
        { name: 'Flour', emoji: '🌾', spanish: 'Harina' },
        { name: 'Potatoes', emoji: '🥔', spanish: 'Papas' },
        { name: 'Quinoa', emoji: '🌾', spanish: 'Quinua' },
    ],

};

const useRecipeSearch = () => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [currentView, setCurrentView] = useState('search');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [favorites, setFavorites] = useState([]);

    const allIngredients = useMemo(() => [
        ...INITIAL_INGREDIENTS.Vegetales,
        ...INITIAL_INGREDIENTS.Proteinas,
    ], []);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            authToken(token);        // setea el header Authorization en Axios
            setIsAuthenticated(true); // mantiene el estado de autenticación
        }
    }, []);

    const toggleIngredient = useCallback((name) => {
        setError(null);
        setSelectedIngredients(prev =>
            prev.includes(name)
                ? prev.filter(n => n !== name)
                : [...prev, name]
        );
    }, []);

    const goToSearch = useCallback(() => {
        setCurrentView('search');
        setRecipes([]);
        setSelectedIngredients([]);
        setSelectedRecipe(null);
        setError(null);
    }, []);

    const goToResults = useCallback(() => {
        setCurrentView('results');
        setSelectedRecipe(null);
        setError(null);
    }, []);

    const goToFavorites = useCallback(() => {
        setCurrentView('favorites');
        setSelectedRecipe(null);
        setError(null)
    }, [])

    const handleRecipeClick = useCallback(async (recipeId) => {
        setError(null);
        setIsLoading(true);
        setCurrentView('loading');

        try {
            const details = await getRecipeDetails(recipeId);
            setSelectedRecipe(details);
            setCurrentView('details');
        } catch (error) {
            console.error('Error obtaining details', error);
            setError('Details could not be loaded');
            setCurrentView('results');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSaveFavorite = useCallback(async (recipe) => {
        if (!isAuthenticated) {
            setError('You should login to save a recipe');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const payload = {
                externalId: recipe.id || recipe.externalId, // depende de cómo venga del API
                title: recipe.title,
                imageUrl: recipe.image // opcional si tu backend lo guarda
            };

            const result = await saveFavorite(payload);
            console.log(result.message || 'Recipe saved');
        } catch (error) {
            const status = error.response?.status;
            if (status === 401) {
                setError('Your sesion expired or you do not have permissions, Please log in again');
            } else {
                setError('Server error')
            }
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated]);

    const handleSearch = useCallback(async () => {
        if (selectedIngredients.length === 0) {
            setError('Please, select at least one ingredient');
            return;
        }
        setError(null);
        setIsLoading(true);
        try {
            const data = await searchRecipes(selectedIngredients);
            setRecipes(data.recipes || data);
            setCurrentView('results');
        } catch (error) {
            console.error('Error searching for recipes:', error);
            setError('We could notconnect to the api server');
            setRecipes([]);
            setCurrentView('search');
        } finally {
            setIsLoading(false);
        }
    }, [selectedIngredients]);

    const handleLogin = useCallback(async ({ email, password }) => {
        setIsLoading(true);
        setError(null);

        try {
            const userData = await loginUser({ email, password });
            const token = userData.token;

            localStorage.setItem('authToken', token);
            authToken(token);

            setIsAuthenticated(true);
            console.log('Login successfull')
        } catch (error) {
            const status = error.response?.status;
            console.error('Login Failed', error.response?.data || error);

            if (status === 401) {
                setError('Invalid credentials')
            } else {
                setError('A server errro ocurred')
            }

            localStorage.removeItem('authToken');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleRegister = useCallback(async ({ name, email, password }) => {
        setIsLoading(true);
        setError(null);

        try {
            const userData = await registerUser({ name, email, password });
            const token = userData.token;

            localStorage.setItem('authToken', token);
            authToken(token);
            setIsAuthenticated(true);

            console.log('Registration successful and logged in.');
            return true;
        } catch (error) {
            const status = error.response?.status;
            const errorMessage = error.response?.data?.message || 'Server error during registration.';
            console.error('Registration failed:', errorMessage, error);

            if (status === 400) {
                setError(errorMessage);
            } else {
                setError('A server error ocurred during registrarion');
            }

            localStorage.removeItem('authToken');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [])

    const handleLogout = useCallback(() => {
        localStorage.removeItem('authToken');
        authToken(null); // <- opcional, limpia el header
        setIsAuthenticated(false);
        setSelectedRecipe(null);
        setError(null);
        console.log('User logged out');
    }, []);

    const fetchFavorites = useCallback(async () => {
        if (!isAuthenticated) return;

        setIsLoading(true);
        setError(null);

        try {
            const data = await getFavsRecipes();
            setFavorites(data.recipes || data);
            setCurrentView('favorites');
        } catch (error) {
            console.error('Error fetching favorites', error);
            setError('Could not load favorites');
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated])


    return {
        allIngredients,
        selectedIngredients,
        recipes,
        selectedRecipe,
        currentView,
        isLoading,
        error,
        isAuthenticated,
        toggleIngredient,
        handleSearch,
        handleLogin,
        handleRegister,
        handleLogout,
        goToSearch,
        goToResults,
        handleRecipeClick,
        handleSaveFavorite,
        fetchFavorites,
        favorites
    };
}

export default useRecipeSearch;