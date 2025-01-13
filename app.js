// const http=require('http')
// const server=http.createServer((req,res)=>{
//     // res.end('Hello World')
//     // console.log(req.url);
//     if(req.url=="/"){
//         res.end('This is Home page')
//     }
//     if(req.url=="/about"){
//         res.end('This is about page')
//     }
//     if(req.url=="/profile"){
//         res.end('This is profile page')
//     }
//     if(req.url=="/contact"){
//         res.end('This is contact page')
//     }
// })

// server.listen(3000);


const express=require('express');
const app=express();
app.set("view engine",'ejs');
app.use(((req,res,next)=>{
    console.log("this is middleware");
    return next();
}))
app.get('/',(req,res)=>{
    res.render('index')
    })
app.get('/about',(req,res)=>{
    res.send('This is about page');
})
app.get('/profile',(req,res)=>{
    res.send('This is profile page');
})
app.listen(3000)