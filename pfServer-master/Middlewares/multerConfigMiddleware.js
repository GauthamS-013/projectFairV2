const multer=require('multer')

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        const ff="Image"+Date.now()+file.originalname
        cb(null,ff)
    }
})

const filefilter=(req,file,cb)=>{
    console.log(file)
    if(file.mimetype=="image/jpg" || file.mimetype=="image/png" || file.mimetype=="image/jpeg"){
        cb(null,true)
    }
    else{
        console.log("unsupported file")
        cb(null,false)
    }
}

const multerMiddle=multer({
    storage,fileFilter:filefilter
})

module.exports=multerMiddle