import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddProduct = ({navigation}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleAddProduct = async () => {
    if (!name || !price || !image) {
      Alert.alert('Validation Failed', 'Name, Price & image are required');
      return;
    }
    const storedProducts = await AsyncStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    if (products.find(product => product.name === name)) {
      Alert.alert('Validation Failed', 'Product already exists');
      return;
    }
    const newProduct = {name, price, image};
    const updatedProducts = [...products, newProduct];
    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
    navigation.goBack();
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.textStyle}>Product Name</Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            placeholder="Enter Product Name"
            onChangeText={setName}
          />
          <Text style={styles.textStyle}>Product Price</Text>
          <TextInput
            style={styles.inputBox}
            value={price}
            placeholder="Enter Product Price"
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <Text style={styles.textStyle}>Product Image URL</Text>
          <TextInput
            style={styles.inputBox}
            value={image}
            onChangeText={setImage}
            placeholder="Enter Product Price"
            keyboardType="numeric"
          />
          <Button title="Add" onPress={handleAddProduct} />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 300,
    backgroundColor: '#f0f0f0',
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 8,
  },
  box: {
    marginTop: 20,
    alignSelf: 'center',
    height: 400,
    width: 250,
    gap: 20,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '500',
  },
  inputBox: {
    padding: 10,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'white',
  },
});
export default AddProduct;
