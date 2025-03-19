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

   