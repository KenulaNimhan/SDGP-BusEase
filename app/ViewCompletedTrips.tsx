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



export default ViewCompletedTripsScreen;