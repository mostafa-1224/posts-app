import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router';
import AuthContext from '../../context/auth/AuthContext';

function PrivateRoute({ component: Component, ...rest }) {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        !authContext.isAuthenticated && !authContext.loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default PrivateRoute;
