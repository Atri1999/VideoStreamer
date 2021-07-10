const fs=require('fs')
const path=require('path')
const express=require('express');
const app=express();
const PORT=process.env.PORT||3000;
const stream=require('./route/stream')

app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended:false }))


app.get('/',(req,res)=>{
    const listFiles=[]
    let filePath=path.join(__dirname,'videos')
    fs.readdir(filePath,(err,files)=>{
        if (err){
            console.log(err)
        }
        else{
            //console.log(files)
            files.forEach((file)=>{
                //console.log(file)
                listFiles.push(file)
            })
            //console.log(listFiles)
            res.render('index',{listFiles})
        }
    })
    
})

app.use('/stream',stream)

app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})

