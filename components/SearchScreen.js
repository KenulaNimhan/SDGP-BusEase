import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text } from 'react-native';
import { searchEmployee } from '../api/api';

const employeesData = require('../data/employees.json');

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const handleSearch = () => {
    const results = employeesData.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(query.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(query.toLowerCase()) ||
        employee.username.toLowerCase().includes(query.toLowerCase()) ||
        employee.nic.includes(query)
    );
    const apiResults = searchEmployee(query);
    setFilteredEmployees(results);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="search by nic or name"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} color="#CC5500" />
      <ScrollView style={styles.tableContainer}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.header}>ID</Text>
            <Text style={styles.header}>First Name</Text>
            <Text style={styles.header}>Last Name</Text>
            <Text style={styles.header}>NIC</Text>
            <Text style={styles.header}>Role</Text>
            <Text style={styles.header}>Status</Text>
          </View>
          {filteredEmployees.map((employee) => (
            <View key={employee.id} style={styles.row}>
              <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">
                {employee.id}
              </Text>
              <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">
                {employee.firstName}
              </Text>
              <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">
                {employee.lastName}
              </Text>
              <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">
                {employee.nic}
              </Text>
              <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">
                {employee.role}
              </Text>
              <Text style={[styles.cell, employee.active ? styles.active : styles.inactive]} numberOfLines={1} ellipsizeMode="tail">
                {employee.active ? 'Active' : 'Inactive'}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  tableContainer: {
    marginTop: 20,
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#CC5500',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  header: {
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  active: {
    color: 'green',
  },
  inactive: {
    color: 'red',
  },
});

export default SearchScreen;