const bcrypt= require ("bcrypt")
const saltRound=10
exports.hashing_password=(()=>{
    bcrypt.hash("Zawlwinp223",saltRound)
    .then((hash)=>{console.log(hash)
     bcrypt.compare("Zawlwinp223",hash).then((result)=>{console.log(result)})
    })
  
})