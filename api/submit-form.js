import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: process.env.AWS_REGION || 'eu-north-1' });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { name, email, tel, address, message: customerMessage, propertyType, cart, totalPrice } = req.body;

  if (!name || !email || !cart || !totalPrice) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const message = `Formuläret har skickats av: ${name}
E-post: ${email}
Telefon: ${tel}
Adress: ${address}
Fastighetstyp: ${propertyType}
${customerMessage ? `\nMeddelande från kund:\n${customerMessage}\n` : ''}
Tjänster kunden valt:
${cart.map((item) => `${item.quantity} : ${item.description}`).join('\n')}
Offertens värde: ${totalPrice} kr`;

  try {
    const data = await ses.send(
      new SendEmailCommand({
        Source: process.env.SES_FROM_EMAIL,
        Destination: { ToAddresses: [process.env.SES_TO_EMAIL] },
        Message: {
          Subject: { Data: 'Inskickat formulär', Charset: 'UTF-8' },
          Body: { Text: { Data: message, Charset: 'UTF-8' } },
        },
      })
    );

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('SES error:', error?.message || error);
    res.status(500).json({ success: false, error: error?.message || 'Unknown error' });
  }
}
