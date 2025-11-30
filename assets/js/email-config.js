/**
 * CONFIGURATION FILE - EmailJS Setup
 * Update these values with your EmailJS credentials
 */

const EMAIL_CONFIG = {
  // Get this from EmailJS Dashboard > Account > Integrations
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
  
  // Get this from EmailJS Dashboard > Services
  SERVICE_ID: 'SERVICE_ID',
  
  // Template IDs (these are the names you set in EmailJS)
  TEMPLATES: {
    QUOTE_NOTIFICATION: 'quote_notification',
    CUSTOMER_CONFIRMATION: 'customer_confirmation'
  },
  
  // Your company email (where quotes will be sent)
  COMPANY_EMAIL: 'info@latitudeconstruction.com',
  
  // Company details (for customer confirmation)
  COMPANY_NAME: 'Latitude Construction',
  COMPANY_PHONE: '+91 96061 25333',
  COMPANY_WHATSAPP: 'https://wa.me/919606125333'
};

/**
 * HOW TO SET UP:
 * 
 * 1. Go to https://www.emailjs.com/
 * 2. Create an account (free)
 * 3. Create a service (Gmail or SMTP)
 * 4. Create two email templates:
 *    - quote_notification (for your company)
 *    - customer_confirmation (for customer)
 * 5. Get your PUBLIC_KEY and SERVICE_ID
 * 6. Update the values above
 * 
 * For detailed instructions, see EMAIL_SETUP.md
 */
