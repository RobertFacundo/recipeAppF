import {useState, useCallback} from 'react';

const useAsyncStatus = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const resetStatus = useCallback(()=>{
        setIsLoading(true);
        setError(null);
    }, []);

    return {
        isLoading,
        error,
        setLoading: setIsLoading,
        setError,
        resetStatus
    };
};

export default useAsyncStatus;