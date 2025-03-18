import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, ScrollView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import API from '../services/api';

const BusProfileScreen = ({ route, navigation }) => {
    // Get bus data from navigation params
    const { bus } = route.params || {};
    const [busData, setBusData] = useState(null);
    const [tripHistory, setTripHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seatingCapacity, setSeatingCapacity] = useState('45');
    const [manufacturer, setManufacturer] = useState('Toyota');
    const [licenseNumber, setLicenseNumber] = useState('LIC-12345');

    // State for switches
    const [isServiceEnabled, setIsServiceEnabled] = useState(false);
    const [isActiveEnabled, setIsActiveEnabled] = useState(false);

    // Fetch bus details and trip history on component mount
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
            
            // Use the busId from params, or fallback to a default for demo
            const busId = bus?.id || 'BUS-123';
            
            // Fetch bus details and trip history
            const busDetails = bus || await API.bus.getBusById(busId, token);
            const tripHistoryData = await API.trip.getBusTripHistory(busId, token);
            
            if (busDetails) {
                setBusData({
                    busNumber: busDetails.busNumber || 'ABC-1234',
                    brand: busDetails.route || 'Toyota - Coaster',
                    serviceStatus: busDetails.status === 'Active',
                    activeStatus: busDetails.status === 'Active',
                    seatingCapacity: busDetails.seatingCapacity || '45',
                    manufacturer: busDetails.manufacturer || 'Toyota',
                    licenseNumber: busDetails.licenseNumber || 'LIC-12345'
                });
                
                setIsServiceEnabled(busDetails.status === 'Active');
                setIsActiveEnabled(busDetails.status === 'Active');
            }
            
            if (tripHistoryData) {
                setTripHistory(tripHistoryData);
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