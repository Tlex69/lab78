import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,        
    marginVertical: 5,  
    alignItems: 'flex-start',
    width: '100%',  
  },
  image: {
    width: 150,            
    height: 150,
    alignSelf: 'center',
  },
  productName: {
    fontSize: 14,        
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,        
    color: '#ff0000',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
});

export default styles;
