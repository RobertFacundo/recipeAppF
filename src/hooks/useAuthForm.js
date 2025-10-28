import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";


const useAuthForm = (closeModal) => {
    const { handleLogin, handleRegister } = useAuthContext();

    const [formMode, setFormMode] = useState('login');
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleMode = () => {
        setFormMode(prev => prev === 'login' ? 'register' : 'login');
        setErrorMessage(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsSubmitting(true);

        try {
            let success = false;
            if (formMode === 'login') {
                success = await handleLogin(formData.email, formData.password);
            } else {
                success = await handleRegister(formData);
            }

            if (success) closeModal();
        } catch (error) {
            setErrorMessage('Invalidcredentials or server error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formMode,
        formData,
        errorMessage,
        isSubmitting,
        toggleMode,
        handleChange,
        handleSubmit
    }
};

export default useAuthForm;