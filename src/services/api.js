import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const fetchUserProfile = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data; 
  } catch (error) {
    
    throw error;
  }
};



export const fetchSkills = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/skills`); 
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


export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/courses`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response format for courses');
    }
    
  } catch (error) {
    console.error(`Error fetching courses :`, error.response ? error.response.data : error.message);
    throw error;
  }
};


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
