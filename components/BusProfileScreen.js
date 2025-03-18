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



    // Handle status toggle changes
    const handleServiceToggle = async (value) => {
        setIsServiceEnabled(value);
        // In a real app, you would update the bus status via API
        // await API.bus.updateBus(busData.id, { serviceStatus: value }, token);
    };

    const handleActiveToggle = async (value) => {
        setIsActiveEnabled(value);
        // In a real app, you would update the bus status via API
        // await API.bus.updateBus(busData.id, { activeStatus: value }, token);
    };

    // Show loading state
    if (loading) {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Bus Profile</Text>
                </View>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FFA500" />
                    <Text style={styles.loadingText}>Loading bus data...</Text>
                </View>
            </View>
        );
    }

    // Show error state
    if (error) {
        return (
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backButton}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Bus Profile</Text>
                </View>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={fetchBusData}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bus Profile</Text>
            </View>

            <ScrollView style={styles.content}>
                {/* Bus Info */}
                <View style={styles.busInfoContainer}>
                    <View style={styles.infoRow}>
                        <View style={styles.busNumberContainer}>
                            <Text style={styles.busNumber}>{busData.busNumber}</Text>
                        </View>
                        <View style={styles.busBrandContainer}>
                            <Text style={styles.busBrand}>{busData.manufacturer}</Text>
                        </View>
                    </View>

                    {/* Status Toggles */}
                    <View style={styles.statusContainer}>
                        <View style={styles.statusItem}>
                            <Text style={styles.statusLabel}>Service</Text>
                            <Switch
                                trackColor={{ false: '#DDDDDD', true: '#FFA500' }}
                                thumbColor={isServiceEnabled ? '#FFFFFF' : '#FFFFFF'}
                                onValueChange={handleServiceToggle}
                                value={isServiceEnabled}
                            />
                        </View>
                        <View style={styles.statusItem}>
                            <Text style={styles.statusLabel}>Active</Text>
                            <Switch
                                trackColor={{ false: '#DDDDDD', true: '#FFA500' }}
                                thumbColor={isActiveEnabled ? '#FFFFFF' : '#FFFFFF'}
                                onValueChange={handleActiveToggle}
                                value={isActiveEnabled}
                            />
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={styles.tripHistoryButton}
                        onPress={() => {}}
                    >
                        <Text style={styles.tripHistoryButtonText}>Trip History</Text>
                    </TouchableOpacity>

                    {/* Trip History Table */}
                    <View style={styles.tripHistoryContainer}>
                        <View style={styles.tripHistoryHeader}>
                            <Text style={styles.tripHeaderDate}>Date</Text>
                            <Text style={styles.tripHeaderRoute}>Route</Text>
                            <Text style={styles.tripHeaderDriver}>Driver</Text>
                            <Text style={styles.tripHeaderConductor}>Conductor</Text>
                        </View>

                        {tripHistory.map(trip => (
                            <View key={trip.id} style={styles.tripItem}>
                                <Text style={styles.tripDate}>{trip.date}</Text>
                                <Text style={styles.tripRoute}>{trip.route}</Text>
                                <Text style={styles.tripDriver}>{trip.driver}</Text>
                                <Text style={styles.tripConductor}>{trip.conductor}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};