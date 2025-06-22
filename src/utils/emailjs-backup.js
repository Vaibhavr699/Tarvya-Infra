// Backup EmailJS Configuration
// This is an alternative configuration if the main one doesn't work

import emailjs from '@emailjs/browser';

// Alternative EmailJS Configuration
export const EMAILJS_BACKUP_CONFIG = {
  // Try using EmailJS's default service
  SERVICE_ID: 'default_service', // EmailJS default service
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // Your template ID
  PUBLIC_KEY: '_9LEacZnIyKz3vMIx', // Your public key
};

// Alternative send function
export const sendEmailBackup = async (templateParams) => {
  try {
    console.log('Trying backup email service...');
    
    const response = await emailjs.send(
      EMAILJS_BACKUP_CONFIG.SERVICE_ID,
      EMAILJS_BACKUP_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_BACKUP_CONFIG.PUBLIC_KEY
    );
    
    return {
      success: true,
      message: 'Email sent successfully via backup service!',
      data: response
    };
  } catch (error) {
    console.error('Backup EmailJS Error:', error);
    return {
      success: false,
      message: 'Both email services failed. Please check your EmailJS setup.',
      error: error
    };
  }
}; 