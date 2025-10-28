import { createContext, useContext, useEffect, useCallback, useState } from "react";
import { loginUser, registerUser, authToken } from '../services/apiServices';
import useAsyncStatus from "../hooks/useAsyncStatus";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { isLoading, error, setLoading, setError, resetStatus } = useAsyncStatus();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            authToken(token);
            setIsAuthenticated(true);
        }
    }, [])

    const handleLogin = useCallback(async (email, password) => {
        resetStatus();
        setLoading(true);

        try {
            const userData = await loginUser({ email, password });
            const token = userData.token;
            localStorage.setItem('authToken', token);

            authToken(token);
            setIsAuthenticated(true);
            console.log('Login successfull');
            return true;
        } catch (error) {
            const status = error.response?.status;
            console.error('Login failed', error.response?.data || error);
            setError(status === 401 ? 'Invalid credentials' : 'server error');
            localStorage.removeItem('authToken');

            return false;
        } finally {
            setLoading(false)
        }
    }, [resetStatus, setLoading, setError]);

    const handleRegister = useCallback(async ({ name, email, password }) => {
        resetStatus();
        setLoading(true);

        try {
            const userData = await registerUser({ name, email, password });
            const token = userData.token;
            localStorage.setItem('authToken', token);
            authToken(token);
            setIsAuthenticated(true);
            console.log('register successfull');

            return true;
        } catch (error) {
            const status = error.response?.status;
            const errorMessage = error.response?.data?.message || 'servererror';

            console.error('Registration failed', errorMessage);

            setError(status === 400 ? errorMessage : 'Server Error');
            localStorage.removeItem('authToken');

            return false;
        } finally {
            setLoading(false)
        }
    }, [resetStatus, setLoading, setError]);


    const handleLogout = useCallback(() => {
        localStorage.removeItem('authToken');
        authToken(null);
        setIsAuthenticated(false);
        resetStatus();
        console.log('User logged out');
    }, [resetStatus])


    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isLoading,
            error,
            handleLogin,
            handleRegister,
            handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)