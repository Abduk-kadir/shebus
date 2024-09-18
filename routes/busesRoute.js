const express=require('express')
let router=express.Router()
let Buses=require('../models/busModel')
const authmiddleware = require('../middlewares/authmiddleware')




router.post('/addbus',authmiddleware,async(req,res)=>{
   
    try{
    let f= await Buses.findOne({number:req.body.number})
    if(f){
       return res.status(200).send({
            message:'bus is already exit',
            success:false
        })

    }
    let bus=new Buses(req.body)
    await bus.save()
    res.status(200).send({
        message:'bus is added successfully',
        success:true
    })
   }
   catch(err){
    res.status(500).send({
        message:err.message,
        success:false
    })
   }

})

//update a bus
router.put('/edit/bus/:id',authmiddleware,async(req,res)=>{
    let {id}=req.params
    console.log('id is')
  
    try{
    await Buses.findByIdAndUpdate(id,req.body)
    return res.send({
        success:true,
        message:'bus is successfully updated'

    })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
    

})

//deleting bus
router.delete('/delete/bus/:id',authmiddleware,async(req,res)=>{
    let {id}=req.params
    try{
    await Buses.findOneAndDelete(id)
    return res.send({
        success:true,
        message:'bus is deleted success fully'
    })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
    

})
//getting a document by id
router.get('/get-data-byId/:id',async(req,res)=>{
    let {id}=req.params
    try{
        let bus=await Buses.findById(id)
        res.send({
            message:'data is fetched succesfully',
            success:true,
            data:bus
        })
    }
    catch(err){
        res.send({
            message:err.message,
            success:false,
           
        })

    }

})





//gettin all buses
router.get('/get-all-buses',authmiddleware,async(req,res)=>{
     
    try{
        let allbuses=await Buses.find()
        res.send({
            message:'all data is fetched succesfully',
            success:true,
            data:allbuses
        })
    }
    catch(err){
        res.send({
            message:err.message,
            success:false,
           
        })

    }

})





module.exports=router