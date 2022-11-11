const http=require ("http")
const url=require ("url")
const ext=require("path")
const fs=require ("fs")


const ext_types={
    ".html":"text/html",
    ".css":"text/css",
    ".js":"text/javascript",
    ".png":"image/png",
    ".jpg":"image/jepg",
    ".gif":"image/gif",
}
let acess_file=(filepath)=>{
    return new Promise((resolve,reject)=>{
        fs.access(filepath,fs.F_OK,(err)=>{
           if(err)
           {reject(err)}
           else
           {resolve(filepath)}

        })
        
    })
}
let readFile=(filepath)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(filepath,(err,data)=>{
            if(!err){
                
                resolve(data)
              
            }else{
                
               reject(err)
            }
        })
    })
}
let server=http.createServer((req,res)=>{
    let param=url.parse(req.url,true)
    let path_name=param.pathname=="/"?"/index.html":param.pathname
    let file__path=__dirname+path_name
    let file_ext=ext.extname(file__path)
    acess_file(file__path)
    .then(readFile)
    .then((data)=>{
        res.writeHead(200,{"Content-type":ext_types[file_ext]})
        res.end(data)
    })
    .catch(err=>{
        res.writeHead(404,{"Content-type":"text/html"})
        res.end(err)
    })
       
    
})
server.listen(3000,()=>{
    console.log("Server is working")
})
