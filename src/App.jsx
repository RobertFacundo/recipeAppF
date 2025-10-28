import './App.css'
import { useState } from 'react';
import AuthModal from './components/AuthModal.jsx';
import NavHeader from './components/NavHeader.jsx';
import RecipeAppView from './components/RecipeAppView.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <NavHeader
        openAuthModal={openAuthModal}
      />
      <main>
        <RecipeAppView />
      </main>

      {showAuthModal && (
        <AuthModal
          closeModal={closeAuthModal}
        />
      )}
      <Footer />
    </div>
  )
}

export default App
