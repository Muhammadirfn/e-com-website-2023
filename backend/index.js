const express = require("express");
const app = express();
const Port = process.env.PORT || 5000;
require('dotenv').config();
require('./src/connection/conn');
const router = require('./routes/authRoute');
const categoryRouter = require('./routes/CategoryRoutes');
const productRouter = require('./routes/productRoute') // Corrected import
const cors = require('cors');

// middleware
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/api/v1/auth', router);
app.use('/api/v1/category', categoryRouter); 
app.use('/api/v1/product', productRouter)
// app.use('/api', userRoutes)
// app.use((req,res,next)=>{
//     console.log('comming')
//     next()
// })
// app.use(errorCatching)


app.listen(Port, () => {
    console.log(`server is running on port ${Port} and this worker ${process.pid} is assigned!`);
})