const path=require("path")
const fs=require('fs')

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const { dir } = require("console");
ffmpeg.setFfmpegPath(ffmpegPath);

const direc=path.join(__dirname,'videos')

fs.readdir(direc,(err,files)=>{

    files.forEach((file)=>{
        console.log(file)
        ffmpeg({ source:__dirname+'/videos/'+file })
            .on('error',(err)=>{
                console.log("error occured"+err);
            })
            .on('end',()=>{
                console.log("completed")
            })
            .on('filenames',(filename)=>{
                console.log(filename)
            })
            .takeScreenshots({
                filename:`${file}.jpg`,
                timemarks:[5]
            },'./public/thumbnails');
    })
    
})
