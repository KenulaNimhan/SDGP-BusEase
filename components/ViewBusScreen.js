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

     // Set sample data for demo purposes
     const setSampleData = () => {
        setBuses(API.bus.getAllBuses());
    };


    // Set sample data for demo purposes
    const setSampleData = () => {
        setBuses(API.bus.getAllBuses());
    };

    // Filter buses based on active filter
    const filteredBuses = buses.filter(bus => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'active') return bus.status === 'active';
        if (activeFilter === 'inactive') return bus.status === 'maintenance';
        return true;
    });

    // Further filter based on search query
    const searchedBuses = filteredBuses.filter(bus => {
        const query = searchQuery.toLowerCase();
        return (
            bus.busNumber.toLowerCase().includes(query) ||
            bus.model.toLowerCase().includes(query) ||
            bus.manufacturer.toLowerCase().includes(query)
        );
    });

    // Table header component
    const TableHeader = () => (
        <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Bus No.</Text>
            <Text style={styles.tableHeaderCell}>Route</Text>
            <Text style={styles.tableHeaderCell}>Driver</Text>
            <Text style={styles.tableHeaderCell}>Status</Text>
        </View>
    );

    // Render each bus item
    const renderBusItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                // Find the complete bus data from dummy data
                const busDetails = API.bus.getBusById(item.id);
                navigation.navigate('BusProfile', { bus: busDetails });
            }}
            activeOpacity={0.7}
        >
            <View style={styles.busItem}>
                <Text style={styles.busItemCell}>{item.busNumber}</Text>
                <Text style={styles.busItemCell}>{item.route || 'Not Assigned'}</Text>
                <Text style={styles.busItemCell}>{item.driverName || 'No Driver'}</Text>
                <Text style={[styles.busItemCell, styles.statusCell, 
                    item.status === 'active' ? styles.activeStatus : styles.inactiveStatus]}>
                    {item.status === 'active' ? 'Active' : 'Maintenance'}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                    <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>View Bus</Text>
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity style={styles.searchIcon}>
                        <Text>🔍</Text>
                    </TouchableOpacity>
                </View>

                {/* Filters */}
                <View style={styles.filterContainer}>
                    <Text style={styles.filterLabel}>Filter:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScrollView}>
                        <TouchableOpacity
                            style={[styles.filterButton, activeFilter === 'all' && styles.activeFilterButton]}
                            onPress={() => setActiveFilter('all')}
                        >
                            <Text style={[styles.filterButtonText, activeFilter === 'all' && styles.activeFilterButtonText]}>All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, activeFilter === 'active' && styles.activeFilterButton]}
                            onPress={() => setActiveFilter('active')}
                        >
                            <Text style={[styles.filterButtonText, activeFilter === 'active' && styles.activeFilterButtonText]}>Active</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, activeFilter === 'inactive' && styles.activeFilterButton]}
                            onPress={() => setActiveFilter('inactive')}
                        >
                            <Text style={[styles.filterButtonText, activeFilter === 'inactive' && styles.activeFilterButtonText]}>Inactive</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.serviceDueButton}
                            onPress={() => navigation.navigate('ServiceDueBus')}
                        >
                            <Text style={styles.serviceDueButtonText}>Service Due</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>

            {/* Loading Indicator */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FFA500" />
                    <Text style={styles.loadingText}>Loading buses...</Text>
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={fetchBuses}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                /* Bus List with Table Header */
                <View style={styles.busListContainer}>
                    <TableHeader />
                    <FlatList
                        data={searchedBuses}
                        renderItem={renderBusItem}
                        keyExtractor={item => item.id}
                        style={styles.busList}
                        contentContainerStyle={styles.busListContent}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No buses found</Text>
                            </View>
                        }
                    />
                </View>
            )}
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 30, // Add padding to account for status bar
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
    backButtonContainer: {
        position: 'absolute',
        left: 20,
        zIndex: 10,
    },
    backButton: {
        fontSize: 24,
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    searchIcon: {
        padding: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterLabel: {
        fontSize: 14,
        color: '#333333',
        marginRight: 10,
    },
    filterScrollView: {
        flexGrow: 0,
    },
    filterButton: {
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    activeFilterButton: {
        backgroundColor: '#FFA500',
    },
    filterButtonText: {
        color: '#333333',
        fontSize: 14,
    },
    activeFilterButtonText: {
        color: '#FFFFFF',
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
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
    },
    emptyText: {
        color: '#666666',
        fontSize: 16,
    },
    busListContainer: {
        flex: 1,
        marginTop: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    tableHeaderCell: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 14,
        color: '#666666',
    },
    busList: {
        flex: 1,
    },
    busListContent: {
        paddingHorizontal: 15,
    },
    busItem: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    busItemCell: {
        flex: 1,
        fontSize: 14,
        color: '#333333',
    },
    statusCell: {
        fontWeight: 'bold',
    },
    activeStatus: {
        color: '#28A745',
    },
    inactiveStatus: {
        color: '#DC3545',
    },
    actionButton: {
        backgroundColor: '#FFA500',
        borderRadius: 25,
        padding: 15,
        margin: 15,
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    serviceDueButton: {
        backgroundColor: '#FFA500',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginLeft: 10,
    },
    serviceDueButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default ViewBusScreen;