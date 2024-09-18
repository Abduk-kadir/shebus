const express=require('express')
const User=require('../models/usersModel')
var jwt = require('jsonwebtoken');
var bcrypt=require('bcryptjs');
const authmiddleware = require('../middlewares/authmiddleware');

let router=express.Router()

//reqister new user

router.post('/register',async(req,res)=>{
  
   try{
      let f=await User.findOne({email:req.body.email})
      if(f){
         //res.status(400).send("user is already register")
        return res.send({
            message:'user is alredy register',
            success:false,
            data:null
         })
      }
      let hashingPassword=await bcrypt.hash(req.body.password,10)
      req.body.password=hashingPassword
      let u=new User(req.body)
      await u.save()
      //res.send('successfully register')
      res.send({
       message:"user is successfully register",
       success:true,
       data:null
      })
   
     
   }
   catch(err){
      res.send({
         message:err.message,
         status:false,
         data:null
      })

   }    

})

router.post('/login',async(req,res)=>{
   console.log('secret key is:',process.env.secret_key)
   try{
      let user=await User.findOne({email:req.body.email})
      if(user){
      let fpass=await bcrypt.compare(req.body.password,user.password)
      if(fpass){
         var token = jwt.sign({id:user._id}, process.env.secret_key, {expiresIn:"1d"});
         res.send({
            message:"login successfully",
            status:true,
            data:token
         })

      }
      else{
         res.send({
            message:"incorrect password",
            status:false,
            data:null
         })

      }
      }
      else{
         res.send({
            message:"user does not exit",
            status:false,
            data:null
         })

      }
   }
   catch(err){
      res.send({
         message:err.message,
         status:false,
         data:null
      })
     
   }

})

router.post('/get-user-by-id',authmiddleware,async(req,res)=>{
  
  try{
      let user =await User.findById(req.user.id)
      res.send({
         message:'authentication success',
         status:true,
         data:user
      })

  }
  catch(err){
      res.send({
         message:err.message,
         status:false,
         data:null
      })

   }



})
  
  





module.exports=router
