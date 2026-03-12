// API Base URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ================= SIGNUP =================
export const signupUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to get profile");
    }

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