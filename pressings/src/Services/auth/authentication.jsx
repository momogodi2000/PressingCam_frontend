import axiosInstance from '../backend_connection';

const AuthService = {
    // User Registration
    register: async (userData) => {
        try {
            const response = await axiosInstance.post('/register/', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Registration failed' };
        }
    },

    // Verify OTP after registration
    verifyOTP: async (email, otpCode) => {
        try {
            const response = await axiosInstance.post('/verify-otp/', {
                email: email,
                otp_code: otpCode
            });
            
            if (response.data.access) {
                // Store tokens in localStorage
                localStorage.setItem('authToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);
                localStorage.setItem('userRole', response.data.role);
            }
            
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'OTP verification failed' };
        }
    },

    // Login
    login: async (email, password) => {
        try {
            const response = await axiosInstance.post('/login/', {
                email: email,
                password: password
            });
            
            if (response.data.access) {
                // Store tokens in localStorage
                localStorage.setItem('authToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);
                localStorage.setItem('userRole', response.data.role);
            }
            
            return response.data;
        } catch (error) {
            console.error('Login error:', error.response?.data); // Log the error details
            throw error.response?.data || { error: 'Login failed' };
        }
    },

    // Resend OTP
    resendOTP: async (email) => {
        try {
            const response = await axiosInstance.post('/resend-otp/', {
                email: email
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to resend OTP' };
        }
    },

    // Refresh Token
    refreshToken: async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await axiosInstance.post('/token/refresh/', {
                refresh: refreshToken
            });
            
            if (response.data.access) {
                localStorage.setItem('authToken', response.data.access);
            }
            
            return response.data;
        } catch (error) {
            // If refresh fails, logout the user
            AuthService.logout();
            throw error.response?.data || { error: 'Token refresh failed' };
        }
    },

    // Get redirection URL based on user role
    getRoleRedirect: async () => {
        try {
            const response = await axiosInstance.get('/redirect/');
            return response.data.redirect_url;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to get redirect URL' };
        }
    },

    // Logout
    logout: async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                await axiosInstance.post('/logout/', {
                    refresh_token: refreshToken
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear all auth-related data from localStorage
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userRole');
            
            // Force a page reload to clear any in-memory state
            window.location.href = '/login';
        }
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    },

    // Get user role
    getUserRole: () => {
        return localStorage.getItem('userRole');
    },

    // Password reset request
    requestPasswordReset: async (email) => {
        try {
            const response = await axiosInstance.post('/password/reset/request/', {
                email: email
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Password reset request failed' };
        }
    },

    // Verify password reset code
    verifyResetCode: async (email, code) => {
        try {
            const response = await axiosInstance.post('/password/reset/verify/', {
                email: email,
                code: code
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Reset code verification failed' };
        }
    },

    // Confirm password reset
    resetPassword: async (email, code, newPassword, confirmPassword) => {
        try {
            const response = await axiosInstance.post('/password/reset/confirm/', {
                email: email,
                code: code,
                new_password: newPassword,
                confirm_password: confirmPassword
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Password reset failed' };
        }
    },

    // Get current user profile
    getUserProfile: async () => {
        try {
            const response = await axiosInstance.get('/profile/');
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to get user profile' };
        }
    },

    // Update user profile
    updateUserProfile: async (profileData) => {
        try {
            const response = await axiosInstance.patch('/profile/', profileData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to update user profile' };
        }
    }
};

export default AuthService;