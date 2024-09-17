import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { firestore } from '../firebaseConfig'; 
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';

export default function CartScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        if (route.params && route.params.selectedProducts) {
          setSelectedProducts(route.params.selectedProducts);
        } else {
          const cartCollection = collection(firestore, 'cart');
          const cartSnapshot = await getDocs(cartCollection);
          const cartProducts = cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setSelectedProducts(cartProducts);
        }
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };

    fetchCartProducts();
  }, [route.params]);

  const handleRemoveProduct = async (id) => {
    if (!id) {
      console.error('Invalid product id:', id);
      return;
    }
    try {
      await deleteDoc(doc(firestore, 'cart', id));
      setSelectedProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleOrder = async () => {
    try {
      const userOrderCollection = collection(firestore, 'orders');
      const cartCollection = collection(firestore, 'cart');

      for (const product of selectedProducts) {
        await addDoc(userOrderCollection, product);
      }

      const cartSnapshot = await getDocs(cartCollection);
      const cartDocs = cartSnapshot.docs;
      for (const doc of cartDocs) {
        await deleteDoc(doc.ref);
      }

      setSelectedProducts([]);

      Alert.alert('Success', 'Order placed successfully and cart cleared!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Order Error', 'An error occurred while placing the order.');
    }
  };

  return (
    <View style={styles.container}>
      {selectedProducts.length > 0 && (
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>Order</Text>
        </TouchableOpacity>
      )}
      <ScrollView style={styles.scrollContainer}>
        {selectedProducts.length > 0 ? (
          selectedProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productContainer}
              onPress={() => handleRemoveProduct(product.id)}
            >
              <Text style={styles.productName}>{product.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products in cart</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2dcff',
    paddingTop: 35,
  },
  scrollContainer: {
    flex: 1,
  },
  productContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ffcc00',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#ffcc00',
    padding: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});
