const mongoose = require('mongoose');
const middleSectionSchema= new mongoose.Schema({
    backgroundImg:{
        type:String,
        required:[true,'middle Section must have backgroundImg']
    },
    titleOne:{
        type:String,
        required:[true,'middle Section must have titleOne']
    },
    titleTwo:{
        type:String,
        required:[true,'middle Section must have titleTwo']
    },
    titleOne_ar:{
        type:String,
        required:[true,'middle Section must have titleOne_ar']
    },
    titleTwo_ar:{
        type:String,
        required:[true,'middle Section must have titleTwo_ar']
    },

},{
    timestamps:true
})

middleSectionSchema.pre(/^find/,function(next){
    this.select('-__v');
    next();
})
const MiddleSection = mongoose.model('MiddleSection',middleSectionSchema);

module.exports=MiddleSection;