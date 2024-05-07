require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/submit-form', (req, res) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.simply.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  console.log('req.body: ', req.body);

  let mailOptions = {
    from: 'form@rutputs.nu',
    to: 'anton@rutputs.nu',
    subject: 'Inskickat formulär',
    text: `Formuläret har skickats av: ${req.body.name}
  E-post: ${req.body.email}
  Telefon: ${req.body.tel}
  Adress: ${req.body.address}
  Fastighetstyp: ${req.body.propertyType}

  Tjänster du valt:
  ${req.body.cart
    .map((item) => `Antal: ${item.quantity}, Beskrivning: ${item.description}`)
    .join('\n  ')}
  Totalt: ${req.body.totalPrice} kr`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      res.status(200).send('Email sent: ' + info.response);
    }
  });
});

app.listen(8000, () => console.log('Server running on port 8000'));
