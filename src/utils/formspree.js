// ============================================================================
//  Email delivery via Web3Forms (https://web3forms.com) — no backend needed.
//  Form submissions are emailed to the inbox registered with the access key.
//
//  SETUP (one time):
//   1. Go to https://web3forms.com and enter the email where you want enquiries
//      delivered (e.g. contact@tarvyainfra.com).
//   2. Copy the "Access Key" they show you (a long UUID).
//   3. Paste it into WEB3FORMS_ACCESS_KEY below.
//   4. Submit the form once on the live site and click the activation email
//      Web3Forms sends you. After that, every submission lands in your inbox.
//
//  (This file is still named "formspree" so existing imports keep working —
//   it now uses Web3Forms under the hood.)
// ============================================================================

export const WEB3FORMS_ACCESS_KEY = "9a86b3d3-8589-4875-82b4-a695a5f468f9";

const ENDPOINT = "https://api.web3forms.com/submit";

const isConfigured = () =>
  WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== "YOUR_ACCESS_KEY_HERE";

// Send form data to Web3Forms
export const sendFormData = async (formData) => {
  if (!isConfigured()) {
    console.warn(
      "⚠️ Web3Forms access key not set. Add it to src/utils/formspree.js (WEB3FORMS_ACCESS_KEY)."
    );
    return {
      success: false,
      message: "The form isn't configured yet. Please contact us by phone or email for now.",
    };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        ...formData,
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok && result.success) {
      return {
        success: true,
        message: "Thank you! Your message has been sent — we'll get back to you soon.",
        data: result,
      };
    }

    return {
      success: false,
      message: result.message || "Something went wrong. Please try again.",
    };
  } catch (error) {
    console.error("❌ Web3Forms error:", error);
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
      error,
    };
  }
};

// Contact form → email payload
export const formatContactFormData = (formData) => ({
  subject: "New Contact Enquiry — Tarvya Infra",
  from_name: "Tarvya Infra Website",
  name: formData.name || "Anonymous",
  email: formData.email || "",
  phone: formData.phone || "Not provided",
  enquiry_subject: formData.subject || "Contact Form Submission",
  message: formData.message || "No message provided",
  replyto: formData.email || "",
  botcheck: formData.botcheck || "",
});

// Interior Work enquiry → email payload
export const formatInteriorInquiryData = (formData) => ({
  subject: "New Interior Design Enquiry — Tarvya Infra",
  from_name: "Tarvya Infra Website",
  name: formData.name || "Anonymous",
  email: formData.email || "",
  phone: formData.phone || "Not provided",
  project_type: formData.projectType || "Not specified",
  message: formData.message || "No message provided",
  replyto: formData.email || "",
  botcheck: formData.botcheck || "",
});

// Newsletter subscription → email payload
export const formatNewsletterData = (email) => ({
  subject: "New Newsletter Subscription — Tarvya Infra",
  from_name: "Tarvya Infra Website",
  email: email || "",
  message: `New newsletter subscription from: ${email || "unknown"}`,
  replyto: email || "",
});

// Kept for backwards compatibility (no live test needed with Web3Forms).
export const testFormspreeConnection = async () => ({
  success: isConfigured(),
  message: isConfigured()
    ? "Web3Forms is configured."
    : "Web3Forms access key is not set yet.",
});
