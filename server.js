//const express=require('express')
//const app=express()
//require('dotenv').config()
const dbConfig=require('./config/dbConfig')
app.use(express.json())
app.use(express.static('public'));

let userRoute=require('./routes/usersRoute')
let busRoute=require('./routes/busesRoute')
let bookingRoute=require('./routes/bookingsRoute')

app.use('/api/user',userRoute)
app.use('/api/buses',busRoute)
app.use('/api/bookings',bookingRoute)

//const port =process.env.port||5000
app.listen(port,()=>console.log(`Node app is listinng${port}`))






