import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import API from '../services/api';

const RegisterBusScreen = ({ navigation }) => {
  const [busNumber, setBusNumber] = useState('');
  const [busModel, setBusModel] = useState('');
  const [busCapacity, setBusCapacity] = useState('');
  const [busLicense, setBusLicense] = useState('');
  const [busManufacturer, setBusManufacturer] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle bus registration
  const handleRegisterBus = async () => {
    // Validate input fields
    if (!busNumber || !busModel || !busCapacity || !busLicense || !busManufacturer) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Prepare bus data
    const busData = {
      busNumber,
      model: busModel,
      manufacturer: busManufacturer,
      capacity: busCapacity,
      licenseNumber: busLicense
    };

    setLoading(true);

    try {
      // Mock token - in a real app, this would come from authentication state
      const token = 'mock-token';
      
      // Call API to register bus
      const response = await API.bus.registerBus(busData, token);
      
      if (response) {
        Alert.alert('Success', 'Bus registered successfully');
        navigation.navigate('Dashboard');
      }
    } catch (error) {
      console.error('Error registering bus:', error);
      Alert.alert('Error', error.message || 'Failed to register bus. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  