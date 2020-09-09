const mongoose = require("mongoose");

const Order = mongoose.model("Order");
const User = mongoose.model("User");

exports.createOrder = async (req, res) => {
  const { sub_total } = req.body;
  const currentDate = new Date();

  try {
    await Order.insertMany({
      sub_total: sub_total,
      userId: req.user._id,
      Date: currentDate,
    });
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $inc: { no_of_orders: 1 } }
    );

    res.send({
      status: 1,
      message: "Successfully updated",
    });
  } catch (error) {
    console.log(error.message);
    res.send({ status: 0, message: "Your order has not been placed!!" });
  }
};

exports.listOrder = async (req, res) => {
  try {
    const orders = await Order.find();

    res.send({
      status: 1,
      message: "Record successfully fetched",
      data: orders,
    });
  } catch (error) {
    res.send({ status: 0, message: error.message });
  }
};

exports.viewOrder = async (req, res) => {
  try {
    //console.log('hii');
    const orders = await Order.findById(req.params.id);

    res.send({
      status: 1,
      message: "Record successfully fetched",
      data: orders,
    });
  } catch (error) {
    res.send({ status: 0, message: error.message });
  }
};

exports.listOrderByUser = async (req, res) => {
  // aggregate( [ { $group : { _id : "$item" } } ] )
  try {
    // const orders = await Order.aggregate([
    //   {
    //     $group: {
    //       _id: "$userId",
    //       avgSubTotal: { $avg: "$sub_total" },
    //     },
    //   },
    // ]);

    const orders = await Order.aggregate([ 
        { $group : 
            { 
              _id : "$userId", 
              avgSubTotal: { $avg: "$sub_total" },
            } 
         },
         { $lookup: 
            { 
                from: "users", 
                localField: "_id", 
                foreignField: "_id",
                as: "userData" 
            } 
         }
     ]);

     const newOrder = [];
     if(orders.length > 0) {
        orders.forEach(item => {
            newOrder.push({
                userId: item._id,
                name: item.userData[0].name,
                noOfOrders: item.userData[0].no_of_orders,
                averageBillValue: (item.avgSubTotal).toFixed(2)
            });
        });
     }

    res.send({
      status: 1,
      message: "Record successfully fetched",
      data: newOrder,
    });
  } catch (error) {
    res.send({ status: 0, message: error.message });
  }
};
