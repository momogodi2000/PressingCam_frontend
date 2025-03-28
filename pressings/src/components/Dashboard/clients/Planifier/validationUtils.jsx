// Validation function for delivery plan form
export const validateDeliveryPlanForm = (formData) => {
    const errors = {};
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    
    // Check required fields
    const requiredFields = [
      'pickup_date', 'pickup_time', 'delivery_date', 
      'delivery_time', 'address'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        errors[field] = `${field.replace('_', ' ')} is required`;
      }
    });
    
    // Validate dates
    if (formData.pickup_date && formData.pickup_date < currentDate) {
      errors.pickup_date = 'Pickup date cannot be in the past';
    }
    
    if (formData.pickup_date && formData.delivery_date && 
        formData.delivery_date <= formData.pickup_date) {
      errors.delivery_date = 'Delivery date must be after pickup date';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  // Example usage with your deliveryService
  export const createValidatedDeliveryPlan = async (formData) => {
    const { isValid, errors } = validateDeliveryPlanForm(formData);
    
    if (!isValid) {
      return { success: false, errors };
    }
    
    try {
      const response = await deliveryService.createDeliveryPlan(formData);
      return { success: true, data: response };
    } catch (error) {
      return { 
        success: false, 
        errors: error.response?.data || { general: 'Server error occurred' }
      };
    }
  };