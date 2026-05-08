import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.zoho.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: parseInt(process.env.SMTP_PORT || '587', 10) === 465,
  requireTLS: true,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.SMTP_USER || 'support@peptidemint.com',
    pass: process.env.SMTP_PASSWORD || '',
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

/**
 * Base email template
 */
function getEmailTemplate(content: string, appUrl?: string): string {
  const baseUrl = appUrl || process.env.NEXT_PUBLIC_APP_URL || 'https://peptidemint.com';
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PeptideMint</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', Arial, sans-serif;
          background-color: #f8f9fa;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
        }
        .header {
          background: linear-gradient(135deg, #d9046d 0%, #ff90c8 100%);
          padding: 30px 20px;
          text-align: center;
        }
        .logo {
          font-size: 32px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }
        .tagline {
          color: #fff0f5;
          font-size: 14px;
          margin: 5px 0 0 0;
        }
        .content {
          padding: 40px 30px;
          color: #4a0032;
          line-height: 1.6;
        }
        .button {
          display: inline-block;
          padding: 14px 30px;
          background-color: #d9046d;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin: 20px 0;
        }
        .button:hover {
          background-color: #c2185b;
        }
        .footer {
          background-color: #4a0032;
          color: #ffffff;
          padding: 30px 20px;
          text-align: center;
          font-size: 14px;
        }
        .footer a {
          color: #ff90c8;
          text-decoration: none;
        }
        .footer a:hover {
          color: #ff5c8d;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">PeptideMint</h1>
          <p class="tagline">Precision Peptides for Advanced Research</p>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} PeptideMint. All rights reserved.</p>
          <p>
            <a href="${baseUrl}" target="_blank">Visit Our Website</a>
          </p>
          <p>
            <a href="${baseUrl}/privacy-policy" target="_blank">Privacy Policy</a> | 
            <a href="${baseUrl}/terms" target="_blank">Terms of Service</a> | 
            <a href="${baseUrl}/contact" target="_blank">Contact Us</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send email
 */
export async function sendEmail({
  to,
  subject,
  html,
  appUrl,
}: {
  to: string;
  subject: string;
  html: string;
  appUrl?: string;
}) {
  const baseUrl = appUrl || process.env.NEXT_PUBLIC_APP_URL || 'https://peptidemint.com';
  
  try {
    const info = await transporter.sendMail({
      from: `"PeptideMint" <${process.env.SMTP_FROM || 'support@peptidemint.com'}>`,
      to,
      subject,
      html: getEmailTemplate(html, baseUrl),
    });

    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email error:', error);
    throw error;
  }
}

/**
 * Email Templates
 */
export const emailTemplates = {
  // Order confirmation (User)
  orderConfirmation: (orderNumber: string, items: any[], total: number, baseUrl: string = 'https://peptidemint.com') => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = total - subtotal;

    return {
      subject: `Order Confirmation #${orderNumber}`,
      html: `
        <h2>Thank You for Your Order!</h2>
        <p>Your order <strong>#${orderNumber}</strong> has been received and is being processed.</p>
        <h3>Order Details:</h3>
        <ul>
          ${items.map((item) => `<li>${item.name} x ${item.quantity} - $${item.price.toFixed(2)}</li>`).join('')}
        </ul>
        <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px;">
          <p style="margin: 5px 0;">Subtotal: $${subtotal.toFixed(2)}</p>
          <p style="margin: 5px 0;">Shipping: $${shipping.toFixed(2)}</p>
          <p style="font-size: 18px; font-weight: bold; margin-top: 10px;">Total: $${total.toFixed(2)}</p>
        </div>
        <h3>What's Next?</h3>
        <p>You will receive payment details shortly. Once payment is confirmed, we'll prepare your order for shipment.</p>
        <a href="${baseUrl}/track-order" class="button">Track Your Order</a>
      `,
    };
  },

  // Order confirmation (Admin)
  orderNotificationAdmin: (orderNumber: string, customerEmail: string, items: any[], total: number, baseUrl: string = 'https://peptidemint.com') => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = total - subtotal;

    return {
      subject: `New Order #${orderNumber}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Order Number:</strong> #${orderNumber}</p>
        <p><strong>Customer:</strong> ${customerEmail}</p>
        <h3>Items:</h3>
        <ul>
          ${items.map((item) => `<li>${item.name} x ${item.quantity} - $${item.price.toFixed(2)}</li>`).join('')}
        </ul>
        <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px;">
          <p style="margin: 5px 0;">Subtotal: $${subtotal.toFixed(2)}</p>
          <p style="margin: 5px 0;">Shipping: $${shipping.toFixed(2)}</p>
          <p style="font-size: 18px; font-weight: bold; margin-top: 10px;">Total: $${total.toFixed(2)}</p>
        </div>
        <a href="${baseUrl}/admin/orders" class="button">View in Dashboard</a>
      `,
    };
  },

  // Payment details
  paymentDetails: (orderNumber: string, paymentMethod: string, paymentInstructions: string, baseUrl: string = 'https://peptidemint.com') => ({
    subject: `Payment Details for Order #${orderNumber}`,
    html: `
      <h2>Payment Instructions</h2>
      <p>Thank you for your order <strong>#${orderNumber}</strong>.</p>
      <p>Please complete your payment using the following method:</p>
      <h3>${paymentMethod}</h3>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        ${paymentInstructions}
      </div>
      <p><strong>Important:</strong> Please include your order number <strong>#${orderNumber}</strong> in the payment reference.</p>
      <p>Once payment is received, we'll confirm and prepare your order for shipment.</p>
      <a href="${baseUrl}/track-order" class="button">Track Your Order</a>
    `,
  }),

  // Order status update
  orderStatusUpdate: (orderNumber: string, status: string, message: string, baseUrl: string = 'https://peptidemint.com') => ({
    subject: `Order #${orderNumber} - ${status}`,
    html: `
      <h2>Order Status Update</h2>
      <p>Your order <strong>#${orderNumber}</strong> status has been updated to: <strong>${status}</strong></p>
      <p>${message}</p>
      <a href="${baseUrl}/track-order" class="button">Track Your Order</a>
    `,
  }),

  // Custom reply
  customReply: (orderNumber: string, message: string, baseUrl: string = 'https://peptidemint.com') => ({
    subject: `Re: Order #${orderNumber} Inquiry`,
    html: `
      <h2>Hello,</h2>
      <p>This is a response regarding your order <strong>#${orderNumber}</strong>:</p>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; white-space: pre-wrap;">
        ${message}
      </div>
      <p>If you have any further questions, please don't hesitate to reach out.</p>
      <p>Best regards,<br>The PeptideMint Team</p>
      <a href="${baseUrl}/contact" class="button">Contact Us</a>
    `,
  }),

  // Contact form response
  contactResponse: (name: string, message: string, baseUrl: string = 'https://peptidemint.com') => ({
    subject: 'Response to Your Inquiry',
    html: `
      <h2>Hello ${name},</h2>
      <p>Thank you for contacting PeptideMint. Here's our response to your inquiry:</p>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        ${message}
      </div>
      <p>If you have any further questions, please don't hesitate to reach out.</p>
      <a href="${baseUrl}/contact" class="button">Contact Us</a>
    `,
  }),

  // Newsletter subscription confirmation
  newsletterSubscription: (email: string, baseUrl: string = 'https://peptidemint.com') => ({
    subject: 'Welcome to PeptideMint Newsletter!',
    html: `
      <h2>Welcome to PeptideMint!</h2>
      <p>Thank you for subscribing to our newsletter. Your email <strong>${email}</strong> has been successfully added to our mailing list.</p>
      <h3>What You'll Receive:</h3>
      <ul>
        <li>Exclusive offers and promotions</li>
        <li>New product announcements</li>
        <li>Latest updates in peptide science</li>
        <li>Research insights and educational content</li>
      </ul>
      <p>Stay tuned for exciting updates from PeptideMint!</p>
      <a href="${baseUrl}/shop" class="button">Shop Now</a>
      <p>Best regards,<br>The PeptideMint Team</p>
    `,
  }),
};
