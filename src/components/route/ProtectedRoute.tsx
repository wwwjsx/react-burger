import {Redirect, Route, useLocation} from 'react-router-dom';
import { useAuth } from '../../services/auth';
import { FC, ReactNode } from 'react';

interface IProtectedRoute {
    children: ReactNode,
    path: string
}

const ProtectedRoute:FC<IProtectedRoute> = ({ children, ...props }) => {
    const location = useLocation();
    const auth = useAuth();

    // if user is not authorized
    if (!auth.isLogged) {
        return <Redirect to={{
            pathname: '/login',
            state: {
                from: location.pathname
            }
        }}/>;
    }

    return (
        <Route {...props}>
            {children}
        </Route>
    );
};

export default ProtectedRoute;