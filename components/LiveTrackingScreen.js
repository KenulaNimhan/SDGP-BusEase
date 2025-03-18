import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker, Polyline } from 'react-native-maps';
import API from '../services/api';

const LiveTrackingScreen = ({ route, navigation }) => {
    // Get bus ID from navigation params
    const { busNumber } = route.params || {};
    
    // State for bus location and route
    const [busRoute, setBusRoute] = useState([]);
    const [busLocation, setBusLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch bus location and route on component mount
    useEffect(() => {
        fetchBusData();
    }, []);

    // Function to fetch bus data from API
    const fetchBusData = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Mock token - in a real app, this would come from authentication state
            const token = 'mock-token';
            
            // Use the busNumber from params, or fallback to a default for demo
            const busId = busNumber || 'BUS-123';
            
            // Fetch bus location and route data
            const locationData = await API.tracking.getBusLocation(busId, token);
            const routeData = await API.tracking.getBusRoute(busId, token);
            
            if (locationData && routeData) {
                setBusLocation(locationData);
                setBusRoute(routeData);
            }
        } catch (err) {
            setError('Failed to fetch bus data. Please try again.');
            console.error('Error fetching bus data:', err);
            
            // For demo purposes, set sample data if API fails
            setSampleData();
        } finally {
            setLoading(false);
        }
    };


    // Set sample data for demo purposes
    const setSampleData = () => {
        const sampleRoute = [
            { latitude: 37.78825, longitude: -122.4324 },  // Starting point - San Francisco
            { latitude: 37.78925, longitude: -122.4344 },  // Route point 1
            { latitude: 37.79025, longitude: -122.4364 },  // Route point 2
            { latitude: 37.79125, longitude: -122.4384 },  // Route point 3
            { latitude: 37.79225, longitude: -122.4404 },  // Route point 4
            { latitude: 37.79325, longitude: -122.4424 },  // Route point 5
            { latitude: 37.79425, longitude: -122.4444 },  // Route point 6
            { latitude: 37.79525, longitude: -122.4464 },  // Current bus location
        ];
        
        // Set the route points
        setBusRoute(sampleRoute);
        
        // Set the current bus location to the last point in the route
        const currentLocation = sampleRoute[sampleRoute.length - 1];
        setBusLocation({
            ...currentLocation,
            title: "Bus #123",
            description: "Route: Downtown Express\nSpeed: 45 km/h\nNext Stop: Market Street"
        });
    };



    // Handle refresh location button press
    const handleRefreshLocation = () => {
        fetchBusData();
    };

    // Handle view bus details button press
    const handleViewBusDetails = () => {
        navigation.navigate('BusProfile', { busNumber });
    };

    // If still loading or no data available, show loading state
    if (loading || !busLocation) {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Live Tracking</Text>
                </View>
                <View style={[styles.mapContainer, styles.loadingContainer]}>
                    <Text>Loading bus location...</Text>
                </View>
            </View>
        );
    }

    // Starting point (first point in the route)
    const startLocation = busRoute[0];

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Live Tracking</Text>
            </View>

            {/* Map View */}
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: busLocation.latitude,
                        longitude: busLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {/* Starting Point Marker */}
                    <Marker
                        coordinate={startLocation}
                        title="Start"
                        pinColor="blue"
                    />

                    {/* Bus Location Marker */}
                    <Marker
                        coordinate={busLocation}
                        title="Bus"
                        pinColor="red"
                    />

                    {/* Route Line */}
                    <Polyline
                        coordinates={busRoute}
                        strokeColor="#FFA500" // Orange color
                        strokeWidth={4}
                    />
                </MapView>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={handleRefreshLocation}
                >
                    <Text style={styles.actionButtonText}>Refresh Location</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={handleViewBusDetails}
                >
                    <Text style={styles.actionButtonText}>View Bus Details</Text>
                </TouchableOpacity>
            </View>
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
    backButton: {
        fontSize: 24,
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    mapContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    actionContainer: {
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    actionButton: {
        backgroundColor: '#FFA500',
        borderRadius: 25,
        padding: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LiveTrackingScreen;