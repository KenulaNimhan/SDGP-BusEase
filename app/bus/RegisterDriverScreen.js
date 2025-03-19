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
