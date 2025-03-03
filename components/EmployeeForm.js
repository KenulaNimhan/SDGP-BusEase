import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  validateName,
  validateUsername,
  validatePassword,
  validateNIC,
} from '../utils/validation';

const EmployeeForm = ({ onSubmit, onSearch }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nic, setNIC] = useState('');
  const [role, setRole] = useState('driver');

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setUsername('');
    setPassword('');
    setNIC('');
    setRole('driver');
  };

  const handleValidation = () => {
    if (!validateName(firstName) || !validateName(lastName)) {
      Alert.alert('Validation Error', 'Name fields must contain only letters.');
      return false;
    }
    if (!validateUsername(username)) {
      Alert.alert('Validation Error', 'Username must be alphanumeric.');
      return false;
    }
    if (!validatePassword(password)) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters long.');
      return false;
    }
    if (!validateNIC(nic)) {
      Alert.alert('Validation Error', 'Invalid NIC format.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!handleValidation()) return;

    const employeeData = { firstName, lastName, username, password, nic, role };
    onSubmit(employeeData);
    handleReset();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Employee Registration</Text>
        <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.input} />
        <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.input} />
        <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
        <TextInput placeholder="NIC" value={nic} onChangeText={setNIC} style={styles.input} />
        <Picker selectedValue={role} onValueChange={setRole} style={styles.picker}>
          <Picker.Item label="Driver" value="driver" />
          <Picker.Item label="Conductor" value="conductor" />
        </Picker>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
          <Icon name="search" size={20} color="#fff" />
          <Text style={styles.searchButtonText}>Search Employees</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#CC5500',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DD7700',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#FFF8E1',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#CC5500',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7700',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  searchButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#888888',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EmployeeForm;
