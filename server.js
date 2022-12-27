const { urlencoded } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Users = require('./register');
const send = require('./send');
const moment = require('moment');
const nodemailer = require('nodemailer');

mongoose.set('strictQuery', false);
mongoose.connect('process.env.URL',
 {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connected');
})

app.set('view engine', 'ejs');
app.use(urlencoded({extended: true}));


send.dosomething();
app.get('/', (req, res) => {
    res.render('home');
})


app.post('/', async (req, res) => {
    console.log(Users.length);
    try {
    const data = new Users({
        email: req.body.email
    })

   const key = await data.save();
   res.redirect('/');


   let mailOptions = {
    from: 'youremail',
    to: data.email,
    subject: 'Email from Node-App: A Test Message!',
    text: 'Some content to send'
};
// e-mail transport configuration
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail',
      pass: 'yourpassword'
    }
});

transporter.sendMail(mailOptions, (e, resu) => {
  if(e) {
    console.log(e);
  }
  else{
    console.log(resu);
  }
})

}
catch(e) {
    console.log(e);
}
})

app.get('/admin', async (req, res) => {
    const allusers = await Users.find().sort({createdAt: -1});
    console.log(allusers);
    res.render('admin', {data: allusers, moment: moment});
})

app.listen(3000);
