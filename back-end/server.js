const express = require("express")
const mongoose = require("mongoose")
const contactModel = require("./contactModel")

const app = express()

app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({extended:false}));

const port = process.env.port || 8000
const url ="mongodb://localhost:27017/contacts"
mongoose.connect(url,{useNewUrlParser: true},()=>{
    console.log('connected to DB');
})


// Create contact
app.post("/post",async(req,res)=>{
    await contactModel.find({mail:req.body.mail}).then((data)=>{
        if(data.length){
            res.status(400).send(`user ${data} details already exists`)
        }else{
            contactModel.create({
                name:req.body.name,
                phone:req.body.phone,
                email:req.body.email,
                socialMedia:req.body.socialMedia
            }).then((contactData)=>{
                res.status(200).send(`${contactData} created sucessfully`)
            }).catch((err)=>{res.status(400).send(err)})
        }
    }).catch((err)=>{res.status(400).send(err)})
})

// search contact
app.get("/getData/:id",async(req,res)=>{
    await contactModel.find({
        "$or":[
            {"$name":{$regex:req.params.id}},
            {"$phone":{$regex:req.params.id}}
        ]
    }).then((data)=>{
        if(data.length){
            res.status(200).send(data)
        }else{
            res.status(400).send("Data not found")
        }
    }).catch((err)=>{
        res.status(400).send(err)
    })
})
// /Update request
app.put("/update/:id",async(req,res)=>{
    await contactModel.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            socialMedia:req.body.socialMedia
        }
    }).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

// delete
app.delete("/delete/:id",async(req,res)=>{
    await contactModel.remove({_id:req.params.id}).then((data)=>{
        res.status(200).send(`${data} deleted sucessfully`)
    }).catch((err)=>{res.status(400).send(err)})
})
app.listen(port,(err)=>{
    if(!err){
        console.log(`connected to ${port}`);
    }
})

