const nodemailer= require('nodemailer');
const express= require('express');
const cors = require('cors');
const dotenv=require('dotenv');
const bodyparser= require('body-parser');
const app= express();

dotenv.config({
    path:"./.env"
});

 app.use(cors({origin:"*"}));
 app.use(bodyparser.json());

 app.post("/email",(req,res)=>{
    let user=req.body;
        sendMail(user);
 });

 app.post("/newOrders",(req,res)=>{

    let orderDetails=req.body;

    newOrderMail(orderDetails);
 });
 app.post("/cancelOrders",(req,res)=>{

    let cancelOrderDetails=req.body;
    cancelOrderMail(cancelOrderDetails);
 });
 app.post("/deliveredOrders",(req,res)=>{

    let deliveredOrderDetails=req.body;
    deliveredOrderMail(deliveredOrderDetails);
 });

 async function sendMail(user){
    var transporter = nodemailer.createTransport({
        host: process.env.HostName,
        port: process.env.Port,
        secure:false,
        auth:{
            user:process.env.UserEmail,
            pass:process.env.UserPassword
        }
    });

    var mailoptions={
        from:process.env.UserEmail,
        to:user.email,
        subject:'FOOD COURT REGISTRATION',
        html:`<div style="padding:25px; background:white; display:flex; justify-content:center; align-items:center;">
        <div style="width:40rem;background:white;">
        <img src="https://live.staticflickr.com/65535/53399378535_3c84d675d5_m.jpg" width="100px" height="100px" style="margin-left:100px"><br>
        <h4 style="color:black;margin-left:30px;"> Hi <b>${user.userName}</b>, <br><br> Welcome to the FoodCourt online food ordering webiste. You just created your FoodCourt account, we served variety of foods from the various hotels order and try it...</h4>
        <br><br><p style="color:black;margin-left:30px;font-weight:bold;">Thanks,<br> Team FoodCourt</p>
        </div>
        </div>
        `
    };

    transporter.sendMail(mailoptions,function(err,info){
        if(err) throw err;
        console.log('email sent :'+info.response);
});
}




async function newOrderMail(orderDetails){
    var transporter = nodemailer.createTransport({
        host: process.env.HostName,
        port: process.env.port,
        secure:false,
        auth:{
            user:process.env.UserEmail,
            pass:process.env.UserPassword
        }
    });

    var mailoptions={
        from:process.env.UserEmail,
        to:orderDetails.email,
        subject:'FOOD COURT ORDER DETAILS',
        html:`<div style="padding:25px; background:white; display:flex; justify-content:center; align-items:center;">
        <div style="width:40rem;background:white;">
        <img src="https://live.staticflickr.com/65535/53399378535_3c84d675d5_m.jpg" width="100px" height="100px" style="margin-left:30px"><br>
        <h4 style="margin-left:30px;"> Hi <b>${orderDetails.userName}</b>, <br><br>Welcome to the FoodCourt. Thanks for ordering in our FoodCourt. Your orderId is <b>#${orderDetails.orderId}</b>. You ordered in the hotel  <b>${orderDetails.hotelName}</b>
         at the price of <b>₹ ${orderDetails.totalPrice}</b>.</h4>
         <h4 style="margin-left:30px;">Payment Type: <b>${orderDetails.paymentType}</b></h4><br>
         <h4 style="margin-left:30px;">ordered date: <b>${orderDetails.orderDate[0]}, ${orderDetails.orderDate[1]}</b></h4>
        <br><p style="color:black;margin-left:30px;font-weight:bold;">Thanks,<br> Team FoodCourt</p>
        </div>
        </div>
        `
    };

    transporter.sendMail(mailoptions,function(err,info){
        if(err) throw err;
        console.log('email sent :'+info.response);
});
}



async function cancelOrderMail(cancelOrderDetails){
    var transporter = nodemailer.createTransport({
        host: process.env.HostName,
        port: process.env.port,
        secure:false,
        auth:{
            user:process.env.UserEmail,
            pass:process.env.UserPassword
        }
    });

    var mailoptions={
        from:process.env.UserEmail,
        to:cancelOrderDetails.email,
        subject:'FOOD COURT CANCELLED ORDER DETAILS',
        html:`<div style="padding:25px; background:white; display:flex; justify-content:center; align-items:center;">
        <div style="width:40rem;background:white;">
        <img src="https://live.staticflickr.com/65535/53399378535_3c84d675d5_m.jpg" width="100px" height="100px" style="margin-left:30px"><br>
        <h4 style="margin-left:30px;"> Hi <b>${cancelOrderDetails.userName}</b>, <br><br>Welcome to the FoodCourt. Your order will be cancelled and if you paid the amount means we refund it within 2 business days. Your orderId is <b>#${cancelOrderDetails.orderId}</b>. You ordered in the hotel  <b>${cancelOrderDetails.hotelName}</b>
         at the price of <b>₹ ${cancelOrderDetails.totalPrice}</b>.</h4><br>
         <h4 style="margin-left:30px;">ordered date: <b>${cancelOrderDetails.orderDate[0]}, ${cancelOrderDetails.orderDate[1]}</b></h4>
        <br><p style="color:black;margin-left:30px;font-weight:bold;">Thanks,<br> Team FoodCourt</p>
        </div>
        </div>
        `
    };

    transporter.sendMail(mailoptions,function(err,info){
        if(err) throw err;
        console.log('email sent :'+info.response);
});
}


async function deliveredOrderMail(deliveredOrderDetails){
    var transporter = nodemailer.createTransport({
        host: process.env.HostName,
        port: process.env.port,
        secure:false,
        auth:{
            user:process.env.UserEmail,
            pass:process.env.UserPassword
        }
    });

    var mailoptions={
        from:process.env.UserEmail,
        to:deliveredOrderDetails.email,
        subject:'FOOD COURT DELIVERED ORDER DETAILS',
        html:`<div style="padding:25px; background:white; display:flex; justify-content:center; align-items:center;">
        <div style="width:40rem;background:white;">
        <img src="https://live.staticflickr.com/65535/53399378535_3c84d675d5_m.jpg" width="100px" height="100px" style="margin-left:30px"><br>
        <h4 style="margin-left:30px;"> Hi <b>${deliveredOrderDetails.userName}</b>, <br><br>Welcome to the FoodCourt.We hope you received your order. Your orderId is <b>#${deliveredOrderDetails.orderId}</b>. You ordered in the hotel  <b>${deliveredOrderDetails.hotelName}</b>
         at the price of <b>₹ ${deliveredOrderDetails.totalPrice}</b>.</h4><br>
         <h4 style="margin-left:30px;">Drop your FeedBack here,</h4>
         <a style="margin-left:30px;text-decoration:none;color: orange; font-weight:bold;" href="http://localhost:4200/FeedBack">Click Here</a>
         <h4 style="margin-left:30px;">ordered date: <b>${deliveredOrderDetails.orderDate[0]}, ${deliveredOrderDetails.orderDate[1]}</b></h4>
         <h4 style="margin-left:30px;">delivered date: <b>${deliveredOrderDetails.deliveryDate[0]}, ${deliveredOrderDetails.deliveryDate[1]}</b></h4>
        <br><p style="color:black;margin-left:30px;font-weight:bold;">Thanks,<br> Team FoodCourt</p>
        </div>
        </div>
        `
    };

    transporter.sendMail(mailoptions,function(err,info){
        if(err) throw err;
        console.log('email sent :'+info.response);
});
}




app.listen(2300,()=>{
    console.log("port connected");
})