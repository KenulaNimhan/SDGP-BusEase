import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const SignupScreen = ({ navigation }) => {
  const [userType, setUserType] = useState('passenger'); // 'passenger' or 'organization'

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select User Type</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.stepText}>Step 1 / 2</Text>
        
        {/* User Type Selection */}
        <View style={styles.userTypeContainer}>
          <TouchableOpacity 
            style={[styles.userTypeButton, userType === 'passenger' && styles.selectedUserType]}
            onPress={() => setUserType('passenger')}
          >
            <Text style={[styles.userTypeText, userType === 'passenger' && styles.selectedUserTypeText]}>Passenger</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.userTypeButton, userType === 'organization' && styles.selectedUserType]}
            onPress={() => setUserType('organization')}
          >
            <Text style={[styles.userTypeText, userType === 'organization' && styles.selectedUserTypeText]}>Organization</Text>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => {
            if (userType === 'passenger') {
              navigation.navigate('PassengerRegistration');
            } else {
              navigation.navigate('OrganizationRegistration');
            }
          }}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        {/* Terms and Conditions */}
        <Text style={styles.termsText}>
          By clicking on continue, I agree to the Terms of Service and Privacy Policy
        </Text>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  stepText: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 20,
  },
  userTypeContainer: {
    marginBottom: 30,
  },
  userTypeButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  selectedUserType: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FFA500',
  },
  userTypeText: {
    fontSize: 16,
    color: '#333333',
  },
  selectedUserTypeText: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#FFA500',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default SignupScreen;