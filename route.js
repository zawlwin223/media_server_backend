require('dotenv').config()
const  http=require ("http")
const url=require ("url")
const qs = require("querystring");
let responder=(res,param)=>{
        res.writeHead(200,{"Content-Type":"text/html"})
        res.end(param)
}
let method={
    "GET":{
        "/":(req,res)=>{
            responder(res,__dirname+"\\index.html")
        },
        "/home":(req,res)=>{
            responder(res,__dirname+"\\index.html")
        },
        "/about":(req,res)=>{
            responder(res,__dirname+"\\about.html")
        },
    },
    "POST":{
        "/api/login":(req,res)=>{
            let data_bag=""
            req.on("data",(data)=>{
               data_bag+=data
               if(data_bag.length>1020){
                console.log("File Size is too big")
                res.writeHead(413,{"Content-Type":"text/html"})
                res.end("File size too big")
               }
            })
            req.on("end",()=>{
               let decode_data= qs.decode(data_bag)
               console.log(decode_data)
            }) 
        },
    },
    "Na":(res)=>{
       res.writeHead(404,{"Content-Type":"text/html"})
       res.end("Server Error")
    }
        

}
let server=http.createServer((req,res)=>{
    let url_parsing=url.parse(req.url,true)
    let fun= method[req.method][url_parsing.pathname]
    if(fun!=undefined){
        fun(req,res)
        console.log(url_parsing)
    }else{
        method["Na"](res)
        
    }
    
})
server.listen(process.env.PORT,()=>{
    console.log("Server is working")
})