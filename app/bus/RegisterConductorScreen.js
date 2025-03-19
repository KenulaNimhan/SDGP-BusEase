import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import API from '../services/api';

const RegisterConductorScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [licenseId, setLicenseId] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to validate name
  const validateName = (name) => {
    return name.length >= 2 && /^[a-zA-Z\s]*$/.test(name);
  };

  // Function to validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate mobile number
  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  };

  // Function to validate license ID
  const validateLicenseId = (id) => {
    const licenseRegex = /^[A-Z0-9-]{5,15}$/;
    return licenseRegex.test(id);
  };

  // Function to handle conductor registration
  const handleRegisterConductor = async () => {
    // Validate input fields
    if (!firstName || !lastName || !email || !mobile || !licenseId) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    // Validate first name
    if (!validateName(firstName)) {
      Alert.alert('Validation Error', 'First name must be at least 2 characters long and contain only letters');
      return;
    }

    // Validate last name
    if (!validateName(lastName)) {
      Alert.alert('Validation Error', 'Last name must be at least 2 characters long and contain only letters');
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return;
    }

    // Validate mobile
    if (!validateMobile(mobile)) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    // Validate license ID
    if (!validateLicenseId(licenseId)) {
      Alert.alert('Validation Error', 'License ID must be 5-15 characters and contain only uppercase letters, numbers, and hyphens');
      return;
    }

    // Prepare conductor data
    const conductorData = {
      firstName,
      lastName,
      email,
      mobile,
      licenseId
    };

    setLoading(true);

    try {
      // Call API to register conductor
      const response = await API.conductor.registerConductor(conductorData);
      
      if (response) {
        Alert.alert('Success', 'Conductor registered successfully');
        navigation.navigate('Dashboard');
      }
    } catch (error) {
      console.error('Error registering conductor:', error);
      Alert.alert('Error', error.message || 'Failed to register conductor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  