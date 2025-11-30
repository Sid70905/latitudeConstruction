# Email Setup Guide for Quote Requests

Your Latitude Construction website now sends automated email notifications when customers request detailed quotes. Follow these steps to set it up.

## ✅ Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up with your email (free tier includes 200 emails/month)
3. Click "Create Service" or go to Dashboard > Services

### Step 2: Create Email Service
1. In Services tab, click "Create New Service"
2. Choose "Gmail" or "SMTP" (Gmail is easiest)
3. For Gmail:
   - Enter your Gmail address
   - Allow EmailJS access to your account
   - Copy the Service ID (e.g., `service_abc123xyz`)

### Step 3: Create Email Templates
1. Go to Dashboard > Email Templates
2. Click "Create New Template"

**Template 1: Quote Notification (for your company)**
- Template ID: `quote_notification`
- To Email: {{to_email}} (will be info@latitudeconstruction.com)
- Subject: `New Quote Request - {{from_name}}`
- Template Content:
```
Hello Team,

New quote request received from your website:

CUSTOMER DETAILS:
Name: {{from_name}}
Email: {{from_email}}
Phone: {{customer_phone}}
City: {{customer_city}}
Preferred Location: {{customer_location}}

CALCULATOR DETAILS:
Land Area: {{land_area}} SFT
Package: {{package}}

ESTIMATE:
Monthly EMI: {{emi_amount}}
Total Amount: {{total_amount}}

Please follow up with this customer.

Regards,
Latitude Construction Website
```

**Template 2: Customer Confirmation**
- Template ID: `customer_confirmation`
- To Email: {{to_email}} (customer's email)
- Subject: `Your Construction Quote - Latitude Construction`
- Template Content:
```
Hello {{customer_name}},

Thank you for requesting a quote from Latitude Construction!

We received your quote request with the following details:
Monthly EMI: {{emi_amount}}
Total Project Amount: {{total_amount}}

Our team will review your requirements and send you a detailed quote within 24 hours. You can also reach us at:
📞 +91 96061 25333
💬 https://wa.me/919606125333

Best regards,
Latitude Construction Team
```

### Step 4: Get Your Credentials
1. Go to Account > Integrations
2. Copy your **Public Key**
3. Go back to Services and copy your **Service ID**

### Step 5: Update the Code
Open `assets/js/script.js` and find this section (around line 230):

```javascript
// Initialize EmailJS with your public key
emailjs.init('YOUR_PUBLIC_KEY');
```

Replace `YOUR_PUBLIC_KEY` with your actual public key.

Then find these lines:
```javascript
emailjs.send('SERVICE_ID', 'TEMPLATE_ID', templateParams)
```

Replace:
- `SERVICE_ID` → Your actual Service ID
- `TEMPLATE_ID` → `quote_notification`
- `CUSTOMER_CONFIRMATION_TEMPLATE_ID` → `customer_confirmation`

### Step 6: Update Company Email
In `assets/js/script.js`, find this line:

```javascript
to_email: 'info@latitudeconstruction.com' // Your company email
```

Replace with your actual company email address where you want to receive quotes.

---

## 🔧 Configuration Example

**Before:**
```javascript
emailjs.init('YOUR_PUBLIC_KEY');
// ...
emailjs.send('SERVICE_ID', 'TEMPLATE_ID', templateParams)
```

**After:**
```javascript
emailjs.init('pk_live_abc123xyz789def456');
// ...
emailjs.send('service_abc123xyz', 'quote_notification', templateParams)
// ...
emailjs.send('service_abc123xyz', 'customer_confirmation', customerTemplateParams)
```

---

## 📧 How It Works

### When a customer clicks "Get Detailed Quote":
1. Modal popup opens asking for their details (name, email, phone, city)
2. They fill in the form and submit
3. **Two emails are sent automatically:**
   - Email 1: To your company (info@latitudeconstruction.com) with full quote details
   - Email 2: To customer's email confirming we received their request
4. Modal closes and form resets

### Email Content Includes:
- Customer name, email, phone, city
- All calculator inputs (land area, floors, package, interest rate, etc.)
- Complete cost breakdown (EMI, total cost, total interest, etc.)

---

## 🚀 Testing

### To test your setup:
1. Go to your website
2. Fill in the calculator form (all fields must have values)
3. Click "Get Detailed Quote"
4. Enter test details:
   - Name: Test User
   - Email: your-test-email@gmail.com
   - Phone: 9999999999
   - City: Test City
5. Submit the form
6. You should receive the email within 30 seconds

Check both:
- ✅ Your company email inbox
- ✅ Your test email inbox (for customer confirmation)

---

## ❓ Troubleshooting

### "Error sending quote"
**Possible causes:**
1. PUBLIC_KEY not set correctly → Check step 5
2. SERVICE_ID not set correctly → Check step 5
3. TEMPLATE_ID doesn't match → Make sure template names match exactly
4. Gmail service not connected → Reconnect in EmailJS dashboard

**Solution:**
1. Check browser console for errors (Press F12)
2. Compare your IDs with EmailJS dashboard
3. Verify email addresses in templates

### "Emails not received"
**Possible causes:**
1. Using Gmail → check Spam folder
2. Service not connected → Reconnect in EmailJS
3. Monthly limit exceeded → Upgrade account

**Solution:**
1. Check spam/promotions folder
2. Go to EmailJS Dashboard > Services > Verify service is active
3. Check EmailJS quota (Dashboard > Pricing)

### "Modal won't close"
**Solution:**
1. Press Escape key to close
2. Click outside the modal
3. Check browser console for errors

---

## 💳 Pricing & Limits

### Free Plan (Recommended):
- 200 emails/month
- Perfect for small/medium projects
- No credit card required

### Paid Plans:
- **Pro**: $9.99/month - 10,000 emails
- **Business**: $19.99/month - 100,000 emails

View pricing at: https://www.emailjs.com/pricing

---

## 🔒 Security Notes

1. **Public Key is public** - It's safe to have it in your code
2. **Service IDs are public** - Used to identify your email service
3. **Private Keys** - Never share these in code
4. **CORS enabled** - EmailJS automatically handles browser security
5. **Rate limiting** - Free tier limited to 200/month (upgrade if needed)

---

## ✅ Complete Setup Checklist

- [ ] Created EmailJS account at emailjs.com
- [ ] Created email service (Gmail/SMTP)
- [ ] Created "quote_notification" template
- [ ] Created "customer_confirmation" template
- [ ] Copied PUBLIC_KEY from Integrations
- [ ] Copied SERVICE_ID from Services
- [ ] Updated PUBLIC_KEY in script.js
- [ ] Updated SERVICE_ID in script.js
- [ ] Updated TEMPLATE_IDs in script.js
- [ ] Updated to_email to your company email
- [ ] Tested with test quote request
- [ ] Verified emails received in both inboxes
- [ ] Checked spam folder if not received
- [ ] Deployed website with updated code

---

## 📞 Support

If you need help:
1. Check EmailJS docs: https://www.emailjs.com/docs/
2. Contact EmailJS support: https://www.emailjs.com/support
3. Contact Latitude Construction: +91 96061 25333

---

## 📝 File Changes Summary

Modified files:
- ✅ `index.html` - Added EmailJS library and modal form
- ✅ `assets/css/style.css` - Added modal styling
- ✅ `assets/js/script.js` - Added email sending logic

No backend required - everything runs in the browser!

**Status:** Ready for email configuration ✅
