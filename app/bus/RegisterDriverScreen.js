import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import API from '../services/api';

const RegisterDriverScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [licenseId, setLicenseId] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle driver registration
  const handleRegisterDriver = async () => {
    // Validate input fields
    if (!firstName || !lastName || !email || !mobile || !licenseId) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Prepare driver data
    const driverData = {
      firstName,
      lastName,
      email,
      mobile,
      licenseId
    };

    setLoading(true);

    try {
      // Mock token - in a real app, this would come from authentication state
      const token = 'mock-token';
      
      // Call API to register driver
      const response = await API.driver.registerDriver(driverData, token);
      
      if (response) {
        Alert.alert('Success', 'Driver registered successfully');
        navigation.navigate('Dashboard');
      }
    } catch (error) {
      console.error('Error registering driver:', error);
      Alert.alert('Error', error.message || 'Failed to register driver. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register Driver</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Registration Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter first name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter last name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>License ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter license ID"
              value={licenseId}
              onChangeText={setLicenseId}
            />
          </View>
        </View>

        {/* Register Button */}
        <TouchableOpacity 
          style={[styles.registerButton, loading && styles.disabledButton]}
          onPress={handleRegisterDriver}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>
            {loading ? 'Registering...' : 'Add Driver'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    fontSize: 24,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  formContainer: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  registerButton: {
    backgroundColor: '#FFA500',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterDriverScreen;