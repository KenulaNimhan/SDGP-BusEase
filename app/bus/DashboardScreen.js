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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Dashboard</Text>
        </View>
        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButtonContainer}>
          <Text style={styles.menuButton}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Overlay */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.menuOverlay}>
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('RegisterBus');
              }}
            >
              <Text style={styles.menuItemText}>Register Bus</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setEmployeeDropdownVisible(!employeeDropdownVisible);
              }}
            >
              <Text style={styles.menuItemText}>Register Employee</Text>
              <Text style={styles.dropdownIcon}>{employeeDropdownVisible ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            
            {employeeDropdownVisible && (
              <>
                <TouchableOpacity 
                  style={[styles.menuItem, styles.subMenuItem]}
                  onPress={() => {
                    setMenuVisible(false);
                    navigation.navigate('RegisterDriver');
                  }}
                >
                  <Text style={styles.menuItemText}>Register Driver</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.menuItem, styles.subMenuItem]}
                  onPress={() => {
                    setMenuVisible(false);
                    navigation.navigate('RegisterConductor');
                  }}
                >
                  <Text style={styles.menuItemText}>Register Conductor</Text>
                </TouchableOpacity>
              </>
            )}
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('ViewCompletedTrips');
              }}
            >
              <Text style={styles.menuItemText}>View Completed Trips</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('ViewBus');
              }}
            >
              <Text style={styles.menuItemText}>View Buses</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate('Settings');
              }}
            >
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Activities</Text>
        
        {/* Statistics Section */}
        <View style={styles.statsContainer}>
          <View style={styles.topStatsRow}>
            {/* Drivers Stats */}
            <View style={[styles.statCard, styles.topStatCard]}>
              <Text style={styles.statTitle}>Drivers</Text>
              <View style={styles.pieChartContainer}>
                <View style={styles.pieChart}>
                  <Text style={styles.pieChartPercentage}>{stats.drivers.active}%</Text>
                </View>
              </View>
              <View style={styles.statLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#FFA500' }]} />
                  <Text style={styles.legendText}>Active{"\n"}Drivers</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#DDDDDD' }]} />
                  <Text style={styles.legendText}>Inactive{"\n"}Drivers</Text>
                </View>
              </View>
            </View>
          
            {/* Conductors Stats */}
            <View style={[styles.statCard, styles.topStatCard]}>
              <Text style={styles.statTitle}>Conductors</Text>
              <View style={styles.pieChartContainer}>
                <View style={styles.pieChart}>
                  <Text style={styles.pieChartPercentage}>{stats.conductors.active}%</Text>
                </View>
              </View>
              <View style={styles.statLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#FFA500' }]} />
                  <Text style={styles.legendText}>Active Conductors</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#DDDDDD' }]} />
                  <Text style={styles.legendText}>Inactive Conductors</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* Buses Stats */}
          <View style={[styles.statCard, styles.centerStatCard]}>
            <Text style={styles.statTitle}>Buses</Text>
            <View style={styles.pieChartContainer}>
              <View style={styles.pieChart}>
                <Text style={styles.pieChartPercentage}>{stats.buses.active}%</Text>
              </View>
            </View>
            <View style={styles.statLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#FFA500' }]} />
                <Text style={styles.legendText}>Active Buses</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#DDDDDD' }]} />
                <Text style={styles.legendText}>Inactive Buses</Text>
              </View>
            </View>
          </View>
        </View>
