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
function getEmailTemplate(content: string): string {
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
          background: linear-gradient(135deg, #0A4D7D 0%, #00B4D8 100%);
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
          color: #48CAE4;
          font-size: 14px;
          margin: 5px 0 0 0;
        }
        .content {
          padding: 40px 30px;
          color: #023047;
          line-height: 1.6;
        }
        .button {
          display: inline-block;
          padding: 14px 30px;
          background-color: #00B4D8;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin: 20px 0;
        }
        .footer {
          background-color: #023047;
          color: #ffffff;
          padding: 30px 20px;
          text-align: center;
          font-size: 14px;
        }
        .footer a {
          color: #48CAE4;
          text-decoration: none;
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
            <a href="https://wa.me/19014317111?text=Hi%20PeptideMint!%20I%27m%20interested%20in%20your%20research-grade%20peptides." target="_blank" style="color: #68D094; text-decoration: none;">💬 Chat on WhatsApp</a>
          </p>
          <p>
            <a href="#">Unsubscribe</a> | 
            <a href="#">Privacy Policy</a> | 
            <a href="#">Contact Us</a>
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
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"PeptideMint" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      html: getEmailTemplate(html),
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
  orderConfirmation: (orderNumber: string, items: any[], total: number) => {
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
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/track-order" class="button">Track Your Order</a>
      `,
    };
  },

  // Order confirmation (Admin)
  orderNotificationAdmin: (orderNumber: string, customerEmail: string, items: any[], total: number) => {
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
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/orders" class="button">View in Dashboard</a>
      `,
    };
  },

  // Payment details
  paymentDetails: (orderNumber: string, paymentMethod: string, paymentInstructions: string) => ({
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
    `,
  }),

  // Order status update
  orderStatusUpdate: (orderNumber: string, status: string, message: string) => ({
    subject: `Order #${orderNumber} - ${status}`,
    html: `
      <h2>Order Status Update</h2>
      <p>Your order <strong>#${orderNumber}</strong> status has been updated to: <strong>${status}</strong></p>
      <p>${message}</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/track-order" class="button">Track Your Order</a>
    `,
  }),

  // Custom reply
  customReply: (orderNumber: string, message: string) => ({
    subject: `Re: Order #${orderNumber} Inquiry`,
    html: `
      <h2>Hello,</h2>
      <p>This is a response regarding your order <strong>#${orderNumber}</strong>:</p>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; white-space: pre-wrap;">
        ${message}
      </div>
      <p>Best regards,<br>The PeptideMint Team</p>
    `,
  }),

  // Contact form response
  contactResponse: (name: string, message: string) => ({
    subject: 'Response to Your Inquiry',
    html: `
      <h2>Hello ${name},</h2>
      <p>Thank you for contacting PeptideMint. Here's our response to your inquiry:</p>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        ${message}
      </div>
      <p>If you have any further questions, please don't hesitate to reach out.</p>
    `,
  }),

  // Newsletter subscription confirmation
  newsletterSubscription: (email: string) => ({
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
      <p>Best regards,<br>The PeptideMint Team</p>
    `,
  }),
};
