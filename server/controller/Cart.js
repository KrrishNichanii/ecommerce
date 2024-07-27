

const { Cart } = require('../model/Cart');
const { Product } = require('../model/Product');
const { User } = require('../model/User');

exports.fetchCartByUser = async (req, res) => {
  const { user } = req.query;
  console.log('User from req.user in fetchCartByUser' , req.user);
  try {
    const cartItems = await Cart.find({ user: user }).populate('product');
    console.log('Returning cart items',cartItems);
    // let filters = [] ; 
    // cartItems.map((item) => filters.add(item.filter))
    // const user = await User.findById(id=req.query.id) ;
    // user.recommended = [...filters] ;
    // await user.save() ; 
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.addToCart = async (req, res) => {
  const cart = new Cart(req.body);
  const cookies = req.cookies.token ; 
  const userId = req.query.id ; 
  // console.log('Req body in addTocart' , req.body);

    const product = await Product.findById(id=req.body.product) ;
    console.log("Product filter while adding to cart ",product.filter);
    const user = await User.findById(id=req.body.user) ;
    user.recommended = [product.filter ,...user.recommended] ;
    await user.save() ; 
  console.log('adding to cart ',req.body);
  try {
    const doc = await cart.save();
    const result = await doc.populate('product');
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteFromCart = async (req, res) => {
    const { id } = req.params;
    try {
    const doc = await Cart.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result = await cart.populate('product');

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};