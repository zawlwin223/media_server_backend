const qr= require ("qr-image")
let raw_text=process.argv[2]
let output_img=process.argv[3]
const qr_img=qr.image(raw_text,{type:"png",size:20})
qr_img.pipe(require ("fs").createWriteStream(output_img))