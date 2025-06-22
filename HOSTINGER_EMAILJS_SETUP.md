# 🏠 Hostinger Email + EmailJS Setup Guide

## 🎯 **Perfect for Hostinger Email Users**

This guide is specifically designed for users with Hostinger email accounts.

## 📋 **Step-by-Step Setup**

### **Step 1: EmailJS Account Setup**
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Create a free account
3. Verify your email address

### **Step 2: Use EmailJS Default Service**
1. In EmailJS dashboard, go to "Email Services"
2. You should see "default_service" already available
3. **No need to create a custom service** - EmailJS handles the email sending

### **Step 3: Create Email Template**
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template:

**Subject:** `New Contact Form Submission from {{from_name}}`

**Content:**
```html
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}
Message: {{message}}

This email was sent from your Tarvya Infra website contact form.

Best regards,
Tarvya Infra Team
```

4. **Save the template**
5. **Copy the Template ID** (looks like: `template_abc123`)

### **Step 4: Get Your Public Key**
1. Go to "Account" → "API Keys"
2. Copy your Public Key

### **Step 5: Update Your Code**
Open `src/utils/emailjs.js` and update:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'default_service',           // Keep this as is
  TEMPLATE_ID: 'template_abc123',          // Replace with your template ID
  PUBLIC_KEY: 'your_public_key_here',      // Replace with your public key
};
```

### **Step 6: Test Your Setup**
1. Save the file
2. Go to your website: `http://localhost:5173/`
3. Fill out a contact form
4. Submit and check your Hostinger email inbox

## ✅ **Why This Works with Hostinger**

- **EmailJS Default Service**: Handles all email providers automatically
- **No SMTP Configuration**: EmailJS manages the email delivery
- **Reliable**: Works with any email provider including Hostinger
- **Free Tier**: 200 emails/month included

## 🔧 **Troubleshooting**

### **If emails don't arrive:**
1. Check your Hostinger email spam folder
2. Verify your Template ID is correct
3. Make sure your Public Key is correct
4. Check EmailJS dashboard for any error messages

### **If you get errors:**
1. Make sure you're using `default_service` as SERVICE_ID
2. Verify your template variables match the form data
3. Check that your EmailJS account is active

## 📧 **Email Delivery**

- **From**: Your EmailJS account email
- **To**: Your Hostinger email address
- **Subject**: Customizable in template
- **Content**: Form data formatted as specified

## 🚀 **Benefits of This Setup**

- ✅ Works with Hostinger email
- ✅ No complex SMTP configuration
- ✅ Reliable email delivery
- ✅ Professional email templates
- ✅ Free tier available
- ✅ Easy to maintain

## 🎉 **Success Indicators**

When working correctly:
- ✅ "Email sent successfully!" message
- ✅ Email received in your Hostinger inbox
- ✅ No more SMTP timeout errors
- ✅ Professional email formatting 