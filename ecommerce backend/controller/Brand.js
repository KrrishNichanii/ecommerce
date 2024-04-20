// const { Brand } = require("../model/Brand");



// exports.fetchBrands = async (req , res) => {
//     try {
//         const brands = await Brand.find({}).exec() ;
//          res.status(200).json(brands) ; 
//     } catch (error) {
//         res.status(400).json(error);
//     }
// }

// exports.createBrand = (req , res) => {
//     const brand = new Brand(req.body);
//     brand.save()
//            .then(doc => {
//               res.status(201).json(doc);
//            })
//            .catch(err =>{
//             res.status(400).json(err)
//             console.log(err);            console.log(err);
//            })
// }

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
  const brand = new Brand(req.body);
  try {
    const doc = await brand.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};