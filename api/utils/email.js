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
    from: `"Continent Logistic.org" <${process.env.EMAIL_USER || 'statenumberss@gmail.com'}>`,
    to: shipment.receiver.email,
    replyTo: process.env.ADMIN_NOTIFICATION_EMAIL || 'Continentlogistic01@gmail.com',
    subject: `Electronic Tracking Advice: ${shipment.trackingNumber}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 4px; background-color: #ffffff;">
        <!-- Header -->
        <div style="background-color: #E31E24; padding: 30px; text-align: left;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">Continent Logistic.org</h1>
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
            <a href="https://Continentlogistic.vercel.app/tracking/${shipment.trackingNumber}" 
               style="background-color: #1a1a1a; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 4px; font-weight: 700; font-size: 14px; display: inline-block;">
               TRACK SHIPMENT STATUS
            </a>
          </div>

          <p style="font-size: 13px; color: #666; margin-top: 30px;">
            This is an automated advisory. Please do not reply directly to this email. For assistance, visit our <a href="https://Continentlogistic.vercel.app/customer-service" style="color: #E31E24; text-decoration: underline;">customer portal</a>.
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f5f5f5; padding: 25px 30px; text-align: center; border-top: 1px solid #eeeeee;">
          <p style="margin: 0; font-size: 11px; color: #888888; font-weight: 600;">
            &copy; 2026 Continent Logistic.org Logistics AG. Global Headquarters &bull; Excellence in Motion.
          </p>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

export const sendAdminShipmentNotification = async (shipment, adminUser) => {
  const mailOptions = {
    from: `"System Alerts" <${process.env.EMAIL_USER || 'statenumberss@gmail.com'}>`,
    to: process.env.ADMIN_NOTIFICATION_EMAIL || 'Continentlogistic01@gmail.com',
    subject: `New Shipment Created: ${shipment.trackingNumber}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-top: 4px solid #E31E24; border-radius: 8px;">
        <h2 style="color: #1a1a1a; margin-top: 0;">System Log: New Shipment Registered</h2>
        <p style="font-size: 14px; color: #666;">A new shipment has been successfully created by an authorized administrator.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px;">
          <tr style="background: #f5f5f5;"><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Performed By</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${adminUser.name} (${adminUser.email})</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Tracking Number</td><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #E31E24;">${shipment.trackingNumber}</td></tr>
          <tr style="background: #f5f5f5;"><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Receiver</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${shipment.receiver.name} (${shipment.receiver.email})</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Route</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${shipment.origin} to ${shipment.destination}</td></tr>
          <tr style="background: #f5f5f5;"><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Service Type</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${shipment.serviceType || 'Standard Express'}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Timestamp</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${new Date().toLocaleString()}</td></tr>
        </table>
        
        <p style="margin-top: 25px; font-size: 11px; color: #999;">Continent Logistic.org Logistics Group &bull; Internal Audit Notification</p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

