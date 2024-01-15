var express = require('express');
var router = express.Router();

const userModel=require('./users');
const passport = require('passport');
const localStrategy=require("passport-local");
passport.use(new localStrategy(userModel.authenticate()))
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

// to crate flash data

// router.get('/field',function(req,res){
// req.flash("age",21);
// req.flash("naam","Abhishek Maurya");
// res.send("Bangaya");
// })

// to access data in anoter route

// router.get('/checkkaro',function(req,res){
// console.log(req.flash("age"),req.flash("naam"));
// res.send("Check Kar lo Backend ke terminal par");
// });

// router.get('/create',async function(req,res){
//  let userdata= await userModel.create({
//     username:"Abhishek Maurya",
//     nickname:"Golu@maurya",
//     descrition:"i am a guy of 25 and i love cricket",
//      categories:['js','enjoy','chill']
    
     
//   })
//   res.send(userdata);
// })


                                      // VVI

                           // authenticate & autherization
 
   router.get('/profile',isloggedIn,function(req,res){
  res.render('profile');
 })

                           

       //register route
router.post('/register',function(req,res){
  var userdata=new userModel({
    username:req.body.username,
    secret:req.body.secret
  });
 
  userModel.register(userdata,req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/profile')
  
    })
  })
})
                // login route

router.post('/login',passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/"
}),function(req,res){})

                 //log out
router.get('/logout',function(req,res,next){
  req.logOut(function(err){
    if(err){
      next(err)
    }
    res.redirect('/');
  })
})

           // islogged in   middleware

function isloggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/')
}



module.exports = router;
