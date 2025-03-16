import axiosInstance from '../backend_connection';

/**
 * Service to handle contact form operations
 */
const ContactService = {
  /**
   * Submit a contact form message to the backend
   * @param {Object} contactData - Contact form data
   * @param {string} contactData.name - Full name of the sender
   * @param {string} contactData.email - Email address of the sender
   * @param {string} contactData.subject - Subject of the message
   * @param {string} contactData.message - Content of the message
   * @returns {Promise} - Promise resolving to the API response
   */
  submitContactForm: async (contactData) => {
    try {
      const response = await axiosInstance.post('/contact/', contactData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return {
        success: false,
        error: error.response?.data || 'Une erreur est survenue. Veuillez réessayer.'
      };
    }
  }
};

export default ContactService;