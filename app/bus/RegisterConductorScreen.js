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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register Conductor</Text>
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
              editable={!loading}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter last name"
              value={lastName}
              onChangeText={setLastName}
              editable={!loading}
              autoCapitalize="words"
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
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 10-digit mobile number"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
              maxLength={10}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>License ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter license ID (e.g., ABC12-3456)"
              value={licenseId}
              onChangeText={setLicenseId}
              autoCapitalize="characters"
              editable={!loading}
            />
          </View>
        </View>
