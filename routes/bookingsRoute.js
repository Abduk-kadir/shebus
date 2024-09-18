const express=require('express');
const router=express.Router();
const BookingSchema=require('../models/bookingSchema')
const Bus=require('../models/busModel')
const authmiddleware=require('../middlewares/authmiddleware')
const stripe = require('stripe')(process.env.stripe_key);
const { v4: uuidv4 } = require('uuid');
router.post('/bookingSeat',authmiddleware,async(req,res)=>{
    try{
        let booking=new BookingSchema({...req.body,transactionId:'123',user:req.user.id})
        await booking.save();
        let bus=await Bus.findById(req.body.bus)
        bus.seatsBooked=[...bus.seatsBooked,...req.body.seats]
        await bus.save(); 
        res.send({
            message:'booking successfull',
            success:true,
            data:booking
        })
     
    }
    catch(err){
        res.status(500).send({
            message:err.message,
            success:false,
            data:null
        })


    }
})

//make payment

router.post('/make-payment', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/success.html',
    cancel_url: 'http://localhost:300/cancel.html',
  });
  res.redirect(303, session.url);
  });

/*router.post('/make-payment',authmiddleware,async(req,res)=>{
  let {amount,token}=req.body
    
  try{
    const customer=await stripe.customers.create({
        email:token.email,
        source:token.id
        }
   )
  const payment=await stripe.charges.create({
        amount:amount, 
        currency:'inr',
        customer:customer.id,
        payment_method_types: ['card'],
       },{
     idempotencyKey:uuidv4()
  })

     if(payment ){
         res.send({
          message:'payment is successfull',
             data:{
             payment:payment.id,
            
             } ,
             success:true   
       })
   }
   else{
       res.send({
            message:'payment failed',
            success:false,
            
      })
     }

    
 }
 catch(err){
    res.status(500).send({
        message:err.message,
       success:false,
       
  })
   }


})
*/



module.exports=router