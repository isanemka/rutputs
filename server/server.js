require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

// CORS-configuration
const corsOptions = {
  origin: ['http://localhost:9000', process.env.VITE_BACKEND_URL],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/submit-form', (req, res) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  console.log('req.body: ', req.body);

  let mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.EMAIL_TO,
    subject: 'Inskickat formulär',
    text: `Formuläret har skickats av: ${req.body.name}
  E-post: ${req.body.email}
  Telefon: ${req.body.tel}
  Adress: ${req.body.address}
  Fastighetstyp: ${req.body.propertyType}

  Tjänster kunden valt:
  ${req.body.cart
    .map((item) => `${item.quantity} : ${item.description}`)
    .join('\n  ')}
  Offertens värde: ${req.body.totalPrice} kr`,
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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
