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


    // Set sample data for demo purposes
    const setSampleData = () => {
        // Sample bus data
        const sampleBusData = {
            busNumber: bus?.busNumber || 'ABC-1234',
            brand: bus?.route || 'Toyota - Coaster',
            manufacturer: bus?.manufacturer || 'Toyota',
            model: bus?.model || 'Coaster 2023',
            registrationDate: bus?.registrationDate || '2023-01-15',
            lastMaintenance: bus?.lastMaintenance || '2023-06-20',
            nextMaintenance: bus?.nextMaintenance || '2023-09-20',
            fuelEfficiency: bus?.fuelEfficiency || '8.5 km/l',
            totalTrips: bus?.totalTrips || 450,
            seatingCapacity: bus?.seatingCapacity || 45,
            currentMileage: bus?.currentMileage || '25,000 km',
            insuranceNumber: bus?.insuranceNumber || 'INS-789012',
            insuranceExpiry: bus?.insuranceExpiry || '2024-12-31',
            engineNumber: bus?.engineNumber || 'ENG-456789',
            chassisNumber: bus?.chassisNumber || 'CHS-123456',
            purchaseDate: bus?.purchaseDate || '2023-01-01',
            purchasePrice: bus?.purchasePrice || '$85,000',
            serviceHistory: bus?.serviceHistory || [
                { date: '2023-06-20', type: 'Regular Maintenance', cost: '$500' },
                { date: '2023-03-15', type: 'Oil Change', cost: '$150' },
                { date: '2023-01-30', type: 'Tire Replacement', cost: '$800' }
            ],
            serviceStatus: bus?.status === 'Active',
            activeStatus: bus?.status === 'Active'
        };
        
        // Sample trip history data
        const sampleTripHistory = [
            { id: '1', date: '2025-03-15', route: 'Colombo-Aluthgama', driver: 'John Doe', conductor: 'Sandun Perera' },
            { id: '2', date: '2025-03-16', route: 'Kandy-Nuwara', driver: 'Alex Perera', conductor: 'Kasun Jayasekara' },
            { id: '3', date: '2025-03-17', route: 'Galle-Matara', driver: 'Nimal Silva', conductor: 'Nimal Fernando' },
            { id: '4', date: '2025-03-18', route: 'Jaffna-Vavuniya', driver: 'Roshan Silva', conductor: 'Nimal Abeykoon' },
            { id: '5', date: '2025-03-19', route: 'Colombo-Aluthgama', driver: 'Kasun Perera', conductor: 'Isuru Perera' },
            { id: '6', date: '2025-03-20', route: 'Jaffna-Vavuniya', driver: 'Amal Doe', conductor: 'Harsha Pathira' },
            { id: '7', date: '2025-03-21', route: 'Colombo-Aluthgama', driver: 'Roshan Perera', conductor: 'Nimal Fernando' },
        ];
        
        setBusData(sampleBusData);
        setTripHistory(sampleTripHistory);
        setIsServiceEnabled(sampleBusData.serviceStatus);
        setIsActiveEnabled(sampleBusData.activeStatus);
    };