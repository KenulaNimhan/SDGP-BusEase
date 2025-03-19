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


     // Set sample data for demo purposes
     const setSampleData = () => {
        const sampleBuses = [
            {
                id: '1',
                busNumber: 'BUS-123',
                brand: 'Toyota',
                model: 'Coaster 2023',
                currentMileage: '25,000 km',
                dueKm: '500 km',
                lastServiceDate: '2023-06-20',
                nextServiceDate: '2023-09-20',
                serviceType: 'Regular Maintenance',
                estimatedCost: '$500',
                serviceHistory: [
                    { date: '2023-06-20', type: 'Oil Change', cost: '$150' },
                    { date: '2023-03-15', type: 'Tire Rotation', cost: '$100' },
                    { date: '2023-01-30', type: 'Brake Inspection', cost: '$200' }
                ]
            },
            {
                id: '2',
                busNumber: 'BUS-456',
                brand: 'Mercedes-Benz',
                model: 'Tourismo 2022',
                currentMileage: '32,000 km',
                dueKm: '200 km',
                lastServiceDate: '2023-05-15',
                nextServiceDate: '2023-08-15',
                serviceType: 'Major Service',
                estimatedCost: '$800',
                serviceHistory: [
                    { date: '2023-05-15', type: 'Full Service', cost: '$600' },
                    { date: '2023-02-10', type: 'Oil Change', cost: '$150' },
                    { date: '2023-01-05', type: 'Tire Replacement', cost: '$400' }
                ]
            },
            {
                id: '3',
                busNumber: 'BUS-789',
                brand: 'Volvo',
                model: 'B11R 2023',
                currentMileage: '18,000 km',
                dueKm: '1,000 km',
                lastServiceDate: '2023-07-01',
                nextServiceDate: '2023-10-01',
                serviceType: 'Oil Change',
                estimatedCost: '$200',
                serviceHistory: [
                    { date: '2023-07-01', type: 'Oil Change', cost: '$150' },
                    { date: '2023-04-15', type: 'Brake Service', cost: '$300' },
                    { date: '2023-02-01', type: 'General Inspection', cost: '$100' }
                ]
            },
            {
                id: '4',
                busNumber: 'BUS-101',
                brand: 'Scania',
                model: 'Touring 2022',
                currentMileage: '45,000 km',
                dueKm: '100 km',
                lastServiceDate: '2023-06-10',
                nextServiceDate: '2023-09-10',
                serviceType: 'Full Service',
                estimatedCost: '$1,000',
                serviceHistory: [
                    { date: '2023-06-10', type: 'Full Service', cost: '$800' },
                    { date: '2023-03-20', type: 'Oil Change', cost: '$150' },
                    { date: '2023-01-15', type: 'Tire Rotation', cost: '$100' }
                ]
            },
            {
                id: '5',
                busNumber: 'BUS-202',
                brand: 'MAN',
                model: "Lion's Coach 2023",
                currentMileage: '22,000 km',
                dueKm: '800 km',
                lastServiceDate: '2023-07-15',
                nextServiceDate: '2023-10-15',
                serviceType: 'Regular Maintenance',
                estimatedCost: '$400',
                serviceHistory: [
                    { date: '2023-07-15', type: 'Regular Service', cost: '$300' },
                    { date: '2023-04-20', type: 'Oil Change', cost: '$150' },
                    { date: '2023-02-10', type: 'Brake Inspection', cost: '$200' }
                ]
            }
        ];
        
        setServiceDueBuses(sampleBuses);
    };