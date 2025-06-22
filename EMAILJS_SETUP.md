# EmailJS Setup Guide

This guide will help you set up EmailJS to receive form submissions via email.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```html
Subject: New Contact Form Submission from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}
Message: {{message}}

This email was sent from your website contact form.
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to "Account" → "API Keys"
2. Copy your **Public Key** (e.g., `user_public_key_123`)

## Step 5: Update Configuration

1. Open `src/utils/emailjs.js`
2. Replace the placeholder values with your actual credentials:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_service_id_here', // e.g., 'service_abc123'
  TEMPLATE_ID: 'your_template_id_here', // e.g., 'template_xyz789'
  PUBLIC_KEY: 'your_public_key_here', // e.g., 'user_public_key_123'
};
```

## Step 6: Test Your Setup

1. Start your development server: `npm run dev`
2. Fill out and submit a contact form
3. Check your email to see if you receive the form submission

## Additional Templates

### Newsletter Subscription Template

Create a separate template for newsletter subscriptions:

```html
Subject: New Newsletter Subscription

Email: {{from_email}}

A new user has subscribed to your newsletter.

This email was sent from your website newsletter form.
```

## Troubleshooting

- **Emails not sending**: Check your EmailJS credentials and make sure they're correct
- **Template variables not working**: Make sure the variable names in your template match the ones in the `formatContactFormData` function
- **Service not working**: Verify your email service is properly connected in EmailJS dashboard

## Security Notes

- The public key is safe to use in client-side code
- Never expose your private keys
- EmailJS has rate limits on free accounts (200 emails/month)

## Support

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Community: [https://www.emailjs.com/community/](https://www.emailjs.com/community/) 