import { Navigate, useLocation } from 'react-router-dom';
import { isAdmin } from '../helpers';

function PrivateRoute({ children }) {
  const location = useLocation();
  if (!localStorage.getItem('user')) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
}

function AdminRoute({ children }) {
  const location = useLocation();
  if (!localStorage.getItem('user')) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  if (!isAdmin()) {
    return <Navigate to='/dashboard' replace />;
  }
  return children;
}

export { PrivateRoute, AdminRoute };
