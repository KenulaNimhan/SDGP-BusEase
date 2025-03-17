import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Switch } from 'react-native';
import data from './buses.json';

export default function BusManagement() {
  const [busData, setBusData] = useState(data);
  const [filteredBuses, setFilteredBuses] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showSearchScreen, setShowSearchScreen] = useState(false);

  // Bus Details States
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [busModel, setBusModel] = useState('');
  const [seats, setSeats] = useState('');
  const [route, setRoute] = useState('');
  const [driverName, setDriverName] = useState('');
  const [contact, setContact] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [lastServiceDate, setLastServiceDate] = useState('');

  const getTotalBuses = () => busData.length;
  const getActiveBuses = () => busData.filter(bus => bus.isActive).length;
  const getInactiveBuses = () => getTotalBuses() - getActiveBuses();

  const handleSearch = () => {
    const results = busData.filter(
      (bus) =>
        bus.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bus.busModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bus.route.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBuses(results);
  };

  if (showSearchScreen) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search by vehicle number, model, or route"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableOpacity>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            {['Vehicle #', 'Model', 'Seats', 'Route', 'Driver', 'Contact', 'Active'].map((header, index) => (
              <Text key={index} style={styles.headerText}>{header}</Text>
            ))}
          </View>
          <FlatList
            data={filteredBuses}
            keyExtractor={(item) => item.vehicleNumber}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={styles.cell}>{item.vehicleNumber}</Text>
                <Text style={styles.cell}>{item.busModel}</Text>
                <Text style={styles.cell}>{item.seats}</Text>
                <Text style={styles.cell}>{item.route}</Text>
                <Text style={styles.cell}>{item.driverName}</Text>
                <Text style={styles.cell}>{item.contact}</Text>
                <Text style={[styles.cell, { color: item.isActive ? '#28A745' : '#DC3545' }]}>
                  {item.isActive ? 'Active' : 'Inactive'}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }

  if (showDashboard) {
    return (
      <View style={styles.container}>
        <Text style={styles.dashboardTitle}>Bus Dashboard</Text>
        <View style={styles.dashboardContainer}>
          <View style={[styles.dashboardTile, { backgroundColor: '#007AFF' }]}>
            <Text style={styles.dashboardNumber}>{getTotalBuses()}</Text>
            <Text style={styles.dashboardText}>Total Buses</Text>
          </View>
          <View style={[styles.dashboardTile, { backgroundColor: '#28A745' }]}>
            <Text style={styles.dashboardNumber}>{getActiveBuses()}</Text>
            <Text style={styles.dashboardText}>Active</Text>
          </View>
          <View style={[styles.dashboardTile, { backgroundColor: '#DC3545' }]}>
            <Text style={styles.dashboardNumber}>{getInactiveBuses()}</Text>
            <Text style={styles.dashboardText}>Inactive</Text>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            {['Vehicle #', 'Model', 'Seats', 'Route', 'Driver', 'Contact', 'Active'].map((header, index) => (
              <Text key={index} style={styles.headerText}>{header}</Text>
            ))}
          </View>
          <FlatList
            data={busData}
            keyExtractor={(item) => item.vehicleNumber}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={styles.cell}>{item.vehicleNumber}</Text>
                <Text style={styles.cell}>{item.busModel}</Text>
                <Text style={styles.cell}>{item.seats}</Text>
                <Text style={styles.cell}>{item.route}</Text>
                <Text style={styles.cell}>{item.driverName}</Text>
                <Text style={styles.cell}>{item.contact}</Text>
                <Text style={[styles.cell, { color: item.isActive ? '#28A745' : '#DC3545' }]}>
                  {item.isActive ? 'Active' : 'Inactive'}
                </Text>
              </View>
            )}
          />
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={() => setShowSearchScreen(true)}>
          <Text style={styles.buttonText}>Search for Buses</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Vehicle Number" style={styles.input} value={vehicleNumber} onChangeText={setVehicleNumber} />
      <TextInput placeholder="Bus Model" style={styles.input} value={busModel} onChangeText={setBusModel} />
      <TextInput placeholder="Number of Seats" style={styles.input} value={seats} onChangeText={setSeats} keyboardType="numeric" />
      <TextInput placeholder="Route" style={styles.input} value={route} onChangeText={setRoute} />
      <TextInput placeholder="Driver Name" style={styles.input} value={driverName} onChangeText={setDriverName} />
      <TextInput placeholder="Contact Number" style={styles.input} value={contact} onChangeText={setContact} keyboardType="phone-pad" />
      <Switch value={isActive} onValueChange={setIsActive} />

      <TouchableOpacity style={styles.searchButton} onPress={() => setShowDashboard(true)}>
        <Text style={styles.buttonText}>View Buses</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
  
  dashboardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlifn: 'center', 
    marginBottom: 10 
  },
  
  dashboardContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 15 
  },
  
  dashboardTile: { 
    flex: 1, 
    padding: 15, 
    alignItems: 'center', 
    borderRadius: 8 
  },
  
  dashboardNumber: {  // **Missing Style**
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  
  dashboardText: {  // **Missing Style**
    fontsize: 16, 
    color: '#fff' 
  },
  
  tableContainer: { 
    borderWidth: 1, 
    borderRadius: 5, 
    marginBottom: 15 
  },
  
  tableHeader: { 
    flexDirection: 'row', 
    padding: 10, 
    backgroundColor: '#C62828' 
  },
  
  headerText: { 
    flex: 1, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#fff' 
  },
  
  tableRow: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderColor: '#ccc', 
    padding: 10 
  },
  
  cell: { 
    flex: 1, 
    textAlign: 'center', 
    color: '#000' 
  },
  
  searchButton: { 
    backgroundColor: '#C62828', 
    padding: 12, 
    borderRadius: 5, 
    alignItems: 'center' 
  },
  
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});
