import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as userService from '../services/userService';

// Define the User type
type User = {
  id: string;
  email: string;
  name: string;
} | null;

// Define the context type
type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userJSON = await AsyncStorage.getItem('currentUser');
        if (userJSON) {
          setUser(JSON.parse(userJSON));
          // Don't navigate here, we'll do that after initialization
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    checkLoginStatus();
  }, []);

  // Handle navigation after initialization
  useEffect(() => {
    if (isInitialized) {
      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    }
  }, [isInitialized, user]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const result = await userService.loginUser(email, password);
      
      if (result.success && result.userData) {
        // Store current user in AsyncStorage
        await AsyncStorage.setItem('currentUser', JSON.stringify(result.userData));
        
        // Update state
        setUser(result.userData);
        
        // Navigate to home screen
        router.replace('/(tabs)');
      }
      
      return result;
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Signup function
  const signup = async (email: string, password: string, name: string) => {
    try {
      const result = await userService.registerUser(email, password, name);
      
      if (result.success && result.userData) {
        // Store current user in AsyncStorage
        await AsyncStorage.setItem('currentUser', JSON.stringify(result.userData));
        
        // Update state
        setUser(result.userData);
        
        // Navigate to home screen
        router.replace('/(tabs)');
      }
      
      return result;
    } catch (error: any) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Remove user data from AsyncStorage
      await AsyncStorage.removeItem('currentUser');
      
      // Update state
      setUser(null);
      
      // Navigate to login screen
      router.replace('/login');
      
      return { success: true };
    } catch (error: any) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  // Create a loading screen component to prevent early navigation
  if (loading) {
    return (
      <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
        {/* You could render a loading spinner here instead of null */}
        {null}
      </AuthContext.Provider>
    );
  }

  // Provide the auth context value
  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;