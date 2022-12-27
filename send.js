const Users = require('./register');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

module.exports =  {
dosomething: async function data() {

const alldata = await Users.find();
    alldata.forEach(data => {
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

      cron.schedule('* * 1 * *', () => {
   // Send e-mail
   console.log('running a task every day');
   transporter.sendMail(mailOptions, function(error, info){
         if (error) {
           console.log(error);
         } else {
           console.log('Email sent: ' + info.response);
         }
     });
   });
    });
}
}
