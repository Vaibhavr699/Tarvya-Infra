// Nodemailer API Utility
// This replaces EmailJS with a custom backend API

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-domain.com' // Replace with your actual backend URL
  : 'http://localhost:5000';

// Send email function using our backend API
export const sendEmail = async (formData) => {
  try {
    console.log('Sending email via backend API...');
    console.log('Form data:', formData);
    
    const response = await fetch(`${API_BASE_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to send email');
    }

    console.log('✅ Email sent successfully via API!', result);
    
    return {
      success: true,
      message: result.message || 'Email sent successfully!',
      data: result
    };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    
    return {
      success: false,
      message: error.message || 'Failed to send email. Please try again.',
      error: error
    };
  }
};

// Helper function to format contact form data
export const formatContactFormData = (formData) => {
  return {
    name: formData.name,
    email: formData.email,
    message: formData.message,
    subject: formData.subject || 'Contact Form Submission'
  };
};

// Helper function to format newsletter subscription data
export const formatNewsletterData = (email) => {
  return {
    name: 'Newsletter Subscriber',
    email: email,
    message: `New newsletter subscription from: ${email}`,
    subject: 'New Newsletter Subscription'
  };
};

// Test the API connection
export const testApiConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Backend API is connected!', result);
      return { success: true, message: 'API connected successfully!' };
    } else {
      throw new Error(result.message || 'API health check failed');
    }
  } catch (error) {
    console.error('❌ Backend API connection failed:', error);
    return { 
      success: false, 
      message: `API connection failed: ${error.message}`,
      error: error
    };
  }
}; 