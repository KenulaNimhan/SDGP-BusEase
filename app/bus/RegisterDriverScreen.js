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

