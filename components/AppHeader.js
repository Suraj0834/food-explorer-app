import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const AppHeader = ({ title, onCameraPress, onSearchPress, onProfilePress, showBack = false, onBackPress }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {showBack && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Text style={styles.iconText}>Back</Text>
          </TouchableOpacity>
        )}
        
        <Text style={styles.title}>{title}</Text>
        
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={onCameraPress} style={styles.iconButton}>
            <Text style={styles.iconText}>Cam</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onSearchPress} style={styles.iconButton}>
            <Text style={styles.iconText}>Search</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onProfilePress} style={styles.profileButton}>
            <Text style={styles.iconText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 4,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#075E54',
    flex: 1,
    marginLeft: 8,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    paddingHorizontal: 8,
  },
  profileButton: {
    padding: 4,
    marginLeft: 8,
    paddingHorizontal: 8,
  },
  iconText: {
    fontSize: 12,
    color: '#075E54',
    fontWeight: '500',
  },
});

export default AppHeader; 