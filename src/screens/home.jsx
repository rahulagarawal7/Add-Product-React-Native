import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import searchIcon from '../../src/assets/icons/search.png';
import backIcon from '../../src/assets/icons/back.png';
import plusIcon from '../../src/assets/icons/plusIcon.png';
import deleteIcon from '../../src/assets/icons/delete.png';
import {useIsFocused} from '@react-navigation/native';

const Home = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchOption, setSearchOption] = useState(false);
  const isFocused = useIsFocused();

  const ListCart = ({products}) => {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={products}
        renderItem={({item}) => {
          return (
            <View style={styles.card}>
              {console.log(item.image)}
              <ImageBackground
                style={styles.listImg}
                source={{
                  uri: item?.image,
                }}>
                <TouchableOpacity
                  style={styles.deleteBox}
                  onPress={() => handleDelete(item.name)}>
                  <Image style={styles.deleteIconImg} source={deleteIcon} />
                </TouchableOpacity>
              </ImageBackground>

              <View style={styles.cardBox}>
                <Text style={styles.productNameText}>{item?.name}</Text>
                <Text style={styles.productNameText}>$ {item?.price}</Text>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.noProductTextStyle}>No Product Found</Text>
        }
      />
    );
  };

  const fetchProducts = async () => {
    const storedProducts = await AsyncStorage.getItem('products');
    if (storedProducts) setProducts(JSON.parse(storedProducts));
  };

  useEffect(() => {
    if (isFocused) {
      fetchProducts();
    }
  }, [isFocused]);

  const handleDelete = async name => {
    const updatedProducts = products.filter(product => product.name !== name);
    setProducts(updatedProducts);
    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.firstBox}>
        <View style={styles.backBox}>
          <Image style={styles.backArrowImg} source={backIcon} />
        </View>
        <TouchableOpacity
          style={styles.backBox}
          onPress={() => setSearchOption(!searchOption)}>
          <Image style={styles.searchImg} source={searchIcon} />
        </TouchableOpacity>
      </View>
      {searchOption && (
        <View style={styles.searchOptionBox}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            style={styles.searchOptionTextStyle}
            placeholder="Search Products"
          />
        </View>
      )}

      <Text style={styles.headingText}>Hi-Fi Shop & Service</Text>
      <Text style={styles.containText}>Audio shop on Rustaveli Ave 57.</Text>
      <Text style={styles.containText}>
        This shop offers both products and service
      </Text>
      <View style={styles.productBox}>
        <Text style={styles.productTextStyle}>Products</Text>
        <Text style={styles.showAllText}>show all</Text>
      </View>
      <ListCart products={products} />
      <View style={styles.productBox}>
        <Text style={styles.productTextStyle}>Accessories</Text>
        <Text style={styles.showAllText}>show all</Text>
      </View>
      <ListCart products={products} />
      <TouchableOpacity onPress={() => navigation.navigate('AddProduct')}>
        <Image style={styles.addIconImg} source={plusIcon} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  firstBox: {
    marginTop: 50,
    height: 40,
    width: 350,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backBox: {
    height: 40,
    width: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  searchImg: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
  searchOptionBox: {
    alignSelf: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  searchOptionTextStyle: {
    padding: 15,
    fontSize: 16,
    color: 'black',
  },
  headingText: {
    margin: 20,
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  containText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
    margin: 5,
  },
  productBox: {
    marginTop: 50,
    height: 40,
    width: 350,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  productTextStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginTop: 10,
    marginLeft: 5,
  },
  showAllText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'blue',
    marginTop: 12,
    marginRight: 5,
  },
  card: {
    margin: 10,
    height: 220,
    width: 200,
    borderWidth: 0.3,
    borderRadius: 8,
  },
  listImg: {
    height: 120,
    width: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBox: {
    height: 95,
    width: 195,
    backgroundColor: '#f0f0f0',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,

    alignSelf: 'center',
  },
  productNameText: {
    fontSize: 18,
    fontWeight: '500',
    margin: 10,
    color: 'black',
  },
  deleteBox: {
    height: 30,
    width: 20,
    alignSelf: 'flex-end',
    margin: 15,
  },
  deleteIconImg: {
    height: 30,
    width: 20,
  },
  addIconImg: {
    height: 60,
    width: 60,
    alignSelf: 'flex-end',
    margin: 20,
  },
  noProductTextStyle: {
    fontSize: 20,
    margin: 20,
    color: 'red',
    marginLeft: 100,
  },
});
//   return (
//     <View style={{margin: 20, marginTop: 100}}>
//       <TextInput placeholder="Search" value={search} onChangeText={setSearch} />
//       <FlatList
//         data={filteredProducts}
//         keyExtractor={item => item.name}
//         renderItem={({item}) => (
//           <View>
//             <Text>
//               {item.name} - {item.price}
//             </Text>
//             <TouchableOpacity onPress={() => handleDelete(item.name)}>
//               <Text>Delete</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         ListEmptyComponent={<Text>No Product Found</Text>}
//       />
//       <Button
//         title="Add Product"
//         onPress={() => navigation.navigate('AddProduct')}
//       />
//     </View>
//   );
// };

export default Home;
