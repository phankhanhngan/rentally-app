import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';

const propertyData = [
  {
    id: '1',
    image: 'https://source.unsplash.com/900x900/?house',
    price: '$250,000',
    address: '123 Main St',
    squareMeters: '150',
    beds: '3',
    baths: '2',
    parking: '1'
  },
  {
    id: '2',
    image: 'https://source.unsplash.com/900x900/?apartment',
    price: '$400,000',
    address: '456 Oak Ave',
    squareMeters: '200',
    beds: '4',
    baths: '3',
    parking: '2'
  },
  {
    id: '3',
    image: 'https://source.unsplash.com/900x900/?house+front',
    price: '$150,000',
    address: '789 Maple Rd',
    squareMeters: '100',
    beds: '2',
    baths: '1',
    parking: '0'
  },
  {
    id: '4',
    image: 'https://source.unsplash.com/900x900/?small+house',
    price: '$150,000',
    address: '789 Maple Rd',
    squareMeters: '100',
    beds: '2',
    baths: '1',
    parking: '0'
  }
];

const Profile = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardBody}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.topRight}>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.address}>{item.address}</Text>
          </View>
          <View style={styles.bottomRight}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Button</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredData = propertyData.filter((item) => {
    return item.address.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.propertyListContainer}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  propertyListContainer: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    height: 150,
    width: 150,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    resizeMode: 'cover',
  },
  cardBody: {
    flexDirection: 'row',
    marginBottom: 0,
    padding: 0,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  topRight: {
    padding: 10,
  },
  bottomRight: {
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingRight: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  address: {
    fontSize: 16,
    marginBottom: 5
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  squareMeters: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666'
  },
  // Các styles khác không thay đổi
});

export default Profile;
