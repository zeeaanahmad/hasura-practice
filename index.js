let express = require('express'),cors = require('cors');
const app = express();
const schedule = require('node-schedule');
app.use(cors());
// API


// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404
// app.use((req, res, next) => {
//   next(createError(404));
// });

function sendEmail(){
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
  to: 'zeeaan@hyphen.pk',
  from: 'zeeaan@hyphen.pk', // Use the email address or domain you verified above
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
//ES6
sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });
}

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

 app.post('/sendemail', function(req, res) {
  
    var date = req.body.date;
    var time =  req.body.time;
    time = time.split(":");
    date = date.split("-")
    console.log('Got body:', date);
     
    // var date = new Date(date[0], date[1]-1, date[2], time[0], time[1], time[2]);
    // let nodeScheduler =  schedule.scheduleJob(date,  function () {
    //        sendEmail()
    //         console.log("Job started.");
    //         console.log('** do something **');
    //         console.log(`Job completed`);
    //     });
    // const job = schedule.scheduleJob('*/5 * * * * *', function(){
    //     console.log('The answer to life, the universe, and everything!');
    //   });
    res.send([test => req]);
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});