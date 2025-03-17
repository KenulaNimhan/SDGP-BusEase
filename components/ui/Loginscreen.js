import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/icon.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text style={styles.appName}>BusEase</Text>
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
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

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forget password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => {
            if (email && password) {
              // Here you would typically validate credentials with an API
              console.log('User login with:', email, password);
              navigation.navigate('LiveTracking'); // Navigate to LiveTracking for user login
            } else {
              alert('Please enter email and password');
            }
          }}
        >
          <Text style={styles.loginButtonText}>User login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.registerButton}
          onPress={() => {
            if (email && password) {
              // Here you would typically validate organization credentials
              console.log('Organization login with:', email, password);
              navigation.navigate('Dashboard'); // Changed from 'OrganizationDashboard' to 'Dashboard'
            } else {
              alert('Please enter email and password');
            }
          }}
        >
          <Text style={styles.registerButtonText}>Organization login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.signupButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupButtonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFA500', // Orange background from Figma
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 40,
    },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 10,
    },
    appName: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    formContainer: {
      width: '100%',
    },
    input: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      fontSize: 16,
    },
    passwordContainer: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      marginBottom: 15,
      alignItems: 'center',
    },
    passwordInput: {
      flex: 1,
      padding: 15,
      fontSize: 16,
    },
    eyeIcon: {
      padding: 15,
    },
    forgotPassword: {
      color: '#FFFFFF',
      textAlign: 'right',
      marginBottom: 20,
    },
    loginButton: {
      backgroundColor: '#FFFFFF',
      borderRadius: 25,
      padding: 15,
      alignItems: 'center',
      marginBottom: 15,
    },
    loginButtonText: {
      color: '#FFA500',
      fontSize: 16,
      fontWeight: 'bold',
    },
    registerButton: {
      backgroundColor: '#FFFFFF',
      borderRadius: 25,
      padding: 15,
      alignItems: 'center',
      marginBottom: 15,
    },
    registerButtonText: {
      color: '#FFA500',
      fontSize: 16,
      fontWeight: 'bold',
    },
    signupButton: {
      backgroundColor: '#555555',
      borderRadius: 25,
      padding: 15,
      alignItems: 'center',
    },
    signupButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default LoginScreen;