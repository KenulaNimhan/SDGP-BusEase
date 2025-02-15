import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const EmployeeTable = ({ employees }) => {
  return (
    <ScrollView>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.header}>Employee ID</Text>
          <Text style={styles.header}>First Name</Text>
          <Text style={styles.header}>Last Name</Text>
          <Text style={styles.header}>Role</Text>
          <Text style={styles.header}>Status</Text>
        </View>
        {employees.map((employee, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{employee.id}</Text>
            <Text style={styles.cell}>{employee.firstName}</Text>
            <Text style={styles.cell}>{employee.lastName}</Text>
            <Text style={styles.cell}>{employee.role}</Text>
            <Text style={styles.cell}>{employee.active ? 'Active' : 'Inactive'}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    margin: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  header: {
    fontWeight: 'bold',
    flex: 1,
  },
  cell: {
    flex: 1,
  },
});

export default EmployeeTable;