export const sendAdminLeadNotification = async (lead) => {
  const mailOptions = {
    from: `"Continent Logistic.org Alerts" <${process.env.EMAIL_USER || 'statenumberss@gmail.com'}>`,
    to: process.env.ADMIN_NOTIFICATION_EMAIL || 'Continentlogistic01@gmail.com',
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
    from: `"Continent Logistic.org Support" <${process.env.EMAIL_USER || 'statenumberss@gmail.com'}>`,
    to,
    replyTo: process.env.ADMIN_NOTIFICATION_EMAIL || 'Continentlogistic01@gmail.com',
    subject: subject || "Update regarding your shipment",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1a1a1a; padding: 20px; color: white;">
          <h2 style="margin: 0;">Continent Logistic.org</h2>
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
          Continent Logistic.org &bull; Customer Communication Portal
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};
export const sendInvoiceEmail = async (shipment, invoiceData) => {
  const mailOptions = {
    from: `"Continent Logistic.org Billing" <${process.env.EMAIL_USER || 'statenumberss@gmail.com'}>`,
    to: shipment.receiver.email,
    replyTo: process.env.ADMIN_NOTIFICATION_EMAIL || 'Continentlogistic01@gmail.com',
    subject: `Business Invoice - Shipment ${shipment.trackingNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #333;">
        <div style="background-color: #E31E24; padding: 40px; color: white; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="margin: 0; font-size: 24px;">INVOICE</h1>
            <p style="margin: 5px 0 0; opacity: 0.8; font-size: 12px;">Ref: ${shipment.trackingNumber}</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; font-weight: bold;">Continent Logistic.org</p>
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
            <p><strong>Note:</strong> Continent Logistic.org Logistics Group operates under standard international shipping terms. All charges are in USD unless otherwise specified.</p>
          </div>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

export const sendShipmentUpdateEmail = async (shipment, update, adminUser) => {
  const statusLabels = {
    'pending': 'Pending',
    'picked_up': 'Package Picked Up',
    'in_transit': 'In Transit',
    'arrived': 'Arrived at Facility',
    'out_for_delivery': 'Out for Delivery',
    'delivered': 'Successfully Delivered',
    'on_hold': 'On Hold / Delayed',
    'returned': 'Returned to Sender',
    'paused': 'Paused / Verification Required'
  };

  const statusColor = update.isCritical ? '#E31E24' : '#1a1a1a';
  const statusLabel = statusLabels[update.status] || update.status;

  // 1. Customer Email
  const customerMailOptions = {
    from: `"Continent Logistic.org" <${process.env.EMAIL_USER || 'statenumberss@gmail.com'}>`,
    to: shipment.receiver.email,
    replyTo: process.env.ADMIN_NOTIFICATION_EMAIL || 'Continentlogistic01@gmail.com',
    subject: `${update.isCritical ? 'ACTION REQUIRED: ' : ''}Shipment ${shipment.trackingNumber} - ${statusLabel}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
        <div style="background-color: ${statusColor}; padding: 25px; color: white;">
          <h2 style="margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">Shipment Update Advice</h2>
          <p style="margin: 5px 0 0; opacity: 0.8; font-size: 12px;">Ref: ${shipment.trackingNumber}</p>
        </div>
        <div style="padding: 30px; line-height: 1.6; color: #333;">
          <p>Dear ${shipment.receiver.name},</p>
          <p>There has been a new update regarding your shipment currently in our network. Please find the latest status details below:</p>
          
          <div style="margin: 25px 0; padding: 20px; background-color: #f9f9f9; border-left: 4px solid ${statusColor}; border-radius: 4px;">
            <p style="margin: 0; font-size: 11px; text-transform: uppercase; color: #666; font-weight: bold;">Current Status</p>
            <p style="margin: 5px 0 15px; font-size: 18px; font-weight: bold; color: ${statusColor};">${statusLabel}</p>
            
            <p style="margin: 0; font-size: 11px; text-transform: uppercase; color: #666; font-weight: bold;">Location</p>
            <p style="margin: 5px 0 15px; font-size: 14px; font-weight: 600;">${update.location || shipment.currentLocation || 'In Transit'}</p>
            
            <p style="margin: 0; font-size: 11px; text-transform: uppercase; color: #666; font-weight: bold;">Event Details</p>
            <p style="margin: 5px 0 0; font-size: 14px; color: #444;">${update.description || 'Movement registered in system.'}</p>
          </div>

          ${update.isCritical ? `
          <div style="margin: 20px 0; padding: 15px; background-color: #FFF5F5; border: 1px solid #FEB2B2; border-radius: 4px;">
            <p style="margin: 0; color: #C53030; font-weight: bold; font-size: 14px;">⚠️ Action Required</p>
            <p style="margin: 5px 0 0; font-size: 12px; color: #742A2A;">This is a critical update. Please review the details above as they may require your prompt attention or contact with our support team.</p>
          </div>
          ` : ''}

          <div style="text-align: center; margin-top: 35px;">
            <a href="https://Continentlogistic.vercel.app/tracking/${shipment.trackingNumber}" 
               style="background-color: #1a1a1a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 13px; display: inline-block;">
               VIEW FULL TRACKING HISTORY
            </a>
          </div>
        </div>
        <div style="padding: 20px; background-color: #f5f5f5; text-align: center; font-size: 11px; color: #888; border-top: 1px solid #eee;">
          Continent Logistic.org Logistics Group &bull; Corporate Communications
        </div>
      </div>
    `
  };

  // 2. Admin Email
  const adminMailOptions = {
    from: `"System Logs" <${process.env.EMAIL_USER || 'statenumberss@gmail.com'}>`,
    to: process.env.ADMIN_NOTIFICATION_EMAIL || 'Continentlogistic01@gmail.com',
    subject: `ADMIN LOG: Shipment Update - ${shipment.trackingNumber}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #1a1a1a; margin-top: 0;">Update Recorded</h2>
        <p style="font-size: 14px; color: #666;">The following shipment update was performed by an authorized user.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px;">
          <tr style="background: #f5f5f5;"><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Performed By</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${adminUser.name} (${adminUser.email})</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Shipment ID</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${shipment.trackingNumber}</td></tr>
          <tr style="background: #f5f5f5;"><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">New Status</td><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: ${statusColor};">${statusLabel}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Location</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${update.location || 'N/A'}</td></tr>
          <tr style="background: #f5f5f5;"><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Description</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${update.description || 'No description provided'}</td></tr>
          <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Is Critical?</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${update.isCritical ? 'Yes (Urgency Alert Sent to Client)' : 'No'}</td></tr>
          <tr style="background: #f5f5f5;"><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Timestamp</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${new Date().toLocaleString()}</td></tr>
        </table>
        
        <p style="margin-top: 25px; font-size: 11px; color: #999;">Continent Logistic.org Control Panel &bull; Internal Audit Notification</p>
      </div>
    `
  };

  try {
    await Promise.all([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);
    return true;
  } catch (err) {
    console.error('Mail sending error:', err);
    return false;
  }
};
