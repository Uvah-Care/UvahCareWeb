const path = require('path')
const express = require('express')
const db = require('./config/mongoose');

const Razorpay = require('razorpay');
const passport = require('passport');
const session = require('express-session');

const port = process.env.PORT || 8080;
const app = express() //launching the server

app.use(express.json()) // middleware:->parses incomming json request to req.body
app.use(session({
  secret: 'uvah-care',
  resave: false,
  saveUninitialized: true ,
  // cookie: {secure: true, maxAge: 60*60*1000}
}));

app.use(express.urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session());

// const nodemailer = require('nodemailer')
// const Razorpay = require('razorpay')
// const log = console.log


const pathname=path.join(__dirname + "/views");

// var instance = new Razorpay({
//   key_id: 'rzp_test_cnNgV26a1zX99m',
//   key_secret: 'JA9J4N3QLEcTTouuDfytaZYI',
// });

app.use(express.static("assets"));


// //...mongodb connection...
// const mongoose=require('mongoose')  //require library
// MongoDbURL='mongodb+srv://uvah_care:root@cluster0.v5y1b.mongodb.net/WebsiteData'; //mongodb url to connect to
// mongoose.connect(MongoDbURL); //connecting database
// const db=mongoose.connection; //using database connection

// db.on('error',console.error.bind(console,"Connection error ")) //if error in connection
// db.once('open' , function (){ //if connected sucessfully
//     console.log("sucessfully connected to database...")
// });


//new schema for user details
// const kittySchema = new mongoose.Schema(
//   {
//     name: String,
//     email: String,    //email:{type:String,require:true,unique:true}
//     ph_number: String,
//     age: String,  //age:{type:Number, require:true}
//     profession: String,
//     healthResolution: String,
//     wakeUpNow: String,
//     wakeUpAfter: String,
//     goals: String,
//     expectations: String,
//     sacrifice: String,
//     medicalHistory: String,
//     otherquestions: String
//   }
//   ,{
//     timestamps: true
//   });

app.set('view engine', 'ejs');
app.set('views', './views');

// //Normal ROUTES........
// app.get('/', (req, res) => {  //home page
//   res.sendFile(path.join(pathname + "/index.html"))
//   res.status(200);
// })
// app.get('/join', (req, res) => {  //Registeration page
//   console.log('entering registration page');
//   res.sendFile(path.join(pathname + "/join.html"))
//   res.status(200);
// })
// app.get('/experts', (req, res) => {  //Experts page
//   console.log('entering experts page');
//   res.send('entered experts page');
//   // res.sendFile(path.join(pathname + "/join.html"))
//   res.status(200);
// })
// app.get('/contact', (req, res) => {  //contact page
//   console.log('entering contact page');
//   res.send('entered contact page');
//   // res.sendFile(path.join(pathname + "/join.html"))
//   res.status(200);
// })
// app.get('/about', (req, res) => {  //about page
//   console.log('entering about page');
//   res.send('entered about page');
//   // res.sendFile(path.join(pathname + "/join.html"))
//   res.status(200);
// })

// app.get('/pay/after', (req, res) => { //?? maybe after payment page
//   res.sendFile(path.join(pathname + "/pay.html"))
//   res.status(200);
// })

// app.post('/log', 
//   async(req,res,next)=>{
//     const Kitten = mongoose.model('form-responsse', kittySchema);
//     const product = await Kitten(
//       {
//         name:req.body.name,
//         email:req.body.email,
//         ph_number:req.body.ph_number,
//         age:req.body.age,
//         profession:req.body.profession,
//         healthResolution:req.body.healthResolution,
//         wakeUpNow:req.body.wakeUpNow,
//         wakeUpAfter:req.body.wakeUpAfter,
//         goals:req.body.goals,
//         expectations:req.body.expectations,
//         sacrifice:req.body.sacrifice,
//         medicalHistory:req.body.medicalHistory,
//         otherquestions:req.body.otherquestions
//       }
//     )
//     product.save();
//     let x = Kitten.find({});
//     console.log(x);
//     console.log("data saved in mongo redirectiong to pay")
//     res.redirect("/pay/after");
//   });

// app.post('/mail' , 
//   function(req,res){
//     try {
//       let transporter1 = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//               user: "healthapp.innovation@gmail.com" , 
//               pass: "csmfnnnlhwffkyun" 
//           }
//       });
        
//       let mailOptions1 = {
//           from: 'healthapp.innovation@gmail.com', 
//           to: `healthapp.innovation@gmail.com , ${req.body.email}`, 
//           subject: 'Student form response',
//           html: `  <p>Name: ${req.body.name} <br> Email: ${req.body.email}<br>  Phone Number : ${req.body.no} <br> Message: ${req.body.message} </p> <br><br><h2>We will contact you as soon as possible! Thanks for your interest!</h2>`
//       };
        
//       transporter1.sendMail(mailOptions1, 
//         (err, data) => {
//           if (err) {
//               res.send({err})
//               return log('Error occurs');
//           }
//           else{      
//             res.redirect("/")
//           }
//         }
//       );
//     }
//     catch (error) {
//           console.log(error)
//     }
//   }
// );

// app.post('/create/orderId', 
//   async (req, res) => {
//     // console.log("order request id",req.body)
//     var options = {
//       amount: 49900,  
//       currency: "INR",
//       receipt: "rcp1"
//     };
//     try{
//       let order = await instance.orders.create(options)
//       console.log(order);
//       res.send( {orderId : order.id }  )
//     }
//     catch(error){
//       console.log("error in creating order:", error);
//     }
// });

// //payment verification
// app.post("/api/payment/verify",
//   (req,res)=>{
//     let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

//     var crypto = require("crypto");
//     var expectedSignature = crypto.createHmac('sha256', 'WDF7fn4fTm7XyuZum5eZAjm0')
//                                      .update(body.toString())
//                                      .digest('hex');
//                                     //  console.log("sig received " ,req.body.response.razorpay_signature);
//                                     //  console.log("sig generated " ,expectedSignature);
//     var response = {"signatureIsValid":"false"}
//     if(expectedSignature === req.body.response.razorpay_signature)
//       response={"signatureIsValid":"true"}
//     res.send(response);
//   }
// );
   

app.use('/', require('./routes/index.js'));

// running the server
app.listen(port, (error) => {
  if(error){
    console.log(`error in running file ${error}`)
  }
  console.log(`Server is running sucessfully on the port:${port} at: http://localhost:${port}`)
})