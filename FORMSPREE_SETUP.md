# Formspree Setup Guide

## What is Formspree?
Formspree is a simple, reliable form handling service that sends form submissions directly to your email without requiring any backend setup.

## Advantages over EmailJS
- ✅ **No configuration issues** - Works out of the box
- ✅ **No email service connections** - No need to connect Gmail, Outlook, etc.
- ✅ **Better reliability** - Fewer 412 errors and connection issues
- ✅ **Simpler setup** - Just replace the endpoint URL
- ✅ **Built-in spam protection** - Automatic spam filtering
- ✅ **Multiple form support** - Create separate endpoints for different forms

## Setup Steps

### 1. Create a Formspree Account
1. Go to [Formspree.io](https://formspree.io/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Your First Form
1. In your Formspree dashboard, click "New Form"
2. Give it a name like "Tarvya Contact Form"
3. Copy the form endpoint URL (e.g., `https://formspree.io/f/xpzgqjqr`)

### 3. Update Your Configuration
Replace the endpoint in `src/utils/formspree.js`:

```javascript
export const FORMSPREEE_CONFIG = {
  ENDPOINT: 'https://formspree.io/f/YOUR_FORM_ID', // Replace with your actual endpoint
  CONTACT_ENDPOINT: 'https://formspree.io/f/YOUR_CONTACT_FORM_ID',
  INTERIOR_ENDPOINT: 'https://formspree.io/f/YOUR_INTERIOR_FORM_ID',
};
```

### 4. Test Your Form
1. Submit a test form from your website
2. Check your email for the submission
3. Check the Formspree dashboard for the submission

## Creating Multiple Forms

### Contact Form
1. Create a new form in Formspree
2. Name it "Contact Form"
3. Use the endpoint in your Contact component

### Interior Work Form
1. Create another form in Formspree
2. Name it "Interior Work Inquiries"
3. Use the endpoint in your InteriorWork page

### Newsletter Signup
1. Create a third form in Formspree
2. Name it "Newsletter Signup"
3. Use the endpoint for newsletter subscriptions

## Form Configuration Options

### Basic Form (HTML)
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="email" name="email" placeholder="Your Email" required>
  <textarea name="message" placeholder="Your Message" required></textarea>
  <button type="submit">Send Message</button>
</form>
```

### JavaScript Form (React)
```javascript
import { sendFormData, formatContactFormData } from '../utils/formspree';

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const result = await sendFormData({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });
  
  if (result.success) {
    // Show success message
  }
};
```

## Advanced Features

### Custom Email Subject
```javascript
{
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello',
  _subject: 'New Contact Form Submission - Tarvya Infra',
}
```

### Reply-To Email
```javascript
{
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello',
  _replyto: 'john@example.com',
}
```

### HTML Email Format
```javascript
{
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello',
  _format: 'html',
}
```

### Honeypot Spam Protection
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="text" name="_gotcha" style="display:none">
  <!-- Your other form fields -->
</form>
```

## Email Templates

### Contact Form Email
You'll receive emails like this:
```
From: john@example.com
Subject: New Contact Form Submission - Tarvya Infra

Name: John Doe
Email: john@example.com
Message: I'm interested in your properties...

Reply to this email to respond directly to the sender.
```

### Interior Work Email
```
From: jane@example.com
Subject: New Interior Design Inquiry - Tarvya Infra

Name: Jane Smith
Email: jane@example.com
Project Type: Living Room Design
Message: I need help with my living room...

Reply to this email to respond directly to the sender.
```

## Dashboard Features

### View Submissions
1. Go to your Formspree dashboard
2. Click on your form
3. View all submissions in real-time
4. Export submissions as CSV

### Email Notifications
1. You'll receive emails for each submission
2. Configure notification settings in dashboard
3. Set up different email addresses for different forms

### Spam Protection
1. Formspree automatically filters spam
2. View spam submissions in dashboard
3. Manually approve/reject submissions

## Troubleshooting

### Form Not Working
1. Check the endpoint URL is correct
2. Verify the form has required fields
3. Check browser console for errors
4. Test with a simple HTML form first

### Not Receiving Emails
1. Check your spam folder
2. Verify your email address in Formspree
3. Check form submission in dashboard
4. Test with a different email address

### Rate Limiting
1. Free plan has 50 submissions per month
2. Upgrade to paid plan for more submissions
3. Check usage in dashboard

## Migration from EmailJS

### Step 1: Update Imports
```javascript
// Old EmailJS import
import { sendEmail, formatContactFormData } from '../utils/emailjs';

// New Formspree import
import { sendFormData, formatContactFormData } from '../utils/formspree';
```

### Step 2: Update Function Calls
```javascript
// Old EmailJS call
const result = await sendEmail(templateParams);

// New Formspree call
const result = await sendFormData(formData);
```

### Step 3: Update Error Handling
```javascript
if (result.success) {
  toast.success("Form submitted successfully!");
} else {
  toast.error(result.message);
}
```

## Best Practices

1. **Use descriptive form names** in Formspree dashboard
2. **Add required fields** to prevent empty submissions
3. **Use custom subjects** to identify form types
4. **Test forms regularly** to ensure they work
5. **Monitor dashboard** for spam and issues
6. **Backup form endpoints** in case of changes

## Security Features

- ✅ **CSRF Protection** - Built-in protection
- ✅ **Spam Filtering** - Automatic spam detection
- ✅ **Rate Limiting** - Prevents abuse
- ✅ **Email Verification** - Ensures valid sender
- ✅ **HTTPS Only** - Secure connections

## Support

If you need help:
1. Check [Formspree Documentation](https://formspree.io/help/)
2. Contact Formspree support
3. Check the troubleshooting section above
4. Test with a simple HTML form first 