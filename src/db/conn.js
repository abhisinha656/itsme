const mongoose = require("mongoose");
const DB = "mongodb+srv://AmanSinha:101010@cluster0.rpjrc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(DB).then(()=>{
    console.log("connected");
}).catch((e)=> console.log(e));