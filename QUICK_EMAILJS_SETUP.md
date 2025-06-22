# Quick EmailJS Frontend Setup (No Backend Required)

## 🚀 5-Minute Setup

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" (Free tier: 200 emails/month)
3. Verify your email

### Step 2: Add Your Email Service
1. Dashboard → "Email Services" → "Add New Service"
2. Choose your email provider (Gmail, Outlook, etc.)
3. Follow authentication steps
4. **Copy your Service ID** (looks like: `service_abc123`)

### Step 3: Create Email Template
1. Dashboard → "Email Templates" → "Create New Template"
2. Use this template:

**Subject:** `New Contact Form Submission from {{from_name}}`

**Content:**
```
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}
Message: {{message}}

Sent from your website contact form.
```

3. **Copy your Template ID** (looks like: `template_xyz789`)

### Step 4: Get Your Public Key
1. Dashboard → "Account" → "API Keys"
2. **Copy your Public Key** (looks like: `user_public_key_123`)

### Step 5: Update Your Code
Open `src/utils/emailjs.js` and replace the placeholders:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_abc123',        // Your actual Service ID
  TEMPLATE_ID: 'template_xyz789',      // Your actual Template ID
  PUBLIC_KEY: 'user_public_key_123',   // Your actual Public Key
};
```

### Step 6: Test It!
1. Run your app: `npm run dev`
2. Fill out a contact form
3. Submit and check your email!

## 🎯 That's It!

- ✅ No backend required
- ✅ No server setup needed
- ✅ Works with static hosting (Vercel, Netlify, etc.)
- ✅ Free tier available
- ✅ Secure and reliable

## 📧 Your Forms Now Send Emails To:
- Contact form submissions → Your email inbox
- Newsletter subscriptions → Your email inbox
- All form data is captured and sent automatically

## 🔒 Security
- Public key is safe for frontend use
- No sensitive data exposed
- EmailJS handles all security

## 💡 Pro Tips
- Free tier: 200 emails/month
- Upgrade for more emails and features
- Works with any email provider
- Templates are customizable 