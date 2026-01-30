import api from "./api";

/**
 * Register a new user
 */
export const registerUser = (payload: {
  fullName: string;
  username: string;
  password: string;
}) => {
  return api.post("/register", payload);
};

/**
 * Login user
 */
export const loginUser = (payload: {
  username: string;
  password: string;
}) => {
  return api.post("/login", payload);
};

/**
 * Logout user
 */
export const logoutUser = () => {
  return api.post("/logout");
};

/**
 * Get current logged-in user
 */
export const getProfile = () => {
  return api.get("/profile");
};
