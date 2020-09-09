require("./models/userModel");
require("./models/orderModel");

const express = require('express');

const userRoutes = require("./routes/userRoutes");
const orderRoutes= require("./routes/orderRoutes");

const app = express();
const baseUrl="/api/v1";

app.use(express.json());

app.use(baseUrl, userRoutes);
app.use(baseUrl, orderRoutes);

module.exports=app;