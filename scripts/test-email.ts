import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'support@peptidemint.com',
    pass: 'xdWg 4fhE Tp2Y',
  },
});

async function testEmail() {
  console.log('Testing email...');
  
  try {
    const info = await transporter.sendMail({
      from: '"PeptideMint" <support@peptidemint.com>',
      to: 'support@peptidemint.com',
      subject: 'Test Email from PeptideMint',
      html: '<h2>Test Email</h2><p>If you received this, the email system is working!</p>',
    });
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Email failed:', error);
  }
  
  process.exit(0);
}

testEmail();