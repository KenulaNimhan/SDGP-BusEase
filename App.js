import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import SearchScreen from './components/SearchScreen';

// Load the JSON file using require
const employeesData = require('./data/employees.json');

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setEmployees(employeesData);
      setLoading(false);
    }, 1000); // Simulate a 1-second delay
  }, []);

  const handleSubmit = (employeeData) => {
    const newEmployee = { ...employeeData, id: employees.length + 1, active: true };
    setEmployees([...employees, newEmployee]);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <EmployeeForm onSubmit={handleSubmit} onSearch={() => navigation.navigate('Search')} />
        <EmployeeTable employees={employees} />
      </ScrollView>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Employee Management' }}
        />
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search Employees' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    paddingBottom: 20, // there's space in the bottom
  },
});