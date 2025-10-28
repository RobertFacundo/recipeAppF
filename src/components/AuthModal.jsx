import useAuthForm from "../hooks/useAuthForm";

const AuthModal = ({ closeModal }) => {
    const { formMode, formData, errorMessage, isSubmitting, toggleMode, handleChange, handleSubmit } = useAuthForm(closeModal);

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    {formMode === "login" ? "Welcome back 👋" : "Create your account ✨"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {formMode === "register" && (
                        <div>
                            <label className="block text-gray-600 text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                                placeholder="Your name"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
                            placeholder="********"
                            required
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition disabled:opacity-60"
                    >
                        {isSubmitting
                            ? "Processing..."
                            : formMode === "login"
                                ? "Login"
                                : "Register"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <button
                        type="button"
                        onClick={toggleMode}
                        className="text-orange-600 hover:underline text-sm"
                    >
                        {formMode === "login"
                            ? "Don't have an account? Register"
                            : "Already have an account? Log in"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AuthModal;