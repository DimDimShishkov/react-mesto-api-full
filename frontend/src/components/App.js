import { CurrentUserContext } from 'contexts/CurrentUserContext';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { authCheckIn, authRegister, authTokenCheck } from 'utils/Auth';
import { api } from '../utils/api';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Main from './Main';
import { ProtectedRoute } from './ProtectedRoute';
import Register from './Register';

function App() {
  const [pageBlock, setPageBlock] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUserData] = useState({ id: '', email: '' });
  const [isAuthPopupOpen, setAuthPopupOpen] = useState(false);
  const [authPopup, setAuthPopup] = useState(false);

  const history = useHistory();

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeletePlacePopupOpen(false);
    setPageBlock(false);
    setAuthPopupOpen(false);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setPageBlock(true);
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function onCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteClick(card) {
    setDeletePlacePopupOpen(card);
  }

  // загрузка данных пользователя
  useEffect(() => {
    api
      .handleDownloadProfileInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // загрузка карточек
  useEffect(() => {
    api
      .handleDownloadCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // функция установки лайка на картинку
  function handleCardLike(id, isLiked) {
    api
      .handleCardLikes(id, !isLiked)
      .then((res) => {
        setCards((prevState) => {
          return prevState.map((card) => (card._id === res._id ? res : card));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // функция удаления картинки
  function handleCardDelete(id) {
    setIsLoading(true);
    api
      .handleDeleteServerCard(id)
      .then(() => {
        setCards((prevState) => {
          return prevState.filter((card) => card._id !== id);
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // функция редактирования профиля
  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .handleUploadProfileInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // функция редактирования аватара
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .handleUploadProfileAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // функция добавления карточки
  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .handleUploadCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // функция регистрации
  function handleRegister(user) {
    authRegister(user)
      .then((res) => {
        setAuthPopup(true);
        setAuthPopupOpen(true);
        setLoggedIn(user.email);
        localStorage.setItem('jwt', res.token);
        history.push('/signin');
      })
      .catch((err) => {
        console.log(err);
        setAuthPopup(false);
        setAuthPopupOpen(true);
      });
  }

  // функция входа в аккаунт
  function handleAuth(user) {
    authCheckIn(user)
      .then((res) => {
        setLoggedIn(user.email);
        setUserData({
          id: '',
          email: user.email,
        });
        localStorage.setItem('jwt', res.token);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        setAuthPopup(false);
        setAuthPopupOpen(true);
      });
  }

  // функция выхода из аккаунта
  function handleLoggegOut() {
    setLoggedIn(false);
    setUserData({ id: '', email: '' });
    localStorage.removeItem('jwt');
    history.push('/signup');
  }

  // функция авторизации
  const authorisation = async (jwt) => {
    authTokenCheck(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(res.data.email);
          setUserData({
            id: res.data._id,
            email: res.data.email,
          });
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      authorisation(jwt);
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={`page ${pageBlock && 'page_active'}`}>
        <Header email={user.email || ''} logOff={handleLoggegOut} />

        <Switch>
          <ProtectedRoute
            path="/react-mesto-auth"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={onCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
          />

          <Route exact path="/">
            {loggedIn ? <Redirect to="/react-mesto-auth" /> : <Redirect to="/signup" />}
          </Route>

          <Route path="/signup">
            <Register handleLoggIn={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login handleLoggIn={handleAuth} />
          </Route>
        </Switch>

        <Footer />

        {/* попап редактирования имени профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />

        {/* попап редактирования аватара профиля */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />

        {/* попап добавления новой карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />

        {/* попап просмотра карточки */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        {/* попап удаления карточки */}
        <DeleteCardPopup
          isOpen={isDeletePlacePopupOpen}
          onCardDelete={handleCardDelete}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />

        {/* попап входа в систему */}
        <InfoTooltip isOpen={isAuthPopupOpen} auth={authPopup} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
