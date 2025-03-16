import axiosInstance from '../backend_connection';

const AdminUserService = {
  /**
   * Get all users (admin only)
   * @returns {Promise} Promise object with users data
   */
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get('/admin/users/');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  /**
   * Get a specific user by ID (admin only)
   * @param {number} id - User ID
   * @returns {Promise} Promise object with user data
   */
  getUserById: async (id) => {
    try {
      const response = await axiosInstance.get(`/admin/users/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new user (admin only)
   * @param {Object} userData - User data including email, password, role, etc.
   * @returns {Promise} Promise object with created user data
   */
  createUser: async (userData) => {
    try {
      const response = await axiosInstance.post('/admin/users/', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  /**
   * Update a user (admin only)
   * @param {number} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise} Promise object with updated user data
   */
  updateUser: async (id, userData) => {
    try {
      const response = await axiosInstance.put(`/admin/users/${id}/`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a user (admin only)
   * @param {number} id - User ID
   * @returns {Promise} Promise object
   */
  deleteUser: async (id) => {
    try {
      await axiosInstance.delete(`/admin/users/${id}/`);
      return true;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get user statistics (admin only)
   * @returns {Promise} Promise object with user statistics
   */
  getUserStats: async () => {
    try {
      const response = await axiosInstance.get('/admin/user-stats/');
      return response.data;
    } catch (error) {
      console.error('Error fetching user statistics:', error);
      throw error;
    }
  }
};

export default AdminUserService;