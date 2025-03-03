import axios from 'axios';

export const saveEmployee = async (employeeData) => {
  try {
    const response = await axios.post('http://localhost:8081/api/employees', employeeData);
    return response.data;
  } catch (error) {
    console.error('Error saving employee:', error);
    throw error;
  }
};

export const searchEmployee = async (searchText) => {
  try {
    const response = await axios.get(`http://localhost:8081/api/employees?search=${encodeURIComponent(searchText)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching employee:', error);
    throw error;
  }
};
