import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const OrganizationRegistrationScreen = ({ navigation }) => {
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Organization Registration</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.stepText}>Step 2 / 2</Text>
        
        {/* Registration Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select User Role</Text>
            <View style={styles.roleSelector}>
              <TouchableOpacity style={styles.roleButton}>
                <Text style={styles.roleButtonText}>Organization</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Organization Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter organization name"
              value={orgName}
              onChangeText={setOrgName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bus Fleet Code/No</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter fleet code"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Admin Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter admin username"
              value={contactPerson}
              onChangeText={setContactPerson}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text>👁️</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

       