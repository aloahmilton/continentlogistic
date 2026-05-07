export const branding = {
  primary: '#E31E24', // Brand red
  secondary: '#FFCC00', // Brand yellow
  logo: 'https://Continentlogistic.vercel.app/logo.png', // Assuming logo path
};

export const getBaseTemplate = (content: string) => `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
  <div style="background-color: ${branding.primary}; padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Continent Logistic.org</h1>
  </div>
  <div style="padding: 30px; line-height: 1.6; color: #333;">
    ${content}
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee;">
    &copy; ${new Date().getFullYear()} Continent Logistic.org Logistics. All rights reserved.<br>
    Visit us at <a href="https://Continentlogistic.com" style="color: ${branding.primary}; text-decoration: none;">Continentlogistic.com</a>
  </div>
</div>
`;

export const getShipmentCreatedTemplate = (shipment: any) => getBaseTemplate(`
  <h2 style="color: ${branding.primary};">New Shipment Created</h2>
  <p>Hello ${shipment.receiver_name},</p>
  <p>A new shipment has been created for you with tracking number: <strong style="font-size: 18px; color: ${branding.primary};">${shipment.id}</strong></p>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin: 20px 0;">
    <p style="margin: 0;"><strong>From:</strong> ${shipment.origin}</p>
    <p style="margin: 5px 0 0;"><strong>To:</strong> ${shipment.destination}</p>
    <p style="margin: 5px 0 0;"><strong>Service:</strong> ${shipment.service_type || 'Express Shipping'}</p>
  </div>
  <p>You can track your shipment anytime on our website:</p>
  <div style="text-align: center; margin: 30px 0;">
    <a href="https://Continentlogistic.vercel.app/tracking/${shipment.id}" style="background-color: ${branding.primary}; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold;">Track Shipment</a>
  </div>
  <p>Thank you for choosing Continent Logistic.org!</p>
`);

export const getAdminNotificationTemplate = (type: string, data: any) => getBaseTemplate(`
  <h2 style="color: ${branding.primary};">Admin Alert: New ${type}</h2>
  <p>A new ${type.toLowerCase()} has been received.</p>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin: 20px 0;">
    <pre style="word-break: break-all; white-space: pre-wrap;">${JSON.stringify(data, null, 2)}</pre>
  </div>
`);
