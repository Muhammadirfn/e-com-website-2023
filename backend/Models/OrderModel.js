const mongoose = require('mongoose')



const orderSchema = new mongoose.Schema({
  products:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product" 
    }
  ],
  payment:{},
  buyer:{
    type: mongoose.ObjectId,
    ref:"users"
  },
  status:{
    type:String,
    default:"Not Process",
    enum:["Not Process", "Processing", "Shipped" , "deliverd", "cancle"]
  }
  
},{timestamps: true})

const orderModel = mongoose.model("order" , orderSchema)


module.exports = orderModel