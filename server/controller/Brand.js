

const { Brand } = require('../model/Brand');

exports.fetchBrands = async (req, res) => {
  try {
    const brands = await Brand.find().exec();
    res.status(200).json(brands);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createBrand = async (req, res) => {

  const brand = new Brand({value:req.body.brand , label:req.body.brand});
  console.log('Adding Brand');
  try {
    const doc = await brand.save();
    const allBrands = await Brand.find() ;
    res.status(201).json({data : allBrands});
  } catch (err) {
    res.status(400).json(err);
  }
};