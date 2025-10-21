import api from '../config/axiosConfig.js';
import axios from 'axios';

export const authToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const searchRecipes = async (ingredientsArray) => {
    try {
        const ingredientsQuery = ingredientsArray.join(',');
        const response = await api.get('/search', {
            params: {
                ingredients: ingredientsQuery
            }
        });
    } catch (error) {
        console.error('Error searching recipes:', error);
        throw error
    }
};


export const getRecipeDetails = async (recipeId) => {
    try {
        const response = await api.get(`/external/${recipeId}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener detalles de la receta ${recipeId}:`, error);
        throw error;
    }
};


export const saveFavorite = async (recipeData) => {
    try {
        const response = await api.post('/recipes', recipeData);
        return response.data;
    } catch (error) {
        console.error('Error al guardar favorito:', error);
        throw error;
    }
};

export const checkIfSaved = async (externalId) => {
    try {
        const response = await api.get(`/recipes/check/${externalId}`);
        return response.data.isSaved;
    } catch (error) {
        console.warn(`No se pudo verificar el estado de guardado para ${externalId}`);
        return false;
    }
}