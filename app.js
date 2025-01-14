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
const morgan =require('morgan')
const dbConnection = require('./config/db')
const userModel =require('./models/user')
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(express.json())
app.set("view engine",'ejs');
app.use(morgan('dev'))
app.use(((req,res,next)=>{
    // console.log("this is middleware");
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
app.post('/get-form-data',(req,res)=>{
    const {username,email,password}=req.body;
    console.log(username,email,password);
    res.send('form data recieved');
})
app.get('/register',(req,res)=>{
    res.render('register')
})
//! Create a data in database => C
app.post('/register', async(req,res)=>{
    const {username,email,password}=req.body;
    const newUser=await userModel.create({
        username:username,
        email:email,
        password:password
    })
    res.send(newUser)
})

//! Read data from databade => R
app.get('/get-users',(req,res)=>{
    // userModel.find({username:"Rahul Yadav"}).then((users)=>{
    //     res.send(users)
    // })
    userModel.findOne().then((user)=>{
        res.send(user)
    })
})

//! Update data from databade => U
app.get('/update',async(req,res)=>{
    await userModel.findOneAndUpdate({username:"Rahul Yadav"},{
        email:"987t6@gmail.com"
    })
    res.send("user-updated")
})

//! Delete data from databade => D

app.get('/delete-user',async(req,res)=>{
    await userModel.findOneAndDelete({username:"Rahul Yadav"})
    res.send("user deleted")
})
app.listen(3000)