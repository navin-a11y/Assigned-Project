const express = require('express');

const router = express.Router()

const orderController=require('./../controllers/orderController');
const userController = require("./../controllers/userController");

router.route("/createOrder").post(userController.protect, orderController.createOrder);
router.route("/listOrder").get(orderController.listOrder);
router.route("/viewOrder/:id").get(orderController.viewOrder);
router.route("/listOrderByUser").get(orderController.listOrderByUser);

module.exports=router;

