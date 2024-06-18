import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexto/Auth';

export const ProtectedRoute = ({ children, allowedTypes }) => {
    const { isLoggedIn, userType } = useAuth();
    
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (allowedTypes && !allowedTypes.includes(userType)) {
        console.log(userType)
        // Se não está entre os tipos permitidos, redireciona para uma página de erro ou dashboard
        return <Navigate to="/acesso-negado" replace />;
    }

    return children;
};