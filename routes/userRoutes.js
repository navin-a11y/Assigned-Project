const express = require('express');

const userController=require('./../controllers/userController');

const router = express.Router()

router.route("/signIn").post(userController.login);

router.route("/createUser").post(userController.createUser);
router.route("/listUser").get(userController.listUser);
router.route("/viewUser/:id").get(userController.viewUser);



module.exports=router;