const admin = require('firebase-admin');
const express= require('express');

const app = express();
app.use(express.json());
var servicesAccount=require('./instahair-6aa4d-firebase-adminsdk-gkh7d-1a27642658.json');

admin.initializeApp({
    credential:admin.credential.cert(servicesAccount)
});

app.post('/send-noti',(req,res)=>{
    console.log(req.body['token']);
    const message={
        token:req.body['token'],
        notification:{
          body:`New Order Placed!`,
          title:"Go Car",
        }
     }
    
     admin.messaging().send(message).then(()=>{
         console.log('message send successfully');
     }).catch((error)=>{console.log(error)})
});

app.listen(3030,()=>{
    console.log('Server start suiccessfilly');
})
