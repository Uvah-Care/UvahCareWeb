const mongoose = require('mongoose');
let MongoDbURL='mongodb+srv://uvah_care:root@cluster0.v5y1b.mongodb.net/WebsiteData'; //mongodb url to connect to
mongoose.connect(MongoDbURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function(){
    console.log('sucessfully connected to database');
});
