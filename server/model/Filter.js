const mongoose = require('mongoose') ; 
const { Schema } = mongoose ;

const filterSchema = new Schema({
    value: {type : String , required : true },
    category: {type : String , required : true },
    label:{type : String , required : true }
})
  

const virtual = filterSchema.virtual('id') ;
virtual.get(function(){
    return this._id ;
})

filterSchema.set('toJSON',{
    virtuals: true ,
    versionKey: false ,
    transform: function (doc ,ret) {delete ret._id}
})

exports.Filter = mongoose.model('Filter' , filterSchema);  