// services/userService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define user types
export interface User {
  id: string;
  email: string;
  name: string;
  password: string; // In a real app, never store plain text passwords
}

export interface UserData {
  id: string;
  email: string;
  name: string;
}

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Load users from storage
export const loadUsers = async (): Promise<User[]> => {
  try {
    const usersJson = await AsyncStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
};

// Save users to storage
export const saveUsers = async (users: User[]): Promise<void> => {
  try {
    await AsyncStorage.setItem('users', JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
    throw new Error('Failed to save user data');
  }
};

// Find user by email
export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const users = await loadUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Register a new user
export const registerUser = async (
  email: string, 
  password: string, 
  name: string
): Promise<{ success: boolean; error?: string; userData?: UserData }> => {
  try {
    // Validate inputs
    if (!email || !password || !name) {
      return { success: false, error: 'All fields are required' };
    }
    
    if (!isValidEmail(email)) {
      return { success: false, error: 'Please enter a valid email address' };
    }
    
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return { success: false, error: 'Email is already registered' };
    }

    // Create new user
    const users = await loadUsers();
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      password, // In a real app, hash this password
    };

    // Save updated users list
    await saveUsers([...users, newUser]);

    // Return user data (without password)
    const userData: UserData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    };

    return { success: true, userData };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Registration failed. Please try again.' };
  }
};

// Login user
export const loginUser = async (
  email: string, 
  password: string
): Promise<{ success: boolean; error?: string; userData?: UserData }> => {
  try {
    // Validate inputs
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }

    // Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Check password
    if (user.password !== password) { // In a real app, compare hashed passwords
      return { success: false, error: 'Invalid password' };
    }

    // Return user data (without password)
    const userData: UserData = {
      id: user.id,
      email: user.email,
      name: user.name
    };

    return { success: true, userData };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed. Please try again.' };
  }
};