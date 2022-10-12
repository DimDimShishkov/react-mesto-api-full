const router = require('express').Router();
const {
  getUsers, getUser, updateUserProfile, updateUserAvatar, getUserInfo,
} = require('../controllers/users');
const { usersIdCelebrate, patchUsersCelebrate } = require('../utils/celebrate');

router.get('/', getUsers);
router.patch('/me', patchUsersCelebrate, updateUserProfile);
router.patch('/me/avatar', patchUsersCelebrate, updateUserAvatar);
router.get('/me', getUserInfo);
router.get('/:usersId', usersIdCelebrate, getUser);

module.exports = router;
