import { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [currentView, setCurrentView] = useState('search');

    const goToResults = () => setCurrentView('results');
    const goToSearch = () => setCurrentView('search');
    const goToDetails = () => setCurrentView('details');
    const goToFavorites = () => setCurrentView('favorites');

    return (
        <NavigationContext.Provider value={{ currentView, goToResults, goToSearch, goToDetails, goToFavorites }}>
            {children}
        </NavigationContext.Provider>
    )
};

export const useNavigationContext = () => useContext(NavigationContext);