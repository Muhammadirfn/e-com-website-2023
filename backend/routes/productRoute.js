const express =require('express')
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware')

const formidable = require('express-formidable');
const { createproductController, gettingprodectController, singleproductController, productphotoController, deleteProductController, updateproductController, productfilterController, productcountController, productlistController, searchproductController, getsimilarProduct, productcategoryController, braintreeTokenController, braintreepaymentController } = require('../controllers/productController');


const productRouter= express.Router()


productRouter.post('/create-product', requireSignIn, formidable(), isAdmin, createproductController );


//  update product

productRouter.put('/update-product/:pid', requireSignIn, formidable(), isAdmin, updateproductController );


// getting route of the product 

productRouter.get('/get-product', gettingprodectController)

//  getting single Product

productRouter.get('/get-product/:slug', singleproductController);


//  get photo route

productRouter.get('/product-photo/:pid', productphotoController);


// delete product

productRouter.delete('/delete-product/:pid', deleteProductController);

// getting similar product 

productRouter.get('/similar-product/:pid/:cid', getsimilarProduct)



//  product filter controller route

productRouter.post('/filter-product',productfilterController )

//  product Count Controller

productRouter.get('/product-count', productcountController)

//  get the single page of the product 

productRouter.get('/product-list/:page',  productlistController)

// search product route

productRouter.get('/search/:keyward', searchproductController)

// getting product vise category

productRouter.get('/product-category/:slug', productcategoryController)


// payment routes
// first of all getting the token from braintree
productRouter.get('/braintree/token' , braintreeTokenController)

// payment gate way
productRouter.post('/braintree/payment', requireSignIn, braintreepaymentController)


module.exports = productRouter