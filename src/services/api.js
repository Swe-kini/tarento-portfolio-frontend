import axios from "axios";


const API_BASE_URL = "http://localhost:8080/api";

export const fetchUserProfile = async (id) => {
  try {
    // Make API request
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    
    // Check if the response is valid
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    // Log detailed error information
    console.error(`Error fetching user profile with ID ${id}:`, error.response ? error.response.data : error.message);
    throw error;  // Re-throw the error after logging
  }
};

// Fetch project details by ID
export const fetchProjectDetails = async (id) => {
  try {
    // Make API request
    const response = await axios.get(`${API_BASE_URL}/projects/${id}`);
    
    // Check if the response is valid
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    // Log detailed error information
    console.error(`Error fetching project details for project ID ${id}:`, error.response ? error.response.data : error.message);
    throw error;  // Re-throw the error after logging
  }
};
