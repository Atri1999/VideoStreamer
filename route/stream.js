const fs=require('fs')
const express=require('express')
const route=express.Router()

route.get('/',(req,res)=>{
    res.render('stream')
})

route.get('/video',(req,res)=>{
    const range=req.headers.range
    if(!range){
        res.status(400).send("Require range header")
    }
    const filename="bigbuck.mp4"
    const filepath=`./videos/${filename}`
    const filesize=fs.statSync(filepath).size

    const CHUNK_SIZE=10**5
    const start=Number(range.replace(/\D/g,""))
    const end=Math.min(start+CHUNK_SIZE,filesize-1)

    const contentLength=end-start+1
    //console.log(filename.split('.')[-1])
    const headers={
        "Content-Range": `bytes ${start}-${end}/${filesize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    console.log(headers)
    res.writeHead(206,headers)

    const videostream=fs.createReadStream(filepath,{start,end})

    videostream.pipe(res)
    

    //res.send("This works")
})

module.exports=route