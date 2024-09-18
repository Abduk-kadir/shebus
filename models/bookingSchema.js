const mongoose=require('mongoose')
const BookingSchema=new mongoose.Schema({
    bus:{
        type:mongoose.Schema.ObjectId,
        ref:'Buses',
        required:[true,'bus id  important']

    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'user id is important']
    },
    seats:{
        type:Array,
        required:[true,'seat are important to for booking ticket']
    },
    transactionId:{
        type:String,
        required:[true,'transaction id is important']

    }
},{
    timestamps:true
})

module.exports=mongoose.model('booking',BookingSchema)