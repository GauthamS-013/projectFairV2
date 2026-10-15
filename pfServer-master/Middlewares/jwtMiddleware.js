const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1]
    const user=jwt.verify(token,process.env.SECRET_KEY)
    console.log(user)
    req.payload=user.userId
    next()
    }
    catch(e){
        console.log(e)
        res.status(400).json(e)
    }
}

module.exports=jwtMiddleware