import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Fetch user profile
export const fetchUserProfile = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    if (response && response.data) {
      return {
        ...response.data,
        profile_pic: response.data.profile_pic || "/uploads/image.jpg", // Fallback path
      };
    } else {
      throw new Error('Invalid response format for user');
    }
  } catch (error) {
    console.error(`Error fetching user profile with ID ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch skills by user ID
export const fetchSkills = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/skills/${userId}`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response format for skills');
    }
  } catch (error) {
    console.error(`Error fetching skills for user ID ${userId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch educations by user ID
export const fetchEducations = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/educations/${userId}`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response format for educations');
    }
  } catch (error) {
    console.error(`Error fetching educations for user ID ${userId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch courses by user ID
export const fetchCourses = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses/${userId}`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response format for courses');
    }
  } catch (error) {
    console.error(`Error fetching courses for user ID ${userId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch projects by user ID
export const fetchProjects = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects/${userId}`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response format for projects');
    }
  } catch (error) {
    console.error(`Error fetching projects for user ID ${userId}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};
