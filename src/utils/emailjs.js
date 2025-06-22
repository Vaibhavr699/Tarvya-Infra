import emailjs from '@emailjs/browser';

// EmailJS Configuration
// You'll need to replace these with your actual EmailJS credentials
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_smppl7q', // Use EmailJS default service
  TEMPLATE_ID: 'template_jhxrckh', // Replace with your EmailJS template ID
  PUBLIC_KEY: '_9LEacZnIyKz3vMIx', // Keep your existing public key
};

// Initialize EmailJS
export const initEmailJS = () => {
  try {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('EmailJS initialized successfully');
  } catch (error) {
    console.error('EmailJS initialization failed:', error);
  }
};

// Send email function with better error handling
export const sendEmail = async (templateParams) => {
  try {
    console.log('Sending email with params:', templateParams);
    console.log('Using config:', {
      serviceId: EMAILJS_CONFIG.SERVICE_ID,
      templateId: EMAILJS_CONFIG.TEMPLATE_ID,
      publicKey: EMAILJS_CONFIG.PUBLIC_KEY?.substring(0, 10) + '...'
    });
    
    // Add a timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 10000);
    });
    
    const emailPromise = emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    
    const response = await Promise.race([emailPromise, timeoutPromise]);
    
    console.log('EmailJS response:', response);
    
    return {
      success: true,
      message: 'Email sent successfully!',
      data: response
    };
  } catch (error) {
    console.error('EmailJS Error:', error);
    console.error('Error details:', {
      serviceId: EMAILJS_CONFIG.SERVICE_ID,
      templateId: EMAILJS_CONFIG.TEMPLATE_ID,
      publicKey: EMAILJS_CONFIG.PUBLIC_KEY?.substring(0, 10) + '...',
      errorMessage: error.message,
      errorText: error.text,
      errorStatus: error.status
    });
    
    // Provide specific error messages
    let userMessage = 'Failed to send email. Please try again.';
    
    if (error.text?.includes('SMTP: Connection timeout')) {
      userMessage = 'Email service is not connected. Please check your EmailJS configuration.';
    } else if (error.status === 400) {
      userMessage = 'Invalid email configuration. Please check your EmailJS settings.';
    } else if (error.status === 412) {
      userMessage = 'Email service connection failed. Please reconnect your email service.';
    }
    
    return {
      success: false,
      message: userMessage,
      error: error
    };
  }
};

// Helper function to format form data for EmailJS
export const formatContactFormData = (formData) => {
  return {
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone || '',
    subject: formData.subject || 'Contact Form Submission',
    message: formData.message,
    to_name: 'Tarvya Infra Team',
    reply_to: formData.email,
  };
};

// Helper function to format newsletter subscription data
export const formatNewsletterData = (email) => {
  return {
    from_name: 'Newsletter Subscriber',
    from_email: email,
    subject: 'New Newsletter Subscription',
    message: `New newsletter subscription from: ${email}`,
    to_name: 'Tarvya Infra Team',
    reply_to: email,
  };
}; 