import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { name, email, tel, address, propertyType, cart, totalPrice } = req.body;

  if (!name || !email || !cart || !totalPrice) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const message = `Formuläret har skickats av: ${name}
E-post: ${email}
Telefon: ${tel}
Adress: ${address}
Fastighetstyp: ${propertyType}

Tjänster kunden valt:
${cart.map((item) => `${item.quantity} : ${item.description}`).join('\n')}
Offertens värde: ${totalPrice} kr`;

  try {
    const data = await resend.emails.send({
      from: 'Rutputs <form@rutputs.nu>',
      to: process.env.EMAIL_TO,
      subject: 'Inskickat formulär',
      text: message,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Resend error:', error?.message || error);
    res.status(500).json({ success: false, error: error?.message || 'Unknown error' });
  }
}
