const exp = require("constants");
const express = require("express");
const { listen } = require("express/lib/application");
const app = express();
const port = process.env.PPRT || 4000
const hbs = require("hbs");
const async = require("hbs/lib/async");
const path = require("path");
const Sender = require("./models/sender");
const http = require("http");
require("./db/conn");

const staticpath = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../template/views");
const partialspath = path.join(__dirname, "../template/partials");
// console.log(staticpath);
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use("/animate", express.static(path.join(__dirname, "..node_modules/animate.css/animate.css")));
app.use(express.static(staticpath));
app.use(express.urlencoded({extended:false}))


app.set("view engine","hbs");
app.set("views", template_path);

hbs.registerPartials(partialspath);

// app.get(path, callback)
app.get("/", (req,res)=>{
    res.render("index");
})
app.get("/about", (req,res)=>{
    res.render("about");
})
app.get("/services", (req,res)=>{
    res.render("services");
})
app.get("/contact", (req,res)=>{
    res.render("contact");
})
app.get("/admin", (req,res)=>{
    // res.render("admin");

    Sender.find().then((result)=>{
        res.send(result);
    }).catch((e)=>{
        console.log(e);
    })
})

const server = http.createServer((req,res)=>{
    if(req.url == "/admin"){
        requests("Sender.find()").on("data",(chunk)=>{
            const objData = JSON.parse(chunk);
            const arr = [objData];
            console.log(arr[0].name);
        })
    }
})









app.post("/contact",async (req,res)=>{
    try{
        const sender = new Sender({
            name:req.body.name,
            email:req.body.email,
            subject:req.body.subject,
            msg:req.body.msg
        })
        const send = await sender.save();
        if(send){
            res.render("contact");
        }else{
            res.send("not Send......");
        }    
    } catch (e){
        res.status(400).send(e);
    }
})

// routing
// server listen
app.listen(port, ()=>{
    console.log(`Server is ready....`);
})