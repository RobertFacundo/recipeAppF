import React, { useCallback, useState, useMemo } from "react";
import useAsyncStatus from "./useAsyncStatus";


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

const useIngredients = ()=>{
    const {error, setError} = useAsyncStatus();
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const allIngredients = useMemo(()=>[
        ...INITIAL_INGREDIENTS.Vegetales,
        ...INITIAL_INGREDIENTS.Proteinas
    ]);

    const toggleIngredient = useCallback((name)=>{
        setError(null);
        setSelectedIngredients(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
    }, [])

    return {
        error,
        selectedIngredients,
        allIngredients,
        toggleIngredient
    }
}

export default useIngredients;