// EmailJS Test Utility
// Use this to test your EmailJS configuration

import emailjs from '@emailjs/browser';

export const testEmailJS = async () => {
  const testConfig = {
    SERVICE_ID: 'YOUR_SERVICE_ID',
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID', 
    PUBLIC_KEY: '_9LEacZnIyKz3vMIx'
  };

  const testParams = {
    from_name: 'Test User',
    from_email: 'test@example.com',
    phone: '1234567890',
    subject: 'Test Email',
    message: 'This is a test email from your website.'
  };

  try {
    console.log('Testing EmailJS configuration...');
    console.log('Config:', testConfig);
    console.log('Test params:', testParams);

    const response = await emailjs.send(
      testConfig.SERVICE_ID,
      testConfig.TEMPLATE_ID,
      testParams,
      testConfig.PUBLIC_KEY
    );

    console.log('✅ EmailJS test successful!', response);
    return { success: true, message: 'Test email sent successfully!' };
  } catch (error) {
    console.error('❌ EmailJS test failed:', error);
    return { 
      success: false, 
      message: `Test failed: ${error.message || error.text || 'Unknown error'}`,
      error: error
    };
  }
};

// Add this to your browser console to test:
// import { testEmailJS } from './src/utils/emailjs-test.js';
// testEmailJS().then(console.log); 