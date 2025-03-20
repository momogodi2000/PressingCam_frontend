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
  },

  /**
   * Get all contact messages (admin only)
   * @param {Object} filters - Optional filter parameters
   * @param {string} filters.name - Filter by sender name
   * @param {string} filters.email - Filter by sender email
   * @param {string} filters.subject - Filter by message subject
   * @param {boolean} filters.responded - Filter by response status
   * @returns {Promise} - Promise resolving to the API response with contact messages
   */
  getContactMessages: async (filters = {}) => {
    try {
      // Build query parameters from filters
      const queryParams = new URLSearchParams();
      if (filters.name) queryParams.append('name', filters.name);
      if (filters.email) queryParams.append('email', filters.email);
      if (filters.subject) queryParams.append('subject', filters.subject);
      if (filters.responded !== undefined) queryParams.append('responded', filters.responded);
      
      const url = `/admin/contacts/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await axiosInstance.get(url);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return {
        success: false,
        error: error.response?.data || 'Failed to retrieve contact messages.'
      };
    }
  },

  /**
   * Get a specific contact message by ID (admin only)
   * @param {number} id - The ID of the contact message to retrieve
   * @returns {Promise} - Promise resolving to the API response with contact message details
   */
  getContactDetail: async (id) => {
    try {
      // Check if id is defined before making the request
      if (!id) {
        throw new Error('Contact ID is required');
      }
      const response = await axiosInstance.get(`/admin/contacts/${id}/`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error(`Error fetching contact message with ID ${id}:`, error);
      return {
        success: false,
        error: error.response?.data || error.message || 'Failed to retrieve contact message details.'
      };
    }
  },

  /**
   * Delete a contact message by ID (admin only)
   * @param {number} id - The ID of the contact message to delete
   * @returns {Promise} - Promise resolving to the API response
   */
  deleteContact: async (id) => {
    try {
      // Check if id is defined before making the request
      if (!id) {
        throw new Error('Contact ID is required');
      }
      const response = await axiosInstance.delete(`/admin/contacts/${id}/`);
      return {
        success: true,
        message: 'Contact message deleted successfully'
      };
    } catch (error) {
      console.error(`Error deleting contact message with ID ${id}:`, error);
      return {
        success: false,
        error: error.response?.data || error.message || 'Failed to delete contact message.'
      };
    }
  },

  /**
   * Respond to a contact message (admin only)
   * @param {number} id - The ID of the contact message to respond to
   * @param {Object} responseData - Response data
   * @param {string} responseData.response - Content of the response message
   * @returns {Promise} - Promise resolving to the API response
   */
  respondToContact: async (id, responseData) => {
    try {
      // Check if id is defined before making the request
      if (!id) {
        throw new Error('Contact ID is required');
      }
      const response = await axiosInstance.post(`/admin/contacts/${id}/respond/`, responseData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error(`Error responding to contact message with ID ${id}:`, error);
      return {
        success: false,
        error: error.response?.data || error.message || 'Failed to send response message.'
      };
    }
  }
};

export default ContactService;