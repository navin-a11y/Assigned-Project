const mongoose = require('mongoose');
const dotenv=require('dotenv');

dotenv.config({path:"./config.env"});

const app = require("./app");

const mongoUri = process.env.MONGODB_URI;
const port=process.env.PORT;

mongoose.connect(mongoUri,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("SUCCESSFULLY CONNECTED!");
});

mongoose.connection.on("error", (error) => {
    console.log("DB IS NOT CONNECTED!");
});

app.listen(port);
console.log(`Server is running on port: ${port}`);