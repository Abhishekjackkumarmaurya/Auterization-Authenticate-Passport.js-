const mongoose=require("mongoose")
const plm=require("passport-local-mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/testingendgame2");
const userSchema=mongoose.Schema({
  // username:String,
  // nickname:String,
  // descrition:String,
  //  categories:{
  //   type:Array,
  //   default:[]
  //  },
  //  datecreated:{
  //   type:Date,
  //   default:Date.now()
  //  }
  username:String,
  password:String,
  secret:String
})
userSchema.plugin(plm)


module.exports=mongoose.model("user",userSchema);