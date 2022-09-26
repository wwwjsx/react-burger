import {Redirect, Route, useLocation} from 'react-router-dom';
import { useAuth } from '../../services/auth';

const ProtectedRoute = ({ children, ...props }) => {
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