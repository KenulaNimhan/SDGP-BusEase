import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const PassengerRegistrationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
});

export default PassengerRegistrationScreen;
