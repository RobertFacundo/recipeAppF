import './App.css'
import { useState } from 'react';
import AuthModal from './components/AuthModal.jsx';
import useRecipeSearch from './hooks/recipeHooks';
import NavHeader from './components/NavHeader.jsx';
import RecipeAppView from './components/RecipeAppView.jsx';

function App() {
  const hookProps = useRecipeSearch();

  const { isAuthenticated, handleLogin,handleRegister,fetchFavorites, handleLogout, goToSearch } = hookProps;

  const [showAuthModal, setShowAuthModal] = useState(false);

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <NavHeader
        isAuthenticated={isAuthenticated}
        onLogin={openAuthModal}
        onLogout={handleLogout}
        goToSearch={goToSearch}
        goToFavorites={fetchFavorites}
      />
      <main>
        <RecipeAppView {...hookProps} />
      </main>

      {showAuthModal && (
        <AuthModal
          mode='login'
          handleLogin={async (data) => {
            await handleLogin(data);
            setShowAuthModal(false);
          }}

          handleRegister={async (data) => {
            const success = await handleRegister(data);
            if (success) setShowAuthModal(false);
          }}
        />
      )}
    </div>
  )
}

export default App
