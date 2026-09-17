require('dotenv').config();

const path = require('path');
const express = require('express');
const { Resend } = require('resend');

const app = express();
const port = process.env.PORT || 3000;

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const toEmail = process.env.CONTACT_TO_EMAIL || 'info@lminventories.co.uk';
const fromEmail = process.env.CONTACT_FROM_EMAIL || 'enquiries@lminventories.co.uk';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/enquiry', async (req, res) => {
  const { name, email, phone, address, service, message } = req.body || {};

  if (!name || !email || !address) {
    return res.status(400).json({ error: 'Please fill in your name, email and property address.' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (!resend) {
    console.error('Enquiry received but RESEND_API_KEY is not configured:', { name, email, address });
    return res.status(500).json({ error: 'Sorry, enquiries cannot be sent right now. Please email info@lminventories.co.uk directly.' });
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Property address: ${address}`,
    `Service: ${service || 'Not specified'}`,
    '',
    'Additional information:',
    message || 'None provided',
  ];

  try {
    await resend.emails.send({
      from: `L&M Inventories website <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: lines.join('\n'),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Failed to send enquiry email:', err);
    return res.status(500).json({ error: 'Sorry, something went wrong sending your enquiry. Please email info@lminventories.co.uk directly.' });
  }
});

app.listen(port, () => {
  console.log(`L&M Inventories site running on port ${port}`);
});
