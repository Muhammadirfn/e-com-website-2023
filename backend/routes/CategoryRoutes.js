const express  =require('express')
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware')
const {createcategoryController, updatecategoryController, categoryController, singlecategoryController, deletecategoryController} = require('../controllers/categoryController')



const categoryRouter = express.Router()


// routes,, create category
categoryRouter.post('/create-category', requireSignIn, isAdmin, createcategoryController);


// update category 
categoryRouter.put('/update-category/:id', requireSignIn, isAdmin, updatecategoryController);

// get all catogery route


categoryRouter.get('/get-category' , categoryController)

//  get single category

categoryRouter.get('/single-category/:slug', singlecategoryController)

// delete route

categoryRouter.delete('/delete-category/:id', requireSignIn, isAdmin , deletecategoryController)

module.exports = categoryRouter