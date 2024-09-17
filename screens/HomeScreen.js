import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../component/ProductCard';
import { firestore } from '../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigation = useNavigation();



  const toggleProductSelection = (product) => {
    setSelectedProducts(prevSelectedProducts => {
      if (prevSelectedProducts.some(p => p.id === product.id)) {
        return prevSelectedProducts.filter(p => p.id !== product.id);
      } else {
        return [...prevSelectedProducts, product];
      }
    });
  };

  useEffect(() => {
    const getSelectedProducts = async () => {
      try {
        const savedProducts = await AsyncStorage.getItem('selectedProducts');
        if (savedProducts) {
          setSelectedProducts(JSON.parse(savedProducts));
        }
      } catch (error) {
        console.error('Error loading selected products', error);
      }
    };
    getSelectedProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
        setFilteredProducts(productsList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (filter === 'IN_STOCK') {
      setFilteredProducts(products.filter(product => product.stock));
    } else {
      setFilteredProducts(products);
    }
  }, [filter, products]);

  const handleNavigateToCart = (product) => {
    navigation.navigate('Cart', { selectedProducts });  
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'ALL']}
          onPress={() => setFilter('ALL')}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'IN_STOCK']}
          onPress={() => setFilter('IN_STOCK')}
        >
          <Text style={styles.filterText}>In Stock</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <ScrollView style={styles.scrollContainer}>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.name}
              price={product.price}
              description={`จำนวนคงเหลือ ${product.stock}`}
              image={product.picture}
              onSelect={() => {
                toggleProductSelection(product);
                handleNavigateToCart(); 
              }}
              isSelected={selectedProducts.some(p => p.id === product.id)} 
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2dcff',
    paddingTop: 25,
  },
  filterContainer: {
    marginVertical: 10,
  },
  filterButton: {
    padding: 15,
    backgroundColor: '#6495ED',
  },
  filterText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    flex: 1,
  },
});
