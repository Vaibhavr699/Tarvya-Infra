# EmailJS 412 Error Troubleshooting Guide

## What is Error 412?
A 412 error from EmailJS means "Precondition Failed" - typically indicating that the email service is not properly connected or configured.

## Quick Fix Steps

### 1. Reconnect Your Email Service
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to "Email Services"
3. Find your email service (Gmail, Outlook, etc.)
4. Click "Reconnect" or "Disconnect" then "Connect"
5. Follow the authentication process

### 2. Verify Your Credentials
Check these in your `src/utils/emailjs.js` file:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id', // From EmailJS Dashboard > Email Services
  TEMPLATE_ID: 'your_template_id', // From EmailJS Dashboard > Email Templates
  PUBLIC_KEY: 'your_public_key', // From EmailJS Dashboard > Account > API Keys
};
```

### 3. Check Your Email Template Variables
Make sure your EmailJS template variables match what you're sending:

**Template should have these variables:**
- `{{from_name}}`
- `{{from_email}}`
- `{{message}}`
- `{{to_name}}`
- `{{reply_to}}`

**Your code sends:**
```javascript
{
  from_name: formData.name,
  from_email: formData.email,
  message: formData.message,
  to_name: 'Tarvya Infra Team',
  reply_to: formData.email,
}
```

### 4. Test Your Configuration

Run this in your browser console to test:

```javascript
// Test EmailJS connection
import { testEmailJSConnection } from './src/utils/emailjs.js';
testEmailJSConnection().then(console.log);
```

## Common Issues and Solutions

### Issue 1: Gmail Service Not Connected
**Solution:**
1. Go to EmailJS Dashboard > Email Services
2. Disconnect Gmail service
3. Reconnect with proper OAuth2 authentication
4. Make sure to grant all necessary permissions

### Issue 2: Template Variables Mismatch
**Solution:**
1. Check your EmailJS template variables
2. Make sure they match exactly what your code sends
3. Case-sensitive variables must match exactly

### Issue 3: Invalid Credentials
**Solution:**
1. Regenerate your Public Key in EmailJS Dashboard
2. Update the PUBLIC_KEY in your code
3. Verify Service ID and Template ID are correct

### Issue 4: Email Service Provider Issues
**Solution:**
1. Try switching to a different email service (Gmail to Outlook)
2. Check if your email provider has any restrictions
3. Verify your email account is active and accessible

## Debug Steps

### Step 1: Check Browser Console
Open browser console and look for:
- ✅ EmailJS initialized successfully
- ✅ EmailJS connection test successful
- ❌ Any error messages

### Step 2: Test with Minimal Data
```javascript
// Test with minimal data
const testParams = {
  from_name: 'Test User',
  from_email: 'test@example.com',
  message: 'Test message',
  to_name: 'Test Team'
};
```

### Step 3: Verify Network Requests
1. Open Browser DevTools > Network tab
2. Submit the contact form
3. Look for the request to `api.emailjs.com`
4. Check the response status and body

## Alternative Solutions

### Option 1: Use EmailJS Default Service
If your custom service isn't working, try the default EmailJS service:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'default_service', // Use EmailJS default
  TEMPLATE_ID: 'your_template_id',
  PUBLIC_KEY: 'your_public_key',
};
```

### Option 2: Switch to Nodemailer Backend
If EmailJS continues to have issues, you can switch to the Nodemailer backend:

1. Update your Contact component to use `nodemailer-api.js`
2. Set up your backend server with proper email configuration
3. Use environment variables for email credentials

### Option 3: Use a Different Email Service
Consider switching to:
- SendGrid
- Mailgun
- AWS SES
- Or other reliable email services

## Prevention Tips

1. **Regular Testing**: Test your email functionality regularly
2. **Backup Configuration**: Keep backup email configurations
3. **Error Monitoring**: Monitor for email errors in production
4. **Service Health**: Check EmailJS service status regularly

## Getting Help

If the issue persists:
1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. Contact EmailJS support
3. Check EmailJS status page for service issues
4. Consider switching to a different email solution

## Quick Fix Checklist

- [ ] Reconnect email service in EmailJS dashboard
- [ ] Verify Service ID, Template ID, and Public Key
- [ ] Check template variables match your code
- [ ] Test with minimal data
- [ ] Check browser console for errors
- [ ] Verify network requests in DevTools
- [ ] Try default EmailJS service
- [ ] Consider switching to backend email solution 