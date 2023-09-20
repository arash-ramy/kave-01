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

    parentId:{type: mongoose.Schema.Types.ObjectId, ref: 'Sidebar'},

    caption: String,
    floor:String,
    row:String,
}],



});

module.exports = mongoose.model("Sidebar", sidebarSchema);
