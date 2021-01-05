const sgMail = require('@sendgrid/mail');

exports.mailer = (data, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: data.to,
    from: process.env.SENDGRID_SENDER_EMAIL, // Use the email address or domain you verified on sendgrid account
    subject: data.subject,
    text: data.text,
    html: data.html,
  };
  //ES6
  sgMail
    .send(msg)
    .then(() => { 
      return res.json({ message: "Email sent" });
    })
    .catch( error => {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    });
}
