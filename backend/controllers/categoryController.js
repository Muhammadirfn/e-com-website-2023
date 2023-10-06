
const categoryModel = require("../Models/CategoryModel");
const slugify = require('slugify')




const createcategoryController = async (req,res) =>{

  try {
    const {name} = req.body

    if(!name) {
      return res.status(401).send({message: "Name is required"})
    }

    const existingCategory = await categoryModel.findOne({name});

    if(existingCategory){
      return res.status(200).send({
        success:false,
        message:"category Already exist"
      })
    }

    const category = new categoryModel({name, slug: slugify(name)});
    await category.save();
    return res.status(201).send({
      success: true,
      message:"Category created successfully",
      category
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category"
    })
    
  }

}

const updatecategoryController = async (req, res) => {
  try {
    const { name } = req.body; 
    const { id } = req.params;

    
    
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) }, 
      { new: true }
    );

   
    
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category: category 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating the category"
    });
  }
};

const categoryController = async (req,res) =>{
 try {

  const category = await categoryModel.find({})

  res.status(200).send({
    success: true,
    message:"All Category List",
    category
  })
  
 } catch (error) {
  console.log(error);
  res.status(500).send({
    success: false,
    message: "Error while getting the Category list"
  })
  
 }
    
  }

  const singlecategoryController = async (req,res) =>{
    try {

      const category = await categoryModel.findOne({slug: req.params.slug});

      res.status(201).send({
        success: true,
        message:"Get single Category Successfully",
        category
      })
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while Getting single Category"
      })
      
    }
  }

  const deletecategoryController = async (req,res) =>{
    try {
      const {id} = req.params
      await categoryModel.findByIdAndDelete(id)

      res.status(200).send({
        success: true,
        message:"Category deleted successfully"
      })

    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: " there is a errro while deleteing the category"
      })
      
    }
  }
// 





module.exports = {
  createcategoryController,
  updatecategoryController,
  categoryController,
  singlecategoryController,
  deletecategoryController

}