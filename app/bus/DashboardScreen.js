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

        {/* Ongoing Trips Button */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            setOngoingTripsVisible(!ongoingTripsVisible);
            if (!ongoingTripsVisible) {
              fetchOngoingTrips();
            }
          }}
        >
          <Text style={styles.actionButtonText}>Ongoing Trips</Text>
        </TouchableOpacity>

        {/* Bus Information - Only shown when ongoingTripsVisible is true */}
        {ongoingTripsVisible && (
          <View style={styles.busInfoContainer}>
            {loading ? (
              <Text style={styles.loadingText}>Loading ongoing trips...</Text>
            ) : ongoingTrips && ongoingTrips.length > 0 ? (
              ongoingTrips.map((trip, index) => (
                <View key={index} style={styles.tripItem}>
                  <Text style={styles.busInfoItem}>{trip.busNumber || busData.busNumber}</Text>
                  <Text style={styles.busInfoItem}>Route Name: "{trip.routeName || busData.routeName}"</Text>
                  <Text style={styles.busInfoItem}>Driver Name: "{trip.driverName || busData.driverName}"</Text>
                  <Text style={styles.busInfoItem}>Conductor Name: "{trip.conductorName || busData.conductorName}"</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>No ongoing trips available</Text>
            )}
          </View>
        )}

        {/* Service Due Button */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            setServiceDueBusesVisible(!serviceDueBusesVisible);
            if (!serviceDueBusesVisible) {
              fetchServiceDueBuses();
            }
          }}
        >
          <Text style={styles.actionButtonText}>Service Due Buses</Text>
        </TouchableOpacity>

        {/* Service Due Information - Only shown when serviceDueBusesVisible is true */}
        {serviceDueBusesVisible && (
          <View style={styles.busInfoContainer}>
            {loading ? (
              <Text style={styles.loadingText}>Loading service due buses...</Text>
            ) : serviceDueBuses && serviceDueBuses.length > 0 ? (
              serviceDueBuses.map((bus, index) => (
                <View key={index} style={styles.busItem}>
                  <Text style={styles.busInfoItem}>{bus.busNumber || busData.busNumber2}</Text>
                  <Text style={styles.busInfoItem}>Bus Brand: "{bus.busBrand || busData.busBrand}"</Text>
                  <Text style={styles.busInfoItem}>Current Mileage: {bus.currentMileage || busData.currentMileage}</Text>
                  <Text style={styles.busInfoItem}>Due From How Many KM: {bus.dueKm || busData.dueKm}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>No service due buses available</Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 30, // Add padding to account for status bar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  backButtonContainer: {
    position: 'absolute',
    left: 15,
    zIndex: 10,
    padding: 5,
  },
  backButton: {
    fontSize: 28,
    color: '#000000',
  },
  menuButtonContainer: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  menuButton: {
    fontSize: 24,
    color: '#333333',
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  topStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  topStatCard: {
    flex: 1,
    marginHorizontal: 5,
  },
  centerStatCard: {
    width: '100%',
    alignSelf: 'center',
  },
  statTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pieChartContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  pieChart: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 20,
    borderColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  },
  pieChartPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  statLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666666',
  },
  actionButton: {
    backgroundColor: '#FFA500',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  busInfoContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  busInfoItem: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 10,
  },
  noDataText: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 10,
  },
  tripItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  busItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  // Add new styles for the menu
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    width: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 60,
    marginRight: 10,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333333',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#333333',
  },
  subMenuItem: {
    paddingLeft: 25,
    paddingVertical: 12,
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFA500',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;