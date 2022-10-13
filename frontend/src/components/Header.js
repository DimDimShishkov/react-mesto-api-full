import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ email, logOff }) {
  const [burger, openBurger] = React.useState(false);

  function handleOpenBurger() {
    openBurger(!burger);
  }

  let authbutton;
  let location = useLocation();

  (function LoginButton(email) {
    if (email) {
      authbutton = (
        <>
          <div className={`header__mobile ${email ? '' : 'header__loggIn'}`} onClick={handleOpenBurger}>
            <span className={`header__burger ${burger && 'header__burger_active'}`}></span>
          </div>
          <div className={`header__container ${burger && 'header__container_active'}`}>
            <h2 className="header__email">{email}</h2>
            <button className="header__button" onClick={logOff}>
              {'Выйти'}
            </button>
          </div>
        </>
      );
    } else {
      
        location.pathname === '/sign-up'
          ? (authbutton = (
              <Link to="/sign-in" className="header__auth">
                <button className="header__button">Войти</button>
              </Link>
            ))
          : (authbutton = (
              <Link to="/sign-up" className="header__auth">
                <button className="header__button">Регистрация</button>
              </Link>
            ));
      
    }
  })(email);

  return (
    <header className={`header ${burger && 'header_active'}`}>
      <div className="header__link"></div>
      {authbutton}
    </header>
  );
}

export default Header;
