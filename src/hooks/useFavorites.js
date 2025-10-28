import React, { useCallback, useState } from "react";
import useAsyncStatus from "./useAsyncStatus";
import { saveFavorite, getFavsRecipes } from "../services/apiServices";
import { useNavigationContext } from "../contexts/NavigationContext";
import { useAuthContext } from "../contexts/AuthContext";


const useFavorites = () => {
    const { isAuthenticated } = useAuthContext();
    const { goToFavorites } = useNavigationContext();
    const { setError, error, isLoading, setLoading } = useAsyncStatus()
    const [favorites, setFavorites] = useState([]);

    const handleSaveFavorite = useCallback(async (recipe) => {
        if (!isAuthenticated) {
            setError('You should login to save a recipe');
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const payload = {
                externalId: recipe.id || recipe.externalId,
                title: recipe.title,
                imageUrl: recipe.image
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
            setLoading(false);
        }
    }, [isAuthenticated]);

    const fetchFavorites = useCallback(async () => {
        if (!isAuthenticated) return;

        setLoading(true);
        setError(null);

        try {
            const data = await getFavsRecipes();
            console.log(data, 'LOG DEL FETCHFAVORITES!!!')

            setFavorites(data.recipes || data);
            goToFavorites();
        } catch (error) {
            console.error('Error fetching favorites', error);
            setError('Could not load favorites');
        } finally {
            setLoading(false)
        }
    }, [isAuthenticated])

    return {
        handleSaveFavorite,
        favorites,
        fetchFavorites,
        error,
        isLoading
    }
};

export default useFavorites;