import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Style';

export default function ProductCard({ id, title, price, description, image, onSelect }) {
    const handlePress = async () => {
        Alert.alert('Alert', `${title}`);
        
        const product = { title, price };
        
        await AsyncStorage.setItem('selectedProduct', JSON.stringify(product));

        onSelect(product);
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.card}>
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                />
                <Text style={styles.productName}>{title}</Text>
                <Text style={styles.price}>${price}</Text>
                <Text>{description}</Text>
            </View>
        </TouchableOpacity>
    );
}
