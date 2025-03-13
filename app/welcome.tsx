// app/welcome.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to BusEase Management!</Text>
      <Button
        title="Get Started"
        onPress={() => router.push('/(tabs)')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,               // Takes full screen height
    justifyContent: 'center', // Centers vertically
    alignItems: 'center',   // Centers horizontally
    backgroundColor: '#fff' // Optional: Ensures white background
  },
  welcomeText: {
    fontSize: 18,          // Adjust text size
    fontWeight: 'bold',    // Make text bold
    marginBottom: 20       // Space between text & button
  },
});
