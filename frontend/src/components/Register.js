import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthWithForm from './AuthWithForm';

function Register(props) {
  function handleSubmit(user) {
    props.handleLoggIn(user);
  }

  return (
    <AuthWithForm title={'Регистрация'} formName={'register'} buttonText="Зарегистрироваться" onSubmit={handleSubmit} />
  );
}

export default withRouter(Register);
