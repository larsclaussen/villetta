import { AzureFunction, Context, HttpRequest } from "@azure/functions"
const nodemailer = require('nodemailer');
const send_to = 'info@villettamaroli.com';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'vilettamaroli@gmail.com',
    pass: 'K3R4;Fg"KuNN+[C@',
  },
});

transporter.verify().then(console.log).catch(console.error);
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.');
  const name = (req.query.name || (req.body && req.body.name));
  const responseMessage = name
    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
  const email = req.body.email;
  const purpose = req.body.purpose;
  
  const question = req.body.question;
  console.log(question);
  switch (purpose) {
    case 'question':
      send_question(email, question)
      break;

    default:
      subscribe_newsletter(email)
      break;
  }

 



  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage
  };

};



function send_question(email: any, question) {
  transporter.sendMail({
    from: email, // sender address
    to: send_to, // list of receivers
    subject: "Question for " + email, // Subject line
    text: question, // plain text body
    html: question, // html body
  }).then(info => {
    console.log({ info });
  }).catch(console.error);
}


function subscribe_newsletter(email){
  transporter.sendMail({
    from: email, // sender address
    to: send_to, // list of receivers
    subject:  email+' would like to subscribe', // Subject line
    text: 'Hi Esther, '+email+ ' would like to subscribe to your email', // plain text body
    html: 'Hi Esther, '+email+ ' would like to subscribe to your email', // html body
  }).then(info => {
    console.log({ info });
  }).catch(console.error);
}

export default httpTrigger;