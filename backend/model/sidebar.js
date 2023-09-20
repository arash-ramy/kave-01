const mongoose = require("mongoose");


const sidebarSchema = new mongoose.Schema({
 



   
  floor:{
      type:String
  },
  caption:{
      type:String
  },
  row:{
      type:String
  },
  icon:{
      type:String
  },
  
  children:  [{
    _id:{type: mongoose.Schema.Types.ObjectId,},

    parentId:String,

    caption: String,
    floor:Number,
    row:Number,
}],



});

module.exports = mongoose.model("Sidebar", sidebarSchema);
