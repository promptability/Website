// Simplified email service - we'll just log emails for now since email is optional
export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(template: EmailTemplate) {
  // Email service not configured - silent success for production
  // TODO: Configure SMTP service (Gmail, SendGrid, etc.) for production
  
  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 Email would be sent:');
    console.log('To:', template.to);
    console.log('Subject:', template.subject);
  }
  
  return { success: true, messageId: 'mock-id' };
}

// Email templates
export const emailTemplates = {
  welcomeEmail: (name: string, planName: string) => ({
    subject: 'Welcome to Promptability!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Promptability, ${name}!</h2>
        <p>Thank you for subscribing to our ${planName} plan.</p>
        <p>You now have access to all the premium features:</p>
        <ul>
          <li>Unlimited prompt optimizations</li>
          <li>Advanced AI modes</li>
          <li>Priority support</li>
          <li>And much more!</li>
        </ul>
        <p>Get started by installing our browser extension:</p>
        <a href="https://chrome.google.com/webstore" style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px;">Install Extension</a>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The Promptability Team</p>
      </div>
    `,
    text: `Welcome to Promptability, ${name}! Thank you for subscribing to our ${planName} plan.`,
  }),

  subscriptionCanceled: (name: string) => ({
    subject: 'Your Promptability subscription has been canceled',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Subscription Canceled</h2>
        <p>Hi ${name},</p>
        <p>Your Promptability subscription has been canceled as requested.</p>
        <p>You'll continue to have access to premium features until the end of your current billing period.</p>
        <p>We're sorry to see you go! If you change your mind, you can reactivate your subscription anytime from your account dashboard.</p>
        <p>If you have any feedback about why you're leaving, we'd love to hear from you.</p>
        <p>Best regards,<br>The Promptability Team</p>
      </div>
    `,
    text: `Hi ${name}, Your Promptability subscription has been canceled as requested.`,
  }),

  paymentFailed: (name: string) => ({
    subject: 'Payment Failed - Action Required',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d32f2f;">Payment Failed</h2>
        <p>Hi ${name},</p>
        <p>We were unable to process your payment for your Promptability subscription.</p>
        <p>To continue enjoying premium features, please update your payment method:</p>
        <a href="https://promptability.ai/account" style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px;">Update Payment Method</a>
        <p>If you don't update your payment method within 7 days, your subscription will be suspended.</p>
        <p>If you need help, please contact our support team.</p>
        <p>Best regards,<br>The Promptability Team</p>
      </div>
    `,
    text: `Hi ${name}, We were unable to process your payment for your Promptability subscription. Please update your payment method.`,
  }),

  invoiceReceipt: (name: string, amount: string, date: string) => ({
    subject: 'Your Promptability Receipt',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Payment Receipt</h2>
        <p>Hi ${name},</p>
        <p>Thank you for your payment. Here are the details:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Amount:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${amount}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Date:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${date}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Service:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">Promptability Premium</td>
          </tr>
        </table>
        <p>You can view your billing history and manage your subscription in your account dashboard.</p>
        <a href="https://promptability.ai/account" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px;">View Account</a>
        <p>Thank you for being a valued customer!</p>
        <p>Best regards,<br>The Promptability Team</p>
      </div>
    `,
    text: `Hi ${name}, Thank you for your payment of ${amount} on ${date}.`,
  }),
};