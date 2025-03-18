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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Register Bus</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Registration Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bus Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter bus number"
              value={busNumber}
              onChangeText={setBusNumber}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bus Model</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter bus model"
              value={busModel}
              onChangeText={setBusModel}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bus Manufacturer</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter manufacturer"
              value={busManufacturer}
              onChangeText={setBusManufacturer}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Seating Capacity</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter seating capacity"
              value={busCapacity}
              onChangeText={setBusCapacity}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>License Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter license number"
              value={busLicense}
              onChangeText={setBusLicense}
            />
          </View>
        </View>

        {/* Register Button */}
        <TouchableOpacity 
          style={[styles.registerButton, loading && styles.disabledButton]}
          onPress={handleRegisterBus}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>
            {loading ? 'Registering...' : 'Register'}
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

export default RegisterBusScreen;