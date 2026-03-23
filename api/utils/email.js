import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'statenumberss@gmail.com',
    pass: process.env.EMAIL_PASS || 'mpsb qspx qtka tqkc'
  }
});

export const sendShipmentEmail = async (shipment) => {
  const mailOptions = {
    from: `"Continental Track" <${process.env.EMAIL_USER || 'statenumberss@gmail.com'}>`,
    to: shipment.receiver.email,
    subject: `Electronic Tracking Advice: ${shipment.trackingNumber}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 4px; background-color: #ffffff;">
        <!-- Header -->
        <div style="background-color: #E31E24; padding: 30px; text-align: left;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">CONTINENTAL TRACK</h1>
          <p style="color: #ffffff; margin: 5px 0 0; font-size: 12px; font-weight: 600; text-transform: uppercase;">Global Logistics & Supply Chain</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px; color: #333333; line-height: 1.6;">
          <h2 style="font-size: 20px; margin-top: 0; color: #1a1a1a;">Shipment Notification</h2>
          <p>Dear ${shipment.receiver.name},</p>
          <p>A new consignment has been registered for delivery to your address. Please find your tracking details below for real-time monitoring of your parcels progress.</p>
          
          <div style="margin: 30px 0; background-color: #f9f9f9; border-left: 4px solid #E31E24; padding: 20px; border-radius: 2px;">
            <p style="margin: 0; font-size: 11px; text-transform: uppercase; color: #666; font-weight: bold;">Tracking ID</p>
            <p style="margin: 2px 0 15px; font-size: 24px; font-weight: 800; color: #E31E24; font-family: monospace;">${shipment.trackingNumber}</p>
            
            <table style="width: 100%; font-size: 14px;">
              <tr><td style="padding: 4px 0; color: #666;">Origin:</td><td style="padding: 4px 0; font-weight: 600;">${shipment.origin}</td></tr>
              <tr><td style="padding: 4px 0; color: #666;">Destination:</td><td style="padding: 4px 0; font-weight: 600;">${shipment.destination}</td></tr>
              <tr><td style="padding: 4px 0; color: #666;">Service:</td><td style="padding: 4px 0; font-weight: 600;">${shipment.serviceType}</td></tr>
            </table>
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <a href="https://continentaltrack.vercel.app/tracking/${shipment.trackingNumber}" 
               style="background-color: #1a1a1a; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 4px; font-weight: 700; font-size: 14px; display: inline-block;">
               TRACK SHIPMENT STATUS
            </a>
          </div>

          <p style="font-size: 13px; color: #666; margin-top: 30px;">
            This is an automated advisory. Please do not reply directly to this email. For assistance, visit our <a href="https://continentaltrack.vercel.app/customer-service" style="color: #E31E24; text-decoration: underline;">customer portal</a>.
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f5f5f5; padding: 25px 30px; text-align: center; border-top: 1px solid #eeeeee;">
          <p style="margin: 0; font-size: 11px; color: #888888; font-weight: 600;">
            &copy; 2026 Continental Track Logistics AG. Global Headquarters &bull; Excellence in Motion.
          </p>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

export const sendAdminLeadNotification = async (lead) => {
  const mailOptions = {
    from: `"Continental Track Alerts" <${process.env.EMAIL_USER || 'statenumberss@gmail.com'}>`,
    to: process.env.ADMIN_NOTIFICATION_EMAIL || 'continentaltrack01@gmail.com',
    subject: `New Business Lead: ${lead.name}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #E31E24;">New Quote Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td><td style="padding: 8px; border: 1px solid #ddd;">${lead.name}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${lead.email}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #ddd;">${lead.phone || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Service</td><td style="padding: 8px; border: 1px solid #ddd;">${lead.serviceType}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Route</td><td style="padding: 8px; border: 1px solid #ddd;">${lead.fromLocation} to ${lead.toLocation}</td></tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; border: 1px solid #ddd; border-left: 4px solid #E31E24;">
          <strong>Customer Message:</strong><br>${lead.message || 'No message provided.'}
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

export const sendCustomEmail = async (to, subject, message, shipmentId = null) => {
  const mailOptions = {
    from: `"Continental Track Support" <${process.env.EMAIL_USER || 'statenumberss@gmail.com'}>`,
    to,
    subject: subject || "Update regarding your shipment",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1a1a1a; padding: 20px; color: white;">
          <h2 style="margin: 0;">Continental Track</h2>
        </div>
        <div style="padding: 30px; line-height: 1.6;">
          <p>${message}</p>
          ${shipmentId ? `
            <div style="margin-top: 30px; padding: 15px; background: #f9f9f9; border-radius: 4px;">
              <small style="color: #666;">Reference Tracking Number:</small><br>
              <strong>${shipmentId}</strong>
            </div>
          ` : ''}
        </div>
        <div style="padding: 20px; background: #f5f5f5; text-align: center; font-size: 12px; color: #888;">
          Continental Track &bull; Customer Communication Portal
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};
export const sendInvoiceEmail = async (shipment, invoiceData) => {
  const mailOptions = {
    from: `"Continental Track Billing" <${process.env.EMAIL_USER || 'statenumberss@gmail.com'}>`,
    to: shipment.receiver.email,
    subject: `Business Invoice - Shipment ${shipment.trackingNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #333;">
        <div style="background-color: #E31E24; padding: 40px; color: white; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="margin: 0; font-size: 24px;">INVOICE</h1>
            <p style="margin: 5px 0 0; opacity: 0.8; font-size: 12px;">Ref: ${shipment.trackingNumber}</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; font-weight: bold;">Continental Track</p>
            <p style="margin: 0; font-size: 11px;">Excellence in Motion</p>
          </div>
        </div>

        <div style="padding: 40px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
            <div style="width: 48%;">
              <h3 style="font-size: 12px; text-transform: uppercase; color: #888; margin-bottom: 10px;">Billed To</h3>
              <p style="margin: 0; font-weight: bold;">${shipment.receiver.name}</p>
              <p style="margin: 0; font-size: 13px;">${shipment.receiver.email}</p>
              <p style="margin: 0; font-size: 13px;">${shipment.destination}</p>
            </div>
            <div style="width: 48%; text-align: right;">
              <h3 style="font-size: 12px; text-transform: uppercase; color: #888; margin-bottom: 10px;">Invoice Details</h3>
              <p style="margin: 0; font-size: 13px;">Date: ${new Date().toLocaleDateString()}</p>
              <p style="margin: 0; font-size: 13px;">Due Date: Net 15</p>
            </div>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
            <thead style="background-color: #f5f5f5;">
              <tr>
                <th style="padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; border-bottom: 2px solid #eee;">Service Description</th>
                <th style="padding: 12px; text-align: right; font-size: 12px; text-transform: uppercase; border-bottom: 2px solid #eee;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 15px 12px; border-bottom: 1px solid #eee;">
                  <p style="margin: 0; font-weight: bold;">${shipment.serviceType} Logistics Service</p>
                  <p style="margin: 5px 0 0; font-size: 12px; color: #666;">Route: ${shipment.origin} to ${shipment.destination}</p>
                  <p style="margin: 2px 0 0; font-size: 12px; color: #666;">Weight: ${shipment.weight} kg</p>
                </td>
                <td style="padding: 15px 12px; border-bottom: 1px solid #eee; text-align: right; vertical-align: top;">
                  $${invoiceData.amount || '0.00'}
                </td>
              </tr>
              ${invoiceData.tax ? `
              <tr>
                <td style="padding: 15px 12px; text-align: right; color: #888;">Tax (VAT)</td>
                <td style="padding: 15px 12px; text-align: right;">$${invoiceData.tax}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 15px 12px; text-align: right; font-weight: bold; font-size: 18px;">Total Due</td>
                <td style="padding: 15px 12px; text-align: right; font-weight: bold; font-size: 18px; color: #E31E24;">$${invoiceData.total || invoiceData.amount}</td>
              </tr>
            </tbody>
          </table>

          <div style="background-color: #f9f9f9; padding: 25px; border-radius: 4px; text-align: center;">
            <p style="margin: 0 0 15px; font-size: 14px;">Please complete the payment to ensure smooth processing of your clearance.</p>
            <a href="#" style="background-color: #E31E24; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px; display: inline-block;">
              DOWNLOAD PDF INVOICE
            </a>
          </div>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 11px; color: #999; line-height: 1.5;">
            <p><strong>Note:</strong> Continental Track Logistics Group operates under standard international shipping terms. All charges are in USD unless otherwise specified.</p>
          </div>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};
