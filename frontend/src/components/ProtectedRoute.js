import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...props }) => {
  return <Route>{() => (props.loggedIn ? <Component {...props} /> : <Redirect to="/signup" />)}</Route>;
};
