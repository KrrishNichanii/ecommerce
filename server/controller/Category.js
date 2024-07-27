

const { Category } = require('../model/Category');

exports.fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createCategory = async (req, res) => {
  const category = new Category({ value : req.body.category , label : req.body.category});
  try {
    const doc = await category.save();
    const allCategories = await Category.find() ; 
    res.status(201).json({data: allCategories});
  } catch (err) {
    res.status(400).json(err);
  }
};