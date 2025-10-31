import api from '../config/axiosConfig.js';

export const authToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/signup', userData);
        console.log(response, 'LOG DEL REGISTERUSER!!!!')
        return response.data;
    } catch (error) {
        console.error('Error registerin user', error.response?.data?.message || error.message);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        console.log(response, 'LOG DEL LOGIN USER!!!')
        return response.data;
    } catch (error) {
        console.error('Error while login', error);
        throw error;
    }
}

export const searchRecipes = async (ingredientsArray) => {
    try {
        const ingredientsQuery = ingredientsArray.join(',');
        const response = await api.get('/search', {
            params: {
                ingredients: ingredientsQuery
            }
        });

        return response.data
    } catch (error) {
        if (error.response?.data) {
            throw new Error(`${error.response.data.message}: ${error.response.data.details || ''}`);
        }
        throw error;
    }
};


export const getRecipeDetails = async (recipeId) => {
    try {
        const response = await api.get(`/external/${recipeId}`);
        console.log(response, 'LOG DEL RECIPEDEATILS!!')
        return response.data;
    } catch (error) {
        console.error(`Error al obtener detalles de la receta ${recipeId}:`, error);
        throw error;
    }
};


export const saveFavorite = async (recipeData) => {
    try {
        const response = await api.post('/recipes', recipeData);
        console.log(response, 'LOG DEL SAVE FAVORITE')
        return response.data;
    } catch (error) {
        console.error('Error al guardar favorito:', error);
        throw error;
    }
};

export const getFavsRecipes = async () => {
    try {
        const response = await api.get('/recipes');
        console.log(response, 'LOG DEL FAVS RECIPES');
        return response.data
    } catch (error) {
        console.error('Error gettin favs recipes', error);
        throw error;

    }
}

export const checkIfSaved = async (externalId) => {
    try {
        const response = await api.get(`/recipes/check/${externalId}`);
        return response.data.isSaved;
    } catch (error) {
        console.warn(`No se pudo verificar el estado de guardado para ${externalId}`);
        return false;
    }
}