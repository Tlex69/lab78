import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firestore, auth } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function ProfileScreen({ navigation }) {
  const [profilePicture, setProfilePicture] = useState(null);
  const [userName, setUserName] = useState('name');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = auth.currentUser; 
        if (user) {
          const userRef = doc(firestore, 'users', user.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setUserName(docSnap.data().name); 
          }
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Sorry, we need media library permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Image Picker Result:', result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      console.log('Selected Image URI:', imageUri); 
      setProfilePicture(imageUri); 
    } else {
      Alert.alert('Selection Canceled', 'Image selection canceled');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Logout Error', 'An error occurred while logging out.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {profilePicture ? (
          <Image key={profilePicture} source={{ uri: profilePicture }} style={styles.profileImage} />
        ) : (
          <Image source={require('../assets/Administrator.png')} style={styles.profileImage} />
        )}
      </View>

      <View style={styles.txtContainer}>
        <Text style={styles.txt}>{userName}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>Change Profile Picture</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#b2dcff',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 30,
    width: 160,
    height: 160,
    borderRadius: 75,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#DAA520',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF6347', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  txtContainer: {
    marginBottom: 20,
  },
  txt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff', 
  },
});
