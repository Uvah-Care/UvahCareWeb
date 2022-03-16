const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 8080;
const nodemailer = require('nodemailer')
const log = console.log
const Razorpay = require('razorpay')

const pathname=path.join(__dirname + "/public")

var instance = new Razorpay({
    key_id: 'rzp_live_1kRR9IAW8oXRT4',
    key_secret: 'WDF7fn4fTm7XyuZum5eZAjm0',
  });


app.use(express.static(pathname))
app.use(express.urlencoded({extended:false}))

const mongoose=require('mongoose')
MongoDbURL='mongodb+srv://uvah_care:root@cluster0.v5y1b.mongodb.net/WebsiteData';
mongoose.connect(MongoDbURL);
var db=mongoose.connection;

db.on('error',console.error.bind(console,"Connection error : "))
db.once('open' , function (){
    console.log("Database is Ready.... ")
});

const kittySchema = new mongoose.Schema({
    name:String,
    email:String,
    ph_number:String,
    age:String,
    profession:String,
    healthResolution:String,
    wakeUpNow:String,
    wakeUpAfter:String,
    goals:String,
    expectations:String,
    sacrifice:String,
    medicalHistory:String,
    otherquestions:String
  });

app.use(express.json())


//Normal Routes

app.get('/', (req, res) => {
  res.sendFile(path.join(pathname + "/index.html"))
  res.status(200);
})
app.get('/pay/after', (req, res) => {
  res.sendFile(path.join(pathname + "/pay.html"))
  res.status(200);
})

app.get('/join', (req, res) => {
  res.sendFile(path.join(pathname + "/join.html"))
  res.status(200);
})

app.post('/log', async(req,res,next)=>{
    const Kitten = mongoose.model('form-responsse', kittySchema);
        const product = await Kitten({
            name:req.body.name,
    email:req.body.email,
    ph_number:req.body.ph_number,
    age:req.body.age,
    profession:req.body.profession,
    healthResolution:req.body.healthResolution,
    wakeUpNow:req.body.wakeUpNow,
    wakeUpAfter:req.body.wakeUpAfter,
    goals:req.body.goals,
    expectations:req.body.expectations,
    sacrifice:req.body.sacrifice,
    medicalHistory:req.body.medicalHistory,
    otherquestions:req.body.otherquestions
        })
        product.save();
        res.redirect("/pay/after")
  })

  app.post('/mail' , function(req,res){
      try {
        let transporter1 = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "healthapp.innovation@gmail.com" , 
                pass: "csmfnnnlhwffkyun" 
            }
        });
        
        let mailOptions1 = {
            from: 'healthapp.innovation@gmail.com', 
            to: `healthapp.innovation@gmail.com , ${req.body.email}`, 
            subject: 'Student form response',
            html: `  <p>Name: ${req.body.name} <br> Email: ${req.body.email}<br>  Phone Number : ${req.body.no} <br> Message: ${req.body.message} </p> <br><br><h2>We will contact you as soon as possible! Thanks for your interest!</h2>`
        };
        
        transporter1.sendMail(mailOptions1, (err, data) => {
            if (err) {
                res.send({err})
                return log('Error occurs');
            }
            else{
                
        res.redirect("/")
            }
        });
      } catch (error) {
          console.log(error)
      }

  })

  
app.post('/create/orderId', (req, res) => {
    // console.log("order request id",req.body)
    var options = {
        amount: 49900,  
        currency: "INR",
        receipt: "rcp1"
      };
      instance.orders.create(options, function(err, order) {
        // console.log(order);
        res.send({orderId:order.id})
      });
})

app.post("/api/payment/verify",(req,res)=>{

    let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
   
     var crypto = require("crypto");
     var expectedSignature = crypto.createHmac('sha256', 'WDF7fn4fTm7XyuZum5eZAjm0')
                                     .update(body.toString())
                                     .digest('hex');
                                    //  console.log("sig received " ,req.body.response.razorpay_signature);
                                    //  console.log("sig generated " ,expectedSignature);
     var response = {"signatureIsValid":"false"}
     if(expectedSignature === req.body.response.razorpay_signature)
      response={"signatureIsValid":"true"}
         res.send(response);
     });
   

app.listen(port, () => {
  console.log(`Your app listening at http://localhost:${port}`)
})