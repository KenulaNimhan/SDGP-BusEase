import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const EmployeeTable = ({ employees }) => {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.header}>Employee ID</Text>
          <Text style={styles.header}>First Name</Text>
          <Text style={styles.header}>Last Name</Text>
          <Text style={styles.header}>NIC</Text>
          <Text style={styles.header}>Role</Text>
          <Text style={styles.header}>Status</Text>
        </View>
        {employees.map((employee, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{employee.id}</Text>
            <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">{employee.firstName}</Text>
            <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">{employee.lastName}</Text>
            <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">{employee.nic}</Text>
            <Text style={styles.cell} numberOfLines={1} ellipsizeMode="tail">{employee.role}</Text>
            <Text style={[styles.cell, employee.active ? styles.active : styles.inactive]}>
              {employee.active ? 'Active' : 'Inactive'}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#6200ee',
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

export default EmployeeTable;
