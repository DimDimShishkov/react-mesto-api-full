import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthWithForm(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

function handleSubmit(evt) {
  evt.preventDefault();
  props.onSubmit({
    email: email,
    password: password,
  });
}

  return (
    <div className="auth">
      <h2 className="auth__heading">{props.title}</h2>
      <form className="auth__form" noValidate name={props.formName} onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <label className="auth__label auth__label_value_email">
            <input
              required={true}
              minLength={6}
              maxLength={40}
              className="auth__input"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email || ""}
              onChange={(evt) => setEmail(evt.target.value)}
            />
            <span className="auth__input-error auth__input-error_type_email"></span>
          </label>

          <label className="auth__label auth__label_value_password">
            <input
              required={true}
              minLength={6}
              maxLength={40}
              className="auth__input"
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
              value={password || ""}
              onChange={(evt) => setPassword(evt.target.value)}
            />
            <span className="auth__input-error auth__input-error_type_password"></span>
          </label>
        </fieldset>

        <button type="submit" className="auth__button">
          {props.buttonText}
        </button>
      </form>
      {props.formName === 'register' ? (
        <p className="auth__subheading">
          Уже зарегистрированы?
          <Link to="/sign-in" className="auth__link">
            {' '}
            Войти
          </Link>
        </p>
      ) : (
        ''
      )}
    </div>
  );
}
