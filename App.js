import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';

// Sample JSON data
const initialEmployees = [
  {
    id: 1,
    firstName: 'Kasun',
    lastName: 'Sam',
    username: 'kasunsam',
    password: 'password123',
    nic: '123456789V',
    role: 'driver',
    active: true,
  },
  {
    id: 2,
    firstName: 'Nipun',
    lastName: 'Do',
    username: 'nipundo',
    password: 'password456',
    nic: '987654321V',
    role: 'conductor',
    active: false,
  },
];

const App = () => {
  const [employees, setEmployees] = useState([]);

  // Load initial data when the component mounts
  useEffect(() => {
    setEmployees(initialEmployees);
  }, []);

  const handleSubmit = (employeeData) => {
    // Add a unique ID to the employee data
    const newEmployee = { ...employeeData, id: employees.length + 1, active: true };
    // Update the employees state
    setEmployees([...employees, newEmployee]);
  };

  return (
    <View style={styles.container}>
      <EmployeeForm onSubmit={handleSubmit} />
      <EmployeeTable employees={employees} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});

export default App;