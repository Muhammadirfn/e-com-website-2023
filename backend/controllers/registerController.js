const userModel = require('../Models/userModel');
const { hashPassword , comparePassword } = require('../helpers/authHelper');
const JWT= require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {requireSignIn} = require('../middleware/authMiddleware');
const orderModel = require('../Models/OrderModel');

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    if (!name || !email || !password || !address || !phone || !answer) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered, please login",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Save user to the database
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      answer
    });

    await user.save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};


// post login
const loginController = async (req,res) =>{
  try {
    const {password, email} = req.body

    if(!password || !email){
      return res.status(404).send({
        success:false,
        message: "invalid name or password",
       
      })
    }
    const user = await userModel.findOne({email})
    if(!user){
      return res.status(404).send({
        success:false,
        message:"Email is not Registered"
      })
    }
    const match = await comparePassword(password, user.password)
    if(!match){
      return res.status(200).send({
        success: false,
        message:"invalid Password"
      })
    }
    // token

    const token  = JWT.sign({_id: user._id}, process.env.JWT_SECRECT ,{expiresIn:"7d"}) ;

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
        phone: user.phone,
        role: user.role
      },
      token
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,})

    
  }
}

//  forgetpassword 

const hasPassword = async (password) => {
  // Generate a salt (you can control the number of rounds for salt generation)
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password using the generated salt
  const hashePassword = await bcrypt.hash(password, salt);

  return hashePassword;
};

const forgetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    // console.log(req.body);

    // Check if required fields are provided
    if (!email || !answer || !newPassword) {
      return res.status(400).send({ message: "Email, answer, and new password are required" });
    }

    // Check if the user exists based on email and answer
    const user = await userModel.findOne({ email, answer });

    // If user is not found, return a 404 response
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }

    // Hash the new password
    const hashePassword = await hasPassword(newPassword);
    // console.log(hashePassword);

    // Update the user's password with the hashed password
    await userModel.findByIdAndUpdate(user._id, { password: hashePassword });

    // Send a success response
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message, // Log the specific error message for debugging
    });
  }
};

const testController = (req,res) =>{
  res.send("protected Route");
}
// controller for update the profile

const updateprofileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    // Check if password is provided and has a minimum length
    if (password && password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    const updateFields = {
      name: name || user.name,
      address: address || user.address,
      phone: phone || user.phone,
    };

    // Update password only if it's provided
    if (password) {
      updateFields.password = await hashPassword(password);
    }

    const updatedUser = await userModel.findByIdAndUpdate(req.user._id, updateFields, { new: true });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "There was an error while updating the profile",
      error: error.message,
    });
  }
};
// for orders 
const getorderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate('products', '-photo') // Use 'products' here
      .populate('buyer', 'name');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getallorderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ })
      .populate('products', '-photo') // Use 'products' here
      .populate('buyer', 'name')
      .sort({createdAt: -1})
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//  for status updating
const statusController = async (req,res) =>{
  try {
    const {orderId} = req.params
    const {status} = req.body
    const orders = await orderModel.findByIdAndUpdate(orderId , {status}, {new: true})
    res.json(orders)
    
  } catch (error) {
    console.log(error);
  }
}



module.exports = {
  registerController,
  loginController
  ,
  forgetPasswordController ,
  testController,
  updateprofileController,
  getorderController,
  getallorderController, statusController

};
