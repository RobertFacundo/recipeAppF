import { useNavigationContext } from "../contexts/NavigationContext";
import { useAuthContext } from "../contexts/AuthContext";

const NavHeader = ({ openAuthModal }) => {
    const { isAuthenticated, handleLogout } = useAuthContext();
    const { goToFavorites, goToSearch } = useNavigationContext();

    return (
        <header className="bg-white sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight"> The Ingredient Hunter 🍊</h1>
                    <p className="text-sm text-gray-500 mt-1 italic hidden sm:block">
                        "Stop guessing, start cooking."
                    </p>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={goToSearch}
                        className="text-gray-600 hover:text-orange-500 font-semibold transition duration-200 hidden md:block cursor-pointer"
                    >
                        Search
                    </button>
                    {isAuthenticated && (
                        <button
                            onClick={goToFavorites}
                            className="text-gray-600 hover:text-orange-500 font-semibold transition duration-200 cursor-pointer"
                        >
                            Favorites
                        </button>
                    )}

                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition duration-200 shadow-sm cursor-pointer"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={openAuthModal}
                            className="px-4 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition duration-200 shadow-md cursor-pointer"
                        >
                            Login / Sign Up
                        </button>
                    )}
                </div>
            </div>
        </header>
    )
}

export default NavHeader;