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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 30, // Add padding to account for status bar
    },
    trackBusButton: {
        backgroundColor: '#FFA500',
        borderRadius: 25,
        padding: 15,
        margin: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    trackBusButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#666666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: '#DC3545',
        marginBottom: 15,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: '#FFA500',
        borderRadius: 25,
        padding: 10,
        paddingHorizontal: 20,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    busInfoContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    detailsContainer: {
        marginTop: 15,
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        padding: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFA500',
        marginBottom: 10,
    },
    marginTop: {
        marginTop: 20,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    detailLabel: {
        fontSize: 14,
        color: '#666666',
        flex: 1,
    },
    detailValue: {
        fontSize: 14,
        color: '#333333',
        flex: 2,
        textAlign: 'right',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    busNumberContainer: {
        borderWidth: 1,
        borderColor: '#FFA500',
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    busBrandContainer: {
        borderWidth: 1,
        borderColor: '#FFA500',
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    busNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    busBrand: {
        fontSize: 16,
        color: '#333333',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statusItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusLabel: {
        fontSize: 16,
        color: '#333333',
        marginRight: 10,
    },
    tripHistoryButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        margin: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFA500',
    },
    tripHistoryButtonText: {
        color: '#333333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tripHistoryContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
    },
    tripHistoryHeader: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    tripHeaderDate: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666666',
    },
    tripHeaderRoute: {
        flex: 1.5,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666666',
    },
    tripHeaderDriver: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666666',
    },
    tripHeaderConductor: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666666',
    },
    tripItem: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        backgroundColor: '#FFFFFF',
    },
    tripDate: {
        flex: 1,
        fontSize: 14,
        color: '#333333',
    },
    tripRoute: {
        flex: 1.5,
        fontSize: 14,
        color: '#333333',
    },
    tripDriver: {
        flex: 1,
        fontSize: 14,
        color: '#333333',
    },
    tripConductor: {
        flex: 1,
        fontSize: 14,
        color: '#333333',
    },
});

export default BusProfileScreen;