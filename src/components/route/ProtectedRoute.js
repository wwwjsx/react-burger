import {Redirect, Route} from 'react-router-dom';
import { useAuth } from '../../services/auth';

const ProtectedRoute = ({ children, ...props }) => {
    const auth = useAuth();

    // if user is not authorized
    if (!auth.isLogged) {
        return <Redirect to={'/login'}/>;
    }

    return (
        <Route {...props}>
            {children}
        </Route>
    );
};

export default ProtectedRoute;