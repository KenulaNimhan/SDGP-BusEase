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