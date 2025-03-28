import axiosInstance from '../backend_connection';

const ENDPOINTS = {
    DELIVERY_PLANS: '/delivery-plans/',
    SAVED_ADDRESSES: '/saved-addresses/',
    DELIVERY_PLAN_HISTORY: '/delivery-plans/history/',
    CITY_QUARTERS: '/saved-addresses/city_quarters/'
};

export const deliveryService = {
    createDeliveryPlan: async (planData) => {
        try {
            const response = await axiosInstance.post(ENDPOINTS.DELIVERY_PLANS, planData);
            return response.data;
        } catch (error) {
            console.error('Error creating delivery plan:', error.response?.data || error.message);
            throw error.response?.data || error.message;
        }
    },

    getDeliveryPlans: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.DELIVERY_PLANS);
            return response.data;
        } catch (error) {
            console.error('Error fetching delivery plans:', error);
            throw error;
        }
    },

    getDeliveryPlanHistory: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.DELIVERY_PLAN_HISTORY);
            return response.data;
        } catch (error) {
            console.error('Error fetching delivery plan history:', error);
            throw error;
        }
    },

    // Saved Address Methods
    createSavedAddress: async (addressData) => {
        try {
            const response = await axiosInstance.post(ENDPOINTS.SAVED_ADDRESSES, addressData);
            return response.data;
        } catch (error) {
            console.error('Error creating saved address:', error);
            throw error;
        }
    },

    getSavedAddresses: async () => {
        try {
            const response = await axiosInstance.get(ENDPOINTS.SAVED_ADDRESSES);
            return response.data;
        } catch (error) {
            console.error('Error fetching saved addresses:', error);
            throw error;
        }
    },

    // City Quarters Method
    getCityQuarters: async (city) => {
        try {
            const response = await axiosInstance.get(`${ENDPOINTS.CITY_QUARTERS}?city=${city}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching city quarters:', error);
            throw error;
        }
    }
};