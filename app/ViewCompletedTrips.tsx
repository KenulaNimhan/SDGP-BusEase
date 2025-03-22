import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import API from '../services/api';

const ViewCompletedTripsScreen = ({ navigation }) => {
  // State for completed trips data
  const [completedTrips, setCompletedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch completed trips on component mount
  useEffect(() => {
    fetchCompletedTrips();
  }, []);

  // Function to fetch completed trips from API
  const fetchCompletedTrips = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock token - in a real app, this would come from authentication state
      const token = 'mock-token';
      
      // Call API to get completed trips
      const response = await API.trip.getCompletedTrips(token);
      
      if (response) {
        setCompletedTrips(response);
      }
    } catch (err) {
      setError('Failed to fetch completed trips. Please try again.');
      console.error('Error fetching completed trips:', err);
      
      // For demo purposes, set sample data if API fails
      setSampleData();
    } finally {
      setLoading(false);
    }
  };



  // Render each trip item
  const renderTripItem = ({ item }) => (
    <View style={styles.tripItem}>
      <View style={styles.tripHeader}>
        <Text style={styles.busId}>{item.busId}</Text>
        <Text style={styles.tripStatus}>{item.status}</Text>
      </View>
      <View style={styles.tripDetail}>
        <Text style={styles.tripLabel}>Route:</Text>
        <Text style={styles.tripValue}>{item.route}</Text>
      </View>
      <View style={styles.tripDetail}>
        <Text style={styles.tripLabel}>Date:</Text>
        <Text style={styles.tripValue}>{item.date}</Text>
      </View>
      <View style={styles.tripDetail}>
        <Text style={styles.tripLabel}>Driver:</Text>
        <Text style={styles.tripValue}>{item.driver}</Text>
      </View>
      <View style={styles.tripDetail}>
        <Text style={styles.tripLabel}>Conductor:</Text>
        <Text style={styles.tripValue}>{item.conductor}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>View Completed Trips</Text>
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
          <Text style={styles.loadingText}>Loading trips...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchCompletedTrips}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Trips List */
        <FlatList
          data={completedTrips}
          renderItem={renderTripItem}
          keyExtractor={item => item.id}
          style={styles.tripsList}
          contentContainerStyle={styles.tripsListContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No completed trips found</Text>
            </View>
          }
        />
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#DC3545',
    marginBottom: 15,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#FFA500',
    borderRadius: 25,
    padding: 10,
    paddingHorizontal: 20,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#666666',
    fontSize: 16,
  },
  tripsList: {
    flex: 1,
  },
  tripsListContent: {
    padding: 15,
  },
  tripItem: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  busId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  tripStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28A745',
    backgroundColor: '#E6F7E6',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tripDetail: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  tripLabel: {
    fontSize: 14,
    color: '#666666',
    width: 80,
  },
  tripValue: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
});

export default ViewCompletedTripsScreen;