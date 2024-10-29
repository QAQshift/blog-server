const express = require('express');
const router = express.Router();
const controller = require("../controller/dbServe")

/* GET users listing. */
router.get('/get-users', controller.userController.getUsers);
router.get('/signin', controller.userController.signin);

module.exports = router;
