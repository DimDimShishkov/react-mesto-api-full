import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthWithForm from './AuthWithForm';

function Login(props) {
  function handleSubmit(user) {
    props.handleLoggIn(user);
  }

  return <AuthWithForm title={'Вход'} formName={'login'} buttonText="Войти" onSubmit={handleSubmit} />;
}

export default withRouter(Login);
