import nodemailer from 'nodemailer';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, EMAIL_TO } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
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

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

  try {
    await transporter.sendMail({
      from: `Portfolio Contact <${SMTP_USER}>`,
      to: EMAIL_TO || SMTP_USER,
      replyTo: email,
      subject: `New Message from Portfolio Contact: ${subject}`,
      text: `New portfolio contact message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #e2e8f0; line-height: 1.6; background: #020617; padding: 24px; border-radius: 18px;">
          <h2 style="color: #7dd3fc; margin-bottom: 12px;">New Portfolio Contact Message</h2>
          <p style="margin: 8px 0;"><strong>Name:</strong> ${safeName}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #67e8f9; text-decoration: none;">${safeEmail}</a></p>
          <p style="margin: 8px 0;"><strong>Subject:</strong> ${safeSubject}</p>
          <div style="margin: 18px 0; padding: 18px; background: rgba(255,255,255,0.04); border-radius: 14px;">
            <p style="margin: 0 0 8px 0; font-weight: 700; color: #c7d2fe;">Message</p>
            <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p style="margin: 16px 0 0 0; color: #94a3b8;">Sent from your portfolio contact form.</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    return res.status(500).json({ error: 'Failed to send your message. Please try again later.' });
  }
}
