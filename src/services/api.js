import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Fetch user profile
export const fetchUserProfile = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    console.log(response.data);
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

// Fetch all skills
export const fetchSkills = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/skills`);  // No need to pass userId
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response format for skills');
    }
  } catch (error) {
    console.error('Error fetching skills:', error.response ? error.response.data : error.message);
    throw error;
  }
};


// Fetch educations by user ID
export const fetchEducations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/education`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response format for educations');
    }
  } catch (error) {
    console.error(`Error fetching educations :`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch courses by user ID
export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response format for courses');
    }
    // Fetch all data concurrently
  } catch (error) {
    console.error(`Error fetching courses :`, error.response ? error.response.data : error.message);
    throw error;
  }
};

// Fetch projects by user ID
export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response format for projects');
    }
  } catch (error) {
    console.error(`Error fetching projects:`, error.response ? error.response.data : error.message);
    throw error;
  }
};
