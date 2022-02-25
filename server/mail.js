var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'azizulhasan1995@gmail.com',
    pass: 'Ahasan92@$'
  }
});


// https://www.google.com/settings/security/lesssecureapps


const sendMail = (data)=> {
    var mailOptions = {
        from: data.email,
        to: 'azizulhasan1995@gmail.com',
        subject: data.subject+" - "+data.email,
        text: data.message
      };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = {
    sendMail
}