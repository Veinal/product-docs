const express = require('express');
const ConnectToMongo=require('./db')
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json())
app.use('/api/newproduct',require('./router/productRouter'))
app.use('/api/newregister',require('./router/registerRouter'))
app.use('/api/category',require('./router/categoryRouter'))
app.use('/api/images',require('./router/imageRouter'))


app.use('/uploads/admin',express.static('./uploads/admin'))
app.use('/uploads/products',express.static('./uploads/products'))
app.use('/uploads/dummy',express.static('./uploads/dummy'))


port = 7000;
app.listen(port,()=>{
    console.log("app is listening to port"+ port)
})

ConnectToMongo()