# 🔧 EmailJS SMTP Connection Fix

## 🚨 **Current Issue: SMTP Connection Timeout**

Your EmailJS service is not properly connected, causing the "SMTP: Connection timeout" error.

## 🛠️ **Quick Fix Steps**

### **Step 1: Check EmailJS Dashboard**
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Login to your account
3. Click "Email Services" in the left sidebar

### **Step 2: Check Service Status**
- Look for your email service (Gmail, Outlook, etc.)
- **If it shows RED or DISCONNECTED**: Follow Step 3
- **If it shows GREEN or CONNECTED**: Try Step 4

### **Step 3: Reconnect Your Email Service**
1. Click on your email service
2. Click "Reconnect" or "Update"
3. Follow the authentication steps:
   - **For Gmail**: Enable 2FA and use App Password
   - **For Outlook**: Use your regular password
   - **For other services**: Follow their specific instructions
4. Click "Save" or "Connect"

### **Step 4: Test the Connection**
1. In EmailJS dashboard, go to "Email Templates"
2. Click on your template
3. Click "Test" button
4. Enter a test email address
5. Click "Send Test Email"

### **Step 5: Alternative - Create New Service**
If reconnecting doesn't work:

1. **Delete the old service** (if it exists)
2. **Add New Service** → Choose your email provider
3. **Follow authentication steps**
4. **Copy the new Service ID**
5. **Update your code** with the new Service ID

## 🔄 **Update Your Code**

If you get a new Service ID, update `src/utils/emailjs.js`:

```javascript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_new_service_id',  // Update this
  TEMPLATE_ID: 'template_jhxrckh',    // Keep this
  PUBLIC_KEY: '_9LEacZnIyKz3vMIx',    // Keep this
};
```

## 🧪 **Test Your Fix**

1. Save your changes
2. Go to your website: `http://localhost:5173/`
3. Fill out a contact form
4. Submit and check the console for success message

## 🆘 **Still Not Working?**

### **Try These Alternatives:**

1. **Use a different email provider** (if using Gmail, try Outlook)
2. **Check your email provider's security settings**
3. **Make sure you're not hitting rate limits**
4. **Contact EmailJS support** if issues persist

### **Common Email Provider Settings:**

**Gmail:**
- Enable 2-Factor Authentication
- Generate App Password
- Use App Password instead of regular password

**Outlook/Hotmail:**
- Use regular password
- Make sure "Less secure apps" is enabled (if applicable)

**Yahoo:**
- Generate App Password
- Use App Password instead of regular password

## ✅ **Success Indicators**

When working correctly, you should see:
- ✅ "EmailJS initialized successfully" in console
- ✅ "Email sent successfully!" message
- ✅ Email received in your inbox
- ✅ No more SMTP timeout errors 