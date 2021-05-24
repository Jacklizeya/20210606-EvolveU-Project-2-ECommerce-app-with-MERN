var express = require('express');
var router = express.Router();
const {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser} = require("../controller/userController")
const {protect, admin} = require ("../middleware/authMiddleware")

/* GET users listing. */
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser).get(protect,admin, getUserById).put(protect, admin, updateUser)


module.exports = router;

