const mongoose=require('mongoose')

let busSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:[true,'bus number is required'],

    },
    capacity:{
        type:Number,
        required:[true,'capacity is required']
    },
    from:{
        type:String,
        required:[true,'starting adrress of bus is important']
    },
    to:{
        type:String,
        required:[true,'end point of is important']
    },
    journeyDate:{
        type:String,
        required:[true,'jouney date is important']
    },
    departure:{
        type:String,
        required:[true,'departure time  is important']
    },
    arrival:{
        type:String,
        required:[true,'arrival time  is important']
    },
    fare:{
        type:Number,
        required:[true,'fare is important']
    },
    seatsBooked:{
        type:Array,
        default:[]
    },
    status:{
        type:String,
        default:'yet to start'
    },
    type:{
        type:String,
        required:[true,'bus type is required']
    }

})
module.exports=mongoose.model('buses',busSchema)