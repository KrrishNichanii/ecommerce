// const { Product } = require("../model/Product") ;


// exports.createProduct = (req , res) => {
//     const product = new Product(req.body);
//     product.save()
//            .then(doc => {
//               res.status(201).json(doc);
//            })
//            .catch(err =>{
//             res.status(400).json(err)
//             console.log(err);         
//            })
// }

// exports.fetchAllProducts = async (req , res) => {

//     let condition = {} ;
//     if(!req.query.admin){
//         condition.deleted = {$ne:true} ; 
//     }

//     let query = Product.find(condition) ;
//     let totalProductQuery =await  Product.find(condition).exec();
//     const totalDocs = totalProductQuery.length ; 
//     res.set('X-Total-Count' , totalDocs);

    
//     if(req.query.category){
//         query =  query.find({category : req.query.category})
//     }

//     if(req.query.brand){
//         query =  query.find({brand : req.query.brand})
//     }

//     if(req.query._sort && req.query._order){
//         query =   query.sort({[req.query._sort] : req.query._order})
//      }
    
//     if(req.query._page && req.query._limit){
//         const pageSize = req.query._limit ; 
//         const page = req.query._page ;
//         query =  query.skip(pageSize * (page - 1)).limit(pageSize) ; 
//     }

//     try {
//         const doc = await query.exec() ; 
//         // if(req.query.category || req.query.brand){
//         //     totalDocs = doc.length ; 
//         //      res.set('X-Total-Count',totalDocs) ; 
//         // }
//         console.log(totalDocs);
//         res.status(201).json(doc) ; 
//     } catch (error) {
//         res.status(400).json(error) ; 
//     }

// }

// exports.fetchProductById = async (req , res) => {
//     const {id} = req.params; 

//     try {
//         const product = await Product.findById(id)

//         res.status(200).json(product) ; 
//     } catch (error) {
//         res.status(400).json(error) ; 
//     }
// }

// exports.updateProduct = async (req , res) => {
//     const {id} = req.params; 
//     try {
//         const product = await Product.findByIdAndUpdate(id , req.body, {new:true});
//         res.status(200).json(product) ; 
//     } catch (error) {
//         res.status(400).json(error) ; 
//     }
// }

const { Product } = require('../model/Product');

exports.createProduct = async (req, res) => {
  // this product we have to get from API body
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  // TODO : we have to try with multiple category and brands after change in front-end
  //console.log('User in pp' ,req.user);
  let condition = {}
  if(!req.query.admin){
      condition.deleted = {$ne:true}
  }
  
  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }
  //TODO : How to get sort on discounted Price not on Actual price
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductsQuery.count().exec();
  // console.log({ totalDocs });

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set('X-Total-Count', totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {new:true});
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

