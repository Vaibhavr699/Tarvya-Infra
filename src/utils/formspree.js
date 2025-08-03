// Formspree Configuration
export const FORMSPREEE_CONFIG = {
  ENDPOINT: 'https://formspree.io/f/2795633490048057258', // Your actual Formspree endpoint
  // Alternative endpoints for different forms:
  CONTACT_ENDPOINT: 'https://formspree.io/f/2795633490048057258',
  INTERIOR_ENDPOINT: 'https://formspree.io/f/2795633490048057258', // You can create separate endpoints for different forms
  DEPLOY_KEY: '7fbb6dafe33f435e85c86a2834b74d6c', // Your Formspree deploy key
};

// Send form data to Formspree
export const sendFormData = async (formData, endpoint = FORMSPREEE_CONFIG.ENDPOINT) => {
  try {
    console.log('📧 Sending form data to Formspree:', formData);
    console.log('🔧 Using endpoint:', endpoint);
    
    // Add a timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout after 15 seconds')), 15000);
    });
    
    const formPromise = fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${FORMSPREEE_CONFIG.DEPLOY_KEY}`,
      },
      body: JSON.stringify(formData),
    });
    
    const response = await Promise.race([formPromise, timeoutPromise]);
    
    console.log('✅ Formspree response status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Formspree response:', result);
      
      return {
        success: true,
        message: 'Form submitted successfully! We\'ll get back to you soon.',
        data: result
      };
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HTTP ${response.status}: ${errorData.error || 'Form submission failed'}`);
    }
    
  } catch (error) {
    console.error('❌ Formspree Error:', error);
    console.error('🔍 Error details:', {
      endpoint: endpoint,
      errorMessage: error.message,
      errorType: error.name
    });
    
    // Provide specific error messages based on error type
    let userMessage = 'Failed to submit form. Please try again.';
    let debugInfo = '';
    
    if (error.message?.includes('timeout')) {
      userMessage = 'Request timed out. Please try again.';
      debugInfo = 'The request took too long to complete.';
    } else if (error.message?.includes('HTTP 429')) {
      userMessage = 'Too many requests. Please wait a moment and try again.';
      debugInfo = 'Rate limit exceeded.';
    } else if (error.message?.includes('HTTP 400')) {
      userMessage = 'Invalid form data. Please check your input.';
      debugInfo = 'The form data format is incorrect.';
    } else if (error.message?.includes('HTTP 403')) {
      userMessage = 'Access denied. Please check your Formspree configuration.';
      debugInfo = 'The Formspree endpoint might be incorrect or disabled.';
    } else if (error.message?.includes('HTTP 500')) {
      userMessage = 'Server error. Please try again later.';
      debugInfo = 'Formspree server is experiencing issues.';
    } else if (error.name === 'TypeError' && error.message?.includes('fetch')) {
      userMessage = 'Network error. Please check your internet connection.';
      debugInfo = 'Unable to connect to Formspree servers.';
    }
    
    console.error('💡 Debug info:', debugInfo);
    
    return {
      success: false,
      message: userMessage,
      debugInfo: debugInfo,
      error: error
    };
  }
};

// Helper function to format contact form data for Formspree
export const formatContactFormData = (formData) => {
  return {
    name: formData.name || 'Anonymous',
    email: formData.email || 'no-email@example.com',
    phone: formData.phone || 'Not provided',
    subject: formData.subject || 'Contact Form Submission',
    message: formData.message || 'No message provided',
    _subject: 'New Contact Form Submission - Tarvya Infra',
    _replyto: formData.email || 'no-reply@example.com',
    _format: 'html', // Optional: format the email as HTML
  };
};

// Helper function to format interior work inquiry data
export const formatInteriorInquiryData = (formData) => {
  return {
    name: formData.name || 'Anonymous',
    email: formData.email || 'no-email@example.com',
    phone: formData.phone || 'Not provided',
    project_type: formData.projectType || 'Not specified',
    budget: formData.budget || 'Not specified',
    message: formData.message || 'No message provided',
    _subject: 'New Interior Design Inquiry - Tarvya Infra',
    _replyto: formData.email || 'no-reply@example.com',
    _format: 'html',
  };
};

// Helper function to format newsletter subscription data
export const formatNewsletterData = (email) => {
  return {
    email: email,
    _subject: 'New Newsletter Subscription - Tarvya Infra',
    _replyto: email,
    _format: 'html',
  };
};

// Test Formspree connection
export const testFormspreeConnection = async () => {
  try {
    console.log('🧪 Testing Formspree connection...');
    
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test submission',
      _subject: 'Formspree Connection Test',
    };
    
    const result = await sendFormData(testData);
    
    if (result.success) {
      console.log('✅ Formspree connection test successful');
      return { success: true, message: 'Connection test successful' };
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('❌ Formspree connection test failed:', error);
    return { 
      success: false, 
      message: `Connection test failed: ${error.message}`,
      error: error
    };
  }
}; 