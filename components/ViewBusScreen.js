import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import API from '../services/api';

const ViewBusScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch buses on component mount
    useEffect(() => {
        fetchBuses();
    }, []);

    // Function to fetch buses from API
    const fetchBuses = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Mock token - in a real app, this would come from authentication state
            const token = 'mock-token';
            
            // Call API to get all buses
            const response = await API.bus.getAllBuses(token);
            
            if (response) {
                setBuses(response);
            }
        } catch (err) {
            setError('Failed to fetch buses. Please try again.');
            console.error('Error fetching buses:', err);
            
            // For demo purposes, set sample data if API fails
            setSampleData();
        } finally {
            setLoading(false);
        }
    };
