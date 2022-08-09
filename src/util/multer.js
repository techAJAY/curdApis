const multer = require('multer')


let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'_'+Date.now()+'.jpg')
    }
});
let upload = multer({storage:storage});

let imageup = express.Router().post('/',upload.single('image'),(req,res)=>{
    createClient.connect(dbUrl,(err,db)=>{
        assert.deepStrictEqual(null,err);
        insertDocuments(db,'images'+req.file.filename,()=>{
            db.close();
            res.json({'message':"file upladed successfully"});
        })
    })
})