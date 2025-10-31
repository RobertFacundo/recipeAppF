import React, { useCallback, useEffect, useState } from "react";
import useAsyncStatus from "./useAsyncStatus";
import { saveFavorite, getFavsRecipes, checkIfSaved } from "../services/apiServices";
import { useNavigationContext } from "../contexts/NavigationContext";
import { useAuthContext } from "../contexts/AuthContext";


const useFavorites = (recipe) => {
    const { isAuthenticated } = useAuthContext();
    const { goToFavorites } = useNavigationContext();
    const { setError, error, isLoading, setLoading } = useAsyncStatus()
    const [favorites, setFavorites] = useState([]);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchFavorites = async () => {
            setLoading(true);
            try {
                const response = await getFavsRecipes();
                const favs = response.recipes || [];
                setFavorites(favs);
            } catch (error) {
                console.error("Error fetching favorites", error);
                setError("Could not load favorites");
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [isAuthenticated]);

    // Chequear si el recipe específico ya está guardado
    useEffect(() => {
        if (!isAuthenticated || !recipe) return;

        const verifySaved = async () => {
            setLoading(true);
            try {
                const saved = await checkIfSaved(recipe.externalId || recipe.id);
                setIsSaved(saved);
            } catch (error) {
                console.warn("Could not check if saved", error);
                setIsSaved(false);
            } finally {
                setLoading(false);
            }
        };

        verifySaved();
    }, [isAuthenticated, recipe]);

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
            setIsSaved(true)
            console.log(result.message || 'Recipe saved');
        } catch (error) {
            const status = error.response?.status;
            if (status === 409) {
                // Ya estaba guardada
                setIsSaved(true);
                setError('This recipe is already in your favorites.');
            } else if (status === 401) {
                setError('Your session expired or you do not have permissions. Please log in again.');
            } else {
                setError('Server error');
            }

            console.error("Error saving favorite:", error);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, isSaved]);

    return {
        handleSaveFavorite,
        favorites,
        error,
        goToFavorites,
        isLoading,
        isSaved
    }
};

export default useFavorites;