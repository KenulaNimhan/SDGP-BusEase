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

   // Render each bus service item
   const renderBusServiceItem = ({ item }) => (
    <View style={styles.busServiceItem}>
        <View style={styles.busHeader}>
            <View style={styles.busNumberContainer}>
                <Text style={styles.busNumber}>{item.busNumber}</Text>
            </View>
            <View style={styles.busInfoContainer}>
                <Text style={styles.busBrand}>{item.brand} - {item.model}</Text>
            </View>
        </View>

        <View style={styles.serviceDetails}>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Current Mileage:</Text>
                <Text style={styles.detailValue}>{item.currentMileage}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Service Due In:</Text>
                <Text style={[styles.detailValue, styles.dueKm]}>{item.dueKm}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Last Service:</Text>
                <Text style={styles.detailValue}>{item.lastServiceDate}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Next Service:</Text>
                <Text style={styles.detailValue}>{item.nextServiceDate}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Service Type:</Text>
                <Text style={styles.detailValue}>{item.serviceType}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Estimated Cost:</Text>
                <Text style={styles.detailValue}>{item.estimatedCost}</Text>
            </View>
        </View>

        <View style={styles.serviceHistory}>
            <Text style={styles.historyTitle}>Service History</Text>
            {item.serviceHistory.map((service, index) => (
                <View key={index} style={styles.historyItem}>
                    <Text style={styles.historyDate}>{service.date}</Text>
                    <Text style={styles.historyType}>{service.type}</Text>
                    <Text style={styles.historyCost}>{service.cost}</Text>
                </View>
            ))}
        </View>

        <TouchableOpacity 
            style={styles.scheduleButton}
            onPress={() => navigation.navigate('ScheduleService', { busId: item.id })}
        >
            <Text style={styles.scheduleButtonText}>Schedule Service</Text>
        </TouchableOpacity>
    </View>
);

return (
    <View style={styles.container}>
        <StatusBar style="auto" />

        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Service Due Buses</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by bus number or brand"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchIcon}>
                    <Text>🔍</Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* Loading Indicator */}
        {loading ? (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFA500" />
                <Text style={styles.loadingText}>Loading service due buses...</Text>
            </View>
        ) : error ? (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchServiceDueBuses}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <FlatList
                data={filteredBuses}
                renderItem={renderBusServiceItem}
                keyExtractor={item => item.id}
                style={styles.busList}
                contentContainerStyle={styles.busListContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No service due buses found</Text>
                    </View>
                }
            />
        )}
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 30,
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
},
backButton: {
    fontSize: 24,
    marginRight: 15,
},
headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
},
searchContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
},
searchBar: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center',
},
searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
},
searchIcon: {
    padding: 10,
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
busList: {
    flex: 1,
},
busListContent: {
    padding: 15,
},
busServiceItem: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
},
busHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
},
busNumberContainer: {
    backgroundColor: '#FFA500',
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10,
},
busNumber: {
    color: '#FFFFFF',
    fontWeight: 'bold',
},
busInfoContainer: {
    flex: 1,
    marginLeft: 10,
},
busBrand: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
},
serviceDetails: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
},
detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5
}
});

export default ServiceDueBusScreen;