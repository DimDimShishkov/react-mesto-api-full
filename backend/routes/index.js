const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { signupCelebrate, signinCelebrate } = require('../utils/celebrate');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { notFoundController } = require('../controllers/notFoundController');

// роуты, не требующие авторизации
router.post('/signup', signupCelebrate, createUser);
router.post('/signin', signinCelebrate, login);
// авторизация
router.use(auth);
// роуты, которым авторизация нужна
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/*', notFoundController);

module.exports = router;
