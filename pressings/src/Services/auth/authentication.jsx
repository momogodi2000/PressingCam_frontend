import axiosInstance from '../backend_connection';

const AuthService = {
    // Token expiration time in milliseconds (30 minutes)
    TOKEN_EXPIRATION_TIME: 30 * 60 * 1000,
    
    // Store tokens with expiration
    setAuthData: (accessToken, refreshToken, userRole) => {
        const expirationTime = new Date().getTime() + AuthService.TOKEN_EXPIRATION_TIME;
        
        localStorage.setItem('authToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('tokenExpiration', expirationTime.toString());
    },
    
    // Check if token is expired
    isTokenExpired: () => {
        const expiration = localStorage.getItem('tokenExpiration');
        if (!expiration) return true;
        
        return new Date().getTime() > parseInt(expiration);
    },
    
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
                // Store tokens with expiration
                AuthService.setAuthData(
                    response.data.access,
                    response.data.refresh,
                    response.data.role
                );
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
                // Store tokens with expiration
                AuthService.setAuthData(
                    response.data.access,
                    response.data.refresh,
                    response.data.role
                );
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
                // Update access token and reset expiration time
                AuthService.setAuthData(
                    response.data.access,
                    refreshToken,
                    localStorage.getItem('userRole')
                );
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
            // Check token expiration before making the request
            if (AuthService.isTokenExpired()) {
                try {
                    await AuthService.refreshToken();
                } catch (refreshError) {
                    AuthService.logout();
                    throw new Error('Session expired. Please login again.');
                }
            }
            
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
            localStorage.removeItem('tokenExpiration');
            
            // Force a page reload to clear any in-memory state
            window.location.href = '/login';
        }
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        const hasToken = !!localStorage.getItem('authToken');
        
        if (hasToken && AuthService.isTokenExpired()) {
            // Token is expired, try to refresh it
            try {
                AuthService.refreshToken();
                return true;
            } catch (error) {
                // If refresh fails, return false
                return false;
            }
        }
        
        return hasToken;
    },

    // Get user role
    getUserRole: () => {
        // Check token expiration before returning role
        if (AuthService.isTokenExpired()) {
            return null;
        }
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
            // Check token expiration before making the request
            if (AuthService.isTokenExpired()) {
                try {
                    await AuthService.refreshToken();
                } catch (refreshError) {
                    AuthService.logout();
                    throw new Error('Session expired. Please login again.');
                }
            }
            
            const response = await axiosInstance.get('/profile/');
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to get user profile' };
        }
    },

    // Update user profile
    updateUserProfile: async (profileData) => {
        try {
            // Check token expiration before making the request
            if (AuthService.isTokenExpired()) {
                try {
                    await AuthService.refreshToken();
                } catch (refreshError) {
                    AuthService.logout();
                    throw new Error('Session expired. Please login again.');
                }
            }
            
            const response = await axiosInstance.patch('/profile/', profileData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Failed to update user profile' };
        }
    },
    
    // Setup automatic token refresh or logout
    setupTokenExpirationHandler: () => {
        // Check if there's a token and expiration time
        const authToken = localStorage.getItem('authToken');
        const expiration = localStorage.getItem('tokenExpiration');
        
        if (authToken && expiration) {
            const expirationTime = parseInt(expiration);
            const currentTime = new Date().getTime();
            
            if (expirationTime > currentTime) {
                // Token is still valid, set timeout for expiration
                const timeUntilExpiration = expirationTime - currentTime;
                
                // Set timeout to refresh token 1 minute before expiration
                if (timeUntilExpiration > 60000) { // 1 minute in milliseconds
                    setTimeout(() => {
                        AuthService.refreshToken().catch(() => {
                            AuthService.logout();
                        });
                    }, timeUntilExpiration - 60000);
                } else {
                    // Less than a minute left, try to refresh now
                    AuthService.refreshToken().catch(() => {
                        AuthService.logout();
                    });
                }
            } else {
                // Token already expired, try to refresh or logout
                AuthService.refreshToken().catch(() => {
                    AuthService.logout();
                });
            }
        }
    }
};

// Setup token expiration handler when the module is imported
if (typeof window !== 'undefined') {
    AuthService.setupTokenExpirationHandler();
}

export default AuthService;