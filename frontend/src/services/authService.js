import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const authService = {
  // Register new user
  async register(userData) {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        userData
      );
      if (response.data.success) {
        const { user, tokens } = response.data.data;
        // Store tokens
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        // Store user info
        localStorage.setItem("userInfo", JSON.stringify(user));
        return user;
      }
      throw new Error(response.data.message || "Registration failed");
    } catch (error) {
      throw error;
    }
  },

  // Login user
  async login(credentials) {
    try {
      console.log("Attempting login with:", { email: credentials.email });
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        credentials
      );
      console.log("Login response:", response.data);

      if (response.data.success) {
        const { user, tokens } = response.data.data;
        // Store tokens
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        // Store user info
        localStorage.setItem("userInfo", JSON.stringify(user));
        return user;
      }
      throw new Error(response.data.message || "Login failed");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      if (error.message === "Network Error") {
        throw new Error(
          "Cannot connect to server. Please check your internet connection."
        );
      }
      throw error;
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
  },

  // Get current user
  getCurrentUser() {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  },

  getAccessToken() {
    return localStorage.getItem("accessToken");
  },

  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  },

  // Update user profile
  async updateProfile(userData) {
    try {
      const token = this.getAccessToken();
      const response = await axios.put(
        `${API_URL}/api/auth/update-profile`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            ...(userData instanceof FormData
              ? {}
              : { "Content-Type": "application/json" }),
          },
        }
      );
      if (response.data.success) {
        const updatedUser = response.data.data;
        // Update stored user info
        localStorage.setItem("userInfo", JSON.stringify(updatedUser));
        return updatedUser;
      }
      throw new Error(response.data.message || "Profile update failed");
    } catch (error) {
      console.error(
        "Profile update error:",
        error.response?.data || error.message
      );
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      if (error.message === "Network Error") {
        throw new Error(
          "Cannot connect to server. Please check your internet connection."
        );
      }
      throw error;
    }
  },

  // Change password
  async changePassword(passwordData) {
    try {
      const token = this.getAccessToken();
      const response = await axios.put(
        `${API_URL}/api/auth/change-password`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message || "Password change failed");
    } catch (error) {
      throw error;
    }
  },

  // Forgot password
  async forgotPassword(email) {
    const response = await axios.post("/auth/forgot-password", { email });
    return response.data;
  },

  // Reset password
  async resetPassword(resetData) {
    const response = await axios.post("/auth/reset-password", resetData);
    return response.data;
  },

  // Verify email
  async verifyEmail(token) {
    const response = await axios.get(`/auth/verify-email?token=${token}`);
    return response.data;
  },

  // Resend verification email
  async resendVerification(email) {
    const response = await axios.post("/auth/resend-verification", { email });
    return response.data;
  },

  async refreshToken() {
    try {
      const refreshToken = this.getRefreshToken();
      const response = await axios.post(`${API_URL}/api/auth/refresh-token`, {
        refreshToken,
      });
      if (response.data.success) {
        const { accessToken } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        return accessToken;
      }
      throw new Error("Token refresh failed");
    } catch (error) {
      this.logout();
      throw error;
    }
  },
};

export default authService;
