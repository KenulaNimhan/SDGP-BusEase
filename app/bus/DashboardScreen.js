import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import API from '../services/api';

const DashboardScreen = ({ navigation }) => {
  // Add state for menu visibility
  const [menuVisible, setMenuVisible] = useState(false);
  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [ongoingTripsVisible, setOngoingTripsVisible] = useState(false);
  const [serviceDueBusesVisible, setServiceDueBusesVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Dashboard statistics showing activity distribution
  const stats = {
    drivers: { active: 3, inactive: 97 },
    conductors: { active: 3, inactive: 97 },
    buses: { active: 3, inactive: 97 }
  };

  // State for trips and service due buses data
  const [ongoingTrips, setOngoingTrips] = useState([]);
  const [serviceDueBuses, setServiceDueBuses] = useState([]);

  // Sample bus data (will be replaced with API data)
  const busData = {
    busNumber: 'Bus #123',
    routeName: 'City A → City B',
    driverName: 'John Smith',
    conductorName: 'Jane Doe',
    busNumber2: 'Bus #123',
    busBrand: 'Toyota',
    currentMileage: '10,000 km',
    dueKm: '500 km'
  };
  
  // Function to fetch ongoing trips
  const fetchOngoingTrips = async () => {
    setLoading(true);
    try {
      const response = await API.trip.getOngoingTrips();
      if (response) {
        setOngoingTrips(response);
      }
    } catch (error) {
      console.error('Error fetching ongoing trips:', error);
      Alert.alert('Error', 'Failed to fetch ongoing trips');
    } finally {
      setLoading(false);
    }
  };
  
  // Function to fetch service due buses (this would be implemented in a real API)
  const fetchServiceDueBuses = async () => {
    setLoading(true);
    // This is a mock implementation - in a real app, you would call an actual API endpoint
    try {
      // Simulating API call with timeout
      setTimeout(() => {
        // Mock data
        const mockServiceDueBuses = [
          {
            busNumber: 'Bus #123',
            busBrand: 'Toyota',
            currentMileage: '10,000 km',
            dueKm: '500 km'
          },
          {
            busNumber: 'Bus #456',
            busBrand: 'Mercedes',
            currentMileage: '15,000 km',
            dueKm: '200 km'
          }
        ];
        setServiceDueBuses(mockServiceDueBuses);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching service due buses:', error);
      Alert.alert('Error', 'Failed to fetch service due buses');
      setLoading(false);
    }
  };

  