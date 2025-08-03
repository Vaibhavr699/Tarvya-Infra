# Nodemailer Setup Guide

This guide will help you replace EmailJS with Nodemailer for more reliable email sending.

## 🚀 Quick Setup

### 1. Backend Setup

1. **Install backend dependencies:**
   ```bash
   # Copy the server-package.json to package.json in a new backend folder
   mkdir backend
   cd backend
   # Copy server-package.json content to package.json
   npm install
   ```

2. **Create environment file:**
   ```bash
   # Create .env file in backend folder
   cp env-template.txt .env
   # Edit .env with your email credentials
   ```

3. **Configure email credentials:**
   - For Gmail: Enable 2FA and generate App Password
   - For other providers: Use your email/password

4. **Start the backend:**
   ```bash
   npm run dev  # Development
   npm start    # Production
   ```

### 2. Frontend Updates

Your Contact component has been updated to use the new API. The changes include:
- Replaced EmailJS imports with Nodemailer API
- Updated form submission logic
- Added API connection testing

### 3. Environment Variables

Create a `.env` file in your backend folder:

```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 📧 Email Provider Setup

### Gmail (Recommended)
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable 2-Factor Authentication
3. Generate App Password: [App Passwords](https://myaccount.google.com/apppasswords)
4. Use the generated password in `EMAIL_PASS`

### Outlook/Hotmail
```env
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

### Custom SMTP
```env
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_USER=your-email@your-domain.com
EMAIL_PASS=your-password
```

## 🚀 Deployment Options

### Option 1: Vercel + Railway
- Frontend: Deploy to Vercel
- Backend: Deploy to Railway (free tier available)

### Option 2: Netlify + Render
- Frontend: Deploy to Netlify
- Backend: Deploy to Render (free tier available)

### Option 3: Full-stack on Railway
- Deploy both frontend and backend to Railway

## 🔧 Configuration

### Update API URL for Production
In `src/utils/nodemailer-api.js`, update the `API_BASE_URL`:

```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-domain.com' // Your actual backend URL
  : 'http://localhost:5000';
```

### CORS Configuration
The backend is configured to accept requests from your frontend domain. Update the CORS settings in `server.js` if needed.

## 🧪 Testing

1. **Test backend locally:**
   ```bash
   cd backend
   npm run dev
   # Visit http://localhost:5000/api/health
   ```

2. **Test email sending:**
   - Fill out the contact form on your website
   - Check your email for the test message

3. **Test API connection:**
   - Open browser console
   - The component will automatically test the API connection

## 🔒 Security Features

- Input validation on both frontend and backend
- CORS protection
- Environment variable protection
- Error handling and logging
- Rate limiting (can be added)

## 📊 Benefits of Nodemailer over EmailJS

✅ **More Reliable**: Direct SMTP connection
✅ **Better Control**: Full control over email sending
✅ **Cost Effective**: No monthly fees
✅ **Better Security**: Your own email credentials
✅ **Customizable**: Full control over email templates
✅ **Production Ready**: Used by millions of applications

## 🐛 Troubleshooting

### Common Issues:

1. **Authentication Failed**
   - Check your email credentials
   - For Gmail: Use App Password, not regular password
   - Enable "Less secure app access" (not recommended)

2. **CORS Errors**
   - Check that your backend URL is correct
   - Verify CORS configuration in server.js

3. **Email Not Sending**
   - Check server logs for detailed error messages
   - Verify email provider settings
   - Test with a simple email client first

### Debug Commands:
```bash
# Test backend health
curl http://localhost:5000/api/health

# Test email sending
curl -X POST http://localhost:5000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

## 📝 Next Steps

1. Set up your email credentials
2. Test the backend locally
3. Deploy the backend to your chosen platform
4. Update the frontend API URL for production
5. Test the complete flow

Need help? Check the server logs for detailed error messages! 