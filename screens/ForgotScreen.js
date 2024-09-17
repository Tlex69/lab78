import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';


export default function ForgotScreen({ navigation }) {
  const [email, setEmail] = useState('');


  const handleResetPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Success', 'Password reset email sent');
        navigation.navigate('Login');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };


  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="mail" size={100} color="#000" />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#b2dcff',
  },
  iconContainer: {
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#f4f4f4',
  },
  button: {
    backgroundColor: '#ffcc00',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});


