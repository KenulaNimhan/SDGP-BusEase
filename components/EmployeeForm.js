import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  validateName,
  validateUsername,
  validatePassword,
  validateNIC,
} from '../utils/validation';

const EmployeeForm = ({ onSubmit }) => {
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

    // Call the onSubmit prop
    onSubmit(employeeData);

    // Clear the form fields
    setFirstName('');
    setLastName('');
    setUsername('');
    setPassword('');
    setNIC('');
    setRole('driver');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="NIC"
        value={nic}
        onChangeText={setNIC}
        style={styles.input}
      />
      <Picker selectedValue={role} onValueChange={setRole} style={styles.picker}>
        <Picker.Item label="Driver" value="driver" />
        <Picker.Item label="Conductor" value="conductor" />
      </Picker>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
});

export default EmployeeForm;