import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import { sendFormData, formatContactFormData, testFormspreeConnection } from '../utils/formspree';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Test Formspree connection when component mounts
  useEffect(() => {
    // Test Formspree connection
    testFormspreeConnection().then(result => {
      if (!result.success) {
        console.warn('Formspree connection warning:', result.message);
        toast.warning('Form service is not properly configured. Please contact support.');
      } else {
        console.log('Formspree connection test successful');
      }
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.target);
      const formDataObj = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      };

      const formattedData = formatContactFormData(formDataObj);
      const result = await sendFormData(formattedData);

      if (result.success) {
        toast.success("Form Submitted Successfully!");
        event.target.reset();
      } else {
        toast.error(result.message || "Failed to send message. Please try again.");
        if (result.debugInfo) {
          console.error('Debug info:', result.debugInfo);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{opacity:0, x:-200}}
      transition={{duration:1.2}}
      whileInView={{opacity:1, x:0}} 
      viewport={{ once: true, amount: 0.3 }}
      className="text-center p-6 pt-32 lg:px-32 w-full overflow-hidden" id="Contact">
      <h1 className="text-6xl sm:text-4xl font-bold mb-2 py-4 text-center">
        Contact
        <span className="pl-2 underline underline-offset-2 decoration-1 font-light">
          With Us
        </span>
      </h1>
      <p className="text-gray-500 max-w-80 text-center mt-2 mx-auto mb-4">
        Ready to make a move? Let's build your future home together!
      </p>

      <form onSubmit={onSubmit} className="max-w-2xl pt-8 mx-auto text-gray-500">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 text-left md:pl-4">
            <label className="block font-medium">Your Name</label>
            <input
              className="w-full border border-gray-200 rounded py-3 px-4 mt-2"
              type="text"
              name="name"
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div className="w-full md:w-1/2 text-left md:pl-4">
            <label className="block font-medium">Email</label>
            <input
              className="w-full border border-gray-200 rounded py-3 px-4 mt-2"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              required
            />
          </div>
        </div>
        <div className="my-6 text-left md:pl-4">
          <label className="block font-medium">Message</label>
          <textarea
            className="w-full border border-gray-500 rounded py-3 px-4 mt-2 h-28 resize-none"
            name="message"
            placeholder="Message"
            required
          ></textarea>
        </div>
        <button className="border bg-blue-600 px-8 py-3 rounded text-white">
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </motion.div>
  );
};

export default Contact;
