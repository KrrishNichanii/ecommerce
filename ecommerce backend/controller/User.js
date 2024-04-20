
// const { User } = require("../model/User");


// exports.fetchUserById = async (req , res) => {
//     const {id} = req.user ; 
//     console.log('User',req.user);
//     try {
//         const user = await User.findById(id) ;
//         delete user.password;
//         delete user.salt;
        
//         res.status(200).json(user) ; 
//     } catch (error) {
//         res.status(400).json(error);
//     }
// }


// exports.createUser = (req , res) => {
//     console.log('Created user ',  req.body);
//     const user = new User(req.body);
//     user.save()
//            .then(doc => {
//               res.status(201).json(doc);
//            })
//            .catch(err =>{
//             res.status(400).json(err)
//             console.log(err);            
//            })
// }

// exports.updateUser = async (req , res) => {
//     const {id} = req.params; 
//     try {
//         const user = await User.findByIdAndUpdate(id , req.body, {new:true});
//         res.status(200).json(user) ; 
//     } catch (error) {
//         res.status(400).json(error) ; 
//     }
// }



const { User } = require('../model/User');

exports.fetchUserById = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};