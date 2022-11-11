let http=require ("http")
require ("dotenv").config()
let pass=require ("./luke's library/index")
let server=http.createServer((req,res)=>{
 pass.hashing_password()
})
server.listen(process.env.PORT,()=>{ 
  console.log("Server is working")
})