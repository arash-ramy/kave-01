const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
 



  parentId:{
    type: String,
  },
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
  
  childred:{
      type:Array
  },



});

module.exports = mongoose.model("Sidebar", userSchema);
