require('dotenv').config()
const  http=require ("http")
const url=require ("url")
const qs = require("querystring")
const fs=require ("fs")
const path=require ("path")

const ext_types={
    ".html":"text/html",
    ".css":"text/css",
    ".js":"text/javascript",
    ".png":"image/png",
    ".jpg":"image/jepg",
    ".gif":"image/gif",
}

let file_handler=(file_path,res)=>{
    fs.access(file_path,fs.F_OK,(err)=>{
        let path_type=path.extname(file_path)
        if(err)throw err
        fs.readFile(file_path,(err,data)=>{
            if(err){
                res.writeHead(404,{"Content-type":"text/html"})
                res.end(err)
            }else{
                console.log(ext_types[path_type])
                res.writeHead(200,{"Content-type":ext_types[path_type]})
                res.end(data)
            }
            
        })
    })
   
    console.log(file_path)
}
let method={
    "GET":{
        "/":(req,res)=>{
            let file_path=__dirname+"\\index.html"
            file_handler(file_path,res)
        },
        "/home":(req,res)=>{
            let file_path=__dirname+"\\index.html"
            file_handler(file_path,res)
        },
        "/about":(req,res)=>{
            let file_path=__dirname+"\\about.html"
            file_handler(file_path,res)
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
        
    }else{
        method["Na"](res)
        
    }
    
})
server.listen(process.env.PORT,()=>{
    console.log("Server is working")
})