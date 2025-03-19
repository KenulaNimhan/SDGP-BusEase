import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import API from '../services/api';

const ServiceDueBusScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [serviceDueBuses, setServiceDueBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch service due buses on component mount
    useEffect(() => {
        fetchServiceDueBuses();
    }, []);

    // Function to fetch service due buses from API
    const fetchServiceDueBuses = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Mock token - in a real app, this would come from authentication state
            const token = 'mock-token';
            
            // Call API to get service due buses
            const response = await API.bus.getServiceDueBuses(token);
            
            if (response) {
                setServiceDueBuses(response);
            }
        } catch (err) {
            setError('Failed to fetch service due buses. Please try again.');
            console.error('Error fetching service due buses:', err);
            
            // For demo purposes, set sample data if API fails
            setSampleData();
        } finally {
            setLoading(false);
        }
    };