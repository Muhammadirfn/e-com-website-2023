const slugify = require('slugify');
const productModel = require('../Models/productModel');
const categoryModel=  require('../Models/CategoryModel')
const fs = require('fs');
var braintree = require('braintree');
const orderModel = require('../Models/OrderModel');
const dotenv = require('dotenv')

dotenv.config()


// payment gateway bro just chill 


var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const createproductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

 
    
    // Initialize an error message variable
    let errorMessage = "";
    
    // Switch statement for validation
    switch (true) {
      case !name:
        errorMessage = "Name is required";
        break;
     
      case !description:
        errorMessage = "Description is required";
        break;
      case !price:
        errorMessage = "Price is required";
        break;
      case !category:
        errorMessage = "Category is required";
        break;
      case !quantity:
        errorMessage = "Quantity is required";
        break;
      case photo && photo.size > 200000:
        errorMessage = "Photo size should be within limits (up to 200 KB)";
        break;
    }
    
    // Check if there's an error message
    if (errorMessage) {
      return res.status(400).send({ error: errorMessage });
    }
    
    // The fields are valid, continue with processing
    // ...
    
    // Sanitize and lowercase the slug
    const sanitizedSlug = slugify(name, { lower: true });

    const product = new productModel({
      ...req.fields,
      slug: sanitizedSlug
    });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(201).send({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error(error);

    // Provide a more detailed error message
    res.status(500).send({
      success: false,
      message: 'Unable to create the product category',
      error: error.message // Include the error message for debugging
    });
  }
};

const gettingprodectController = async (req,res) =>{

  try {
     const product = await productModel.find({})
     .populate('category')
     .select('-photo')
     .limit(15)
     .sort({createdAt: -1})

     res.status(200).send({
      success: true,
      message: "Get All the Product",
      product,
      total: product.length
     })
    
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: ' Error While Getting the Product'
    })
    
  }
}

const singleproductController = async (req, res) => {
  try {
    // console.log('req.params.slug:', req.params.slug); // Add this line for debugging

    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select('-photo')
      .populate('category');

    // console.log('Product:', product); // Add this line for debugging

    if (!product) {
      return res.status(404).send({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Fetched Single Product Successfully',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error While Getting the Single Product',
    });
  }
};


const productphotoController = async (req,res) =>{

  try {

    const product = await productModel.findById(req.params.pid).select('photo')

    if(product.photo.data){
      res.set('Content-type', product.photo.contentType)
      res.status(200).send(product.photo.data)
      
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: ' Error while getting the photo'
    })
    
  }
}

const deleteProductController = async (req,res) =>{

  try {
    await productModel.findByIdAndDelete(req.params.pid).select('-photo')
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
     
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: ' You Cannot Delete the the product'
    })
    
  }


}

const updateproductController = async (req,res) =>{

  try {
    const { name, slug, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

 
    
    // Initialize an error message variable
    let errorMessage = "";
    
    // Switch statement for validation
    switch (true) {
      case !name:
        errorMessage = "Name is required";
        break;
     
      case !description:
        errorMessage = "Description is required";
        break;
      case !price:
        errorMessage = "Price is required";
        break;
      case !category:
        errorMessage = "Category is required";
        break;
      case !quantity:
        errorMessage = "Quantity is required";
        break;
      case photo && photo.size > 200000:
        errorMessage = "Photo size should be within limits (up to 200 KB)";
        break;
    }
    
    // Check if there's an error message
    if (errorMessage) {
      return res.status(400).send({ error: errorMessage });
    }
    
    // The fields are valid, continue with processing
    // ...
    
   

    const product = await productModel.findByIdAndUpdate(req.params.pid, 
      {...req.fields , slig: slugify(name)}, {new: true})
      

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(201).send({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error(error);


}
}

//  filter controller 

const productfilterController = async(req, res) =>{
  try {
    const {check, radio} = req.body

    const args = {}
    if(check.length > 0 )  args.category = check
    if(radio.length)  args.price = {$gte: radio[0], $lte: radio[1]}
    const product = await productModel.find(args)

    

    res.status(200).send({
      success: true,
      message: "showing nothing during filteration",
    
      product
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: ' You Cannot Filter the the product'
    })
    
  }
}
//  for counting
const  productcountController = async (req,res) =>{

  try {
    const total = await productModel.find({}).estimatedDocumentCount()
    res.status(200).send({
      success: true,
      total
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: ' You Cannot Count the product the the product'
    })
    
  }
}
//  for listing

const productlistController = async (req, res) => {
  try {
    const Perpage = 6;
    const page = req.params.page ? req.params.page : 1;
    
    const skipCount = (page - 1) * Perpage; // Calculate the skip count correctly
    
    const products = await productModel
      .find({})
      .select('-photo')
      .skip(skipCount)
      .limit(Perpage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products, // Corrected variable name here (products)
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in per page controller',
    });
  }
};

const searchproductController = async (req, res) => {
  try {
    const keyword = req.params;

    if (!keyword) {
      return res.status(400).send({
        success: false,
        message: 'Please enter a search keyword',
      });
    }

    const keywordString = String(keyword); // Convert keyword to string
    // console.log('Search Keyword:', keywordString);

    const results = await productModel.find({
      $or: [
        { name: { $regex: keywordString, $options: 'i' } },
        { description: { $regex: keywordString, $options: 'i' } },
      ],
    }).select('-photo');

   

    // console.log('Search Results:', results); // Log the results

    res.status(200).send({
      success: true,
      message: "you get the every search value",
      keyword: keyword,
      results
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in search page controller',
    });
  }
};

// this is for getting similar product ok

const getsimilarProduct = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select('-photo')
      .limit(5)
      .populate('category');

    res.status(200).send({
      success: true,
      message: "You got the similar products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in search page controller',
    });
  }
};
// getting product controller by category


const productcategoryController = async (req, res) => {
  try {
    // Validate and sanitize the slug, or handle validation separately

   

    const slug = req.params.slug;
    // console.log('Incoming slug:', req.params.slug);


    const category = await categoryModel.findOne({ slug });

    if (!category) {
      return res.status(404).send({
        success: false,
        message: 'Category not found',
      });
    }

    const products = await productModel.find({ category }).populate('category');

   

    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in productcategoryController',
      error: error.message,
    });
  }
};
//  payment gateway controller for token
const braintreeTokenController = async (req,res) =>{
  try {
    gateway.clientToken.generate({}, function(error, response){
      if(error){
        res.status(500).send(error)
      } else{
        res.send(response)
      }
    })
    
  } catch (error) {
    
  }
}
// for payment
const braintreepaymentController = async (req,res) =>{
  try {
    const {cart, nonce} = req.body
    let total = 0
    cart.map((i) => 
    {total +=i.price})
    let newTransaction = gateway.transaction.sale({
      amount: total,
      paymentMethodNonce: nonce,
      options:{
        submitForSettlement: true
      }
    }, 
    function(error, result){
      if(result){
        const order = new orderModel({
          products: cart,
          payment: result,
          buyer: req.user._id
        }).save()
        res.json({ok: true})
      } else{
        res.status(500).send(error)
      }
    })
    
  } catch (error) {
    console.log(error);
    
  }
}

 
module.exports = { createproductController, gettingprodectController , singleproductController, productphotoController, deleteProductController, updateproductController, productfilterController, productcountController, productlistController, searchproductController, getsimilarProduct, productcategoryController,
braintreeTokenController,braintreepaymentController}
