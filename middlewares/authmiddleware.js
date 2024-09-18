const jsonwebtoken=require('jsonwebtoken')
module.exports=(req,res,next)=>{
   let token=req.headers.authorization.split(' ')[1]
   console.log('token is:',token)
   if(!token){
   return res.status(401).send({
        message:'auth failed',
        status:false
    })
   }
   jsonwebtoken.verify(token,process.env.secret_key,(err,data)=>{
    
     if(err){
        res.status(401).send({
            message:'auth failed',
            status:false
        })
     }
     else{
        console.log('after getting data from token:',data)
        req.user=data
        next()
     }


   })


}