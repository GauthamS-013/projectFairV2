const mongoose=require('mongoose')

mongoose.connect(process.env.DATABASE).then((res)=>{
    console.log("Server connected to MongoDB")
}).catch((err)=>{
    console.log(err)
})