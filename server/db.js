const mongoose= require('mongoose')
const mongoURL = "mongodb://127.0.0.1/newproject";
const ConnectToMongo=async()=>{
    try{
        await mongoose.connect(mongoURL);
        console.log("database connected successfully")
    }
    catch(err){
        console.log("database not connected"+err)
    }
}
module.exports = ConnectToMongo;