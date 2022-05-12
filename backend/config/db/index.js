const mongoose = require('mongoose');

require('dotenv').config()
const uri = process.env.DB;
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Connextion établie');
})
.catch((err)=>{
    console.log(''+err);
})
module.exports.mongoose;
