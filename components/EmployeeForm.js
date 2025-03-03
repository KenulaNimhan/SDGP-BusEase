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

  const handleSubmit = () => {
    if (!validateName(firstName)) {
      Alert.alert('Validation Error', 'First Name must contain only letters.');
      return;
    }
    if (!validateName(lastName)) {
      Alert.alert('Validation Error', 'Last Name must contain only letters.');
      return;
    }
    if (!validateUsername(username)) {
      Alert.alert('Validation Error', 'Username must contain only letters and numbers.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters long and contain only letters and numbers.');
      return;
    }
    if (!validateNIC(nic)) {
      Alert.alert('Validation Error', 'NIC must be in the old format (9 digits + V) or new format (12 digits).');
      return;
    }

    const employeeData = {
      firstName,
      lastName,
      username,
      password,
      nic,
      role,
    };

    onSubmit(employeeData);

    setFirstName('');
    setLastName('');
    setUsername('');
    setPassword('');
    setNIC('');
    setRole('driver');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          placeholder="Enter First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          placeholder="Enter Last name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Text style={styles.label}>NIC</Text>
        <TextInput
          placeholder="Enter NIC"
          value={nic}
          onChangeText={setNIC}
          style={styles.input}
        />
        <Text style={styles.label}>Role</Text>
        <Picker selectedValue={role} onValueChange={setRole} style={styles.picker}>
          <Picker.Item label="Driver" value="driver" />
          <Picker.Item label="Conductor" value="conductor" />
        </Picker>
        <Button title="Submit" onPress={handleSubmit} color="#CC5500" />
        <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
          <Icon name="search" size={20} color="#fff" />
          <Text style={styles.searchButtonText}>Search Employees</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    backgroundColor: 'fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: '#FFA500',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFA500',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 5,
  },
  searchButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC5500',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  searchButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default EmployeeForm;