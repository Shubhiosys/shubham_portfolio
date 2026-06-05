import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, EMAIL_TO } = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
  console.warn('Missing SMTP environment variables. Please configure .env before starting the server.');
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT) || 587,
  secure: SMTP_SECURE === 'true',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const mailOptions = {
      from: `Portfolio Contact <${SMTP_USER}>`,
      to: EMAIL_TO || SMTP_USER,
      replyTo: email,
      subject: `🚀 New Message from Portfolio Contact: ${subject}`,
      text: `💬 New portfolio contact message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Inter, sans-serif; color: #e2e8f0; line-height: 1.6; background: #020617; padding: 24px; border-radius: 18px;">
          <h2 style="color: #7dd3fc; margin-bottom: 12px;">🚀 New Portfolio Contact Message</h2>
          <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #67e8f9; text-decoration: none;">${email}</a></p>
          <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
          <div style="margin: 18px 0; padding: 18px; background: rgba(255,255,255,0.04); border-radius: 14px;">
            <p style="margin: 0 0 8px 0; font-weight: 700; color: #c7d2fe;">💬 Message</p>
            <p style="margin: 0; white-space: pre-wrap;">${message.replace(/\n/g, '<br />')}</p>
          </div>
          <p style="margin: 16px 0 0 0; color: #94a3b8;">Sent from your portfolio contact form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    return res.status(500).json({ error: 'Failed to send your message. Please try again later.' });
  }
});

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Email server listening on http://localhost:${PORT}`);
});
