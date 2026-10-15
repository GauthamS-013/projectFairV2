import axios from "axios"

const commonApi=async(reqUrl,reqMethod,reqHeader,reqBody)=>{
    const config={
        url:reqUrl,
        method:reqMethod,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"},
        data:reqBody
    }
    return await axios(config).then(res=>res).catch(err=>{
        console.log(err)
        return err
    })
}

export default commonApi