// API Base URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ================= SIGNUP =================
export const signupUser = async (userData) => {
  try {
    console.log("Calling signup API with:", userData);
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log("Signup response status:", response.status);
    const data = await response.json();
    console.log("Signup response data:", data);

    if (!response.ok) {
      throw new Error(data.message || data.error || "Signup failed");
    }

    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

// ================= LOGIN =================
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// ================= GET PROFILE =================
export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to get profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Profile error:", error);
    throw error;
  }
};

// ================= TOKEN =================

// Save token
export const saveToken = (token) => {
  localStorage.setItem("authToken", token);
};

// Get token
export const getToken = () => {
  return localStorage.getItem("authToken");
};

// Remove token
export const removeToken = () => {
  localStorage.removeItem("authToken");
};

// ================= USER =================

// Save user
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Get user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Remove user
export const removeUser = () => {
  localStorage.removeItem("user");
};

// ================= LOGOUT =================
export const logout = () => {
  removeToken();
  removeUser();
};