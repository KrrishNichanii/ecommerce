const { Category } = require("../model/Category");
const { Filter } = require("../model/Filter");

exports.fetchFilter = async(req , res) => {
    const category = req.params.id ;
    console.log('Received id from frontend ', category);
    try {
        const filters = await Filter.find({category}) ; 
        //console.log('Filters ', filters);
        res.status(200).json(filters) ; 
    } catch (error) {
        console.log("Error in filter ",error);
        res.status(400).json(error);
    }
}

exports.fetchFilterByCatName = async (req,res) => {
  const { name }= req.params ; 
  const filters = await Filter.find({category: name}) ; 
  // console.log('Sendin fils ',filters);
  res.status(200).json({data: filters}) ; 
}

exports.createFilter = async (req, res) => {
    try {
      const { category, filter } = req.body;
  
    //   console.log('HELLO HI');
      if (!category || !filter) {
        return res.status(400).json(new Error('Missing required fields: category and value'));
      }
  
      const categoryInstance = await Category.findOne({ value: category });
      
      if (!categoryInstance) {
        return res.status(400).json({text: 'Not found category'});
      }
  

      const newFilter = new Filter({ category, value: filter, label: filter }); 
      console.log('Storing filter ',filter);
      await newFilter.save();
  
      return res.status(201).json(filter);
    } catch (error) {
      console.error(error); 
      return res.status(500).json(new Error('Internal server error'));  
    }
  };
  