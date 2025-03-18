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

  