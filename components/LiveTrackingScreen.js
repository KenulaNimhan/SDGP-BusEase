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
