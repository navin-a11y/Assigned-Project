const mongoose=require('mongoose');

const orderSchema=mongoose.Schema({
    sub_total:{
        type: Number,
        require: true
    },
    date: Date,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Order=mongoose.model("Order", orderSchema);
module.exports=Order;