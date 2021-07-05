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
    res.render('index')
})

app.use('/stream',stream)

app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})

