const router = require("express").Router();
const {
	getUserDetail,
	updateUserDetail,
	deleteUser,
} = require("../modules/userModule/userController");
const validateToken = require("../middleware/authMiddleware");

router
	.route("/")
	.get(validateToken, getUserDetail)
	.patch(validateToken, updateUserDetail)
	.delete(validateToken, deleteUser);

module.exports = router;
