import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';


import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();


import ImagePicker from 'react-native-image-crop-picker';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';



const screenHeight = Math.round(Dimensions.get('window').height);


const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
const categories = [
  {
    image_src:
      'https://img.freepik.com/free-psd/white-t-shirts-mockup-grey_34168-1032.jpg?size=626&ext=jpg',
    name: 'T-Shirts',
    price_start: 25,
  },
  {
    image_src:
      'https://img.freepik.com/free-psd/white-t-shirts-mockup-grey_34168-1032.jpg?size=626&ext=jpg',
    name: 'Hoodies',
    price_start: 25,
  },
  {
    image_src:
      'https://img.freepik.com/free-psd/white-t-shirts-mockup-grey_34168-1032.jpg?size=626&ext=jpg',
    name: 'Uniforms',
    price_start: 25,
  },
  {
    image_src:
      'https://img.freepik.com/free-psd/white-t-shirts-mockup-grey_34168-1032.jpg?size=626&ext=jpg',
    name: 'Bath Robes',
    price_start: 25,
  },
  {
    image_src:
      'https://img.freepik.com/free-psd/white-t-shirts-mockup-grey_34168-1032.jpg?size=626&ext=jpg',
    name: 'Soft Toys',
    price_start: 25,
  },
];

const Categories = ({ navigation }) => {
  return (
    <SafeAreaView style={styles1.container}>
      <ScrollView style={styles1.scrollview}>
        <View>
          <Text style={styles1.heading}>Explore different categories</Text>
        </View>
        <View style={styles1.rowContainer}>
          {categories.map((el, i) => (
            <TouchableOpacity
              key={i}
              style={styles1.item}
              onPress={() => navigation.navigate('Products', {category: el})}>
              <View>
                <Image
                  style={styles1.image}
                  source={{
                    uri: el.image_src,
                  }}
                />
                <Text style={styles1.text}>{el.name}</Text>
                <Text style={styles1.subText}>
                  Starting from ${el.price_start}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 10,
    marginLeft: 20,
    marginRight: 0
  },
  heading: {
    fontSize: 40,
    marginBottom: 30,
    color: '#F5101F',
    opacity: 0.8
  },
  scrollView: {
    backgroundColor: 'pink',
    marginTop: 30,
  },
  rowContainer:{
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  item:{
    width: '50%',
    paddingRight: 20
  },
  image: {
    borderRadius: 10,
    height: 180,
  },
  text: {
    marginTop: 10,
    fontFamily: 'Avenir Next',
    // marginLeft: 20,
    fontSize: 25,
  },
  subText: {
    marginBottom: 40,
    opacity: .6,
    fontSize: 15,
  },
});



const products = [
  {
    name: 'Round Neck T-shirt',
    image_src:
      'https://img.freepik.com/free-psd/white-t-shirts-mockup-grey_34168-1032.jpg?size=626&ext=jpg',
    description: 'Product description here',
    price: 35,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    name: 'Polo T-shirt',
    image_src:
      'https://img.freepik.com/free-psd/white-t-shirts-mockup-grey_34168-1032.jpg?size=626&ext=jpg',
    description: 'Product description here',
    price: 20,
    sizes: ['S', 'M', 'L'],
  },
  {
    name: 'Embroided T-shirt',
    image_src:
      'https://img.freepik.com/free-psd/white-t-shirts-mockup-grey_34168-1032.jpg?size=626&ext=jpg',
    description: 'Product description here',
    price: 10,
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    name: 'Sleeveless T-shirt',
    image_src:
      'https://img.freepik.com/free-psd/white-t-shirts-mockup-grey_34168-1032.jpg?size=626&ext=jpg',
    description: 'Product description here',
    price: 22,
    sizes: ['S', 'M', 'XL'],
  },
  {
    name: 'Round Neck T-shirt',
    image_src:
      'https://img.freepik.com/free-psd/white-t-shirts-mockup-grey_34168-1032.jpg?size=626&ext=jpg',
    description: 'Product description here',
    price: 45,
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

const Products = ({ route, navigation }) => {
  const cat = route.params.category;

  return (
    <SafeAreaView style={styles2.container}>
      <ScrollView style={styles2.scrollview}>
        <View style={styles2.rowContainer}>
          {products.map((el, i) => (
            <TouchableOpacity
              key={i}
              style={styles2.item}
              onPress={() => navigation.navigate('Details', {product: el})}>
              <Image
                style={styles2.image}
                source={{
                  uri: el.image_src,
                }}
              />
              <View style={styles2.itemTextView}>
                <Text style={styles2.text}>{el.name}</Text>
                <Text style={styles2.subText}>{el.description}</Text>
                <Text style={styles2.price}>${el.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    // marginLeft: 20,
    marginRight: 0,
  },
  heading: {
    fontSize: 40,
    marginBottom: 30,
    color: '#F5101F',
    opacity: 0.8,
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginTop: 30,
  },
  rowContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  item: {
    width: '50%',
    height: .42 * screenHeight,
    borderColor: '#D3D0D0',
    borderWidth: 1,
    // paddingRight: 20,
  },
  itemTextView: {
    marginLeft: 10,
    marginBottom: 30
  },
  image: {
    // borderRadius: 10,
    height: '75%',
  },
  text: {
    marginTop: 10,
    fontFamily: 'Avenir Next',
    // marginLeft: 20,
    fontSize: 15,
    opacity: 0.8,
    fontWeight: '600'
  },
  subText: {
    opacity: .5,
    // marginBottom: 40,
    fontWeight: '300',
    fontSize: 14,
  },
  price: {
    marginTop: 4,
    fontWeight: '600'
  }
});



const Details = ({ route, navigation }) => {

  const product = route.params.product;

  let scrollViewRef = React.createRef();
  const [logoImagUrl, setLogoUrl] = React.useState(null);
  const [image, setImage] = React.useState(null);

  const [logoText, setLogoText] = React.useState('');

  const [selectedSize, setSelectedSize] = useState(null);

  const [isLogoUploaded, setLogoUploaded] = useState(false);



  const handleUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      includeBase64: true,
      cropping: true,
    }).then((img) => {
      setImage({
        mime: img.mime,
        data: img.data,
        path: img.path
      });
      setLogoUploaded(true);
    });
  };



  return (
    <SafeAreaView style={styles3.container}>
      <ScrollView
        style={styles3.scrollView}
        ref={(ref) => (scrollViewRef = ref)}>
        <View style={{backgroundColor: '#FFFFFF'}}>
          <Image
            style={styles3.image}
            source={{
              uri:
                'https://img.freepik.com/free-psd/white-t-shirts-mockup-grey_34168-1032.jpg?size=626&ext=jpg',
            }}
          />
          <View
            style={{
              flex: 1,
              // flexDirection: 'row',
              marginTop: 20,
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            <Text style={{marginBottom: 5, fontSize: 20, fontWeight: '500'}}>
              {product.name}
            </Text>
            <Text style={{marginBottom: 5, fontSize: 12, fontWeight: '300'}}>
              {product.description}
            </Text>
            <Text style={{marginBottom: 5, fontSize: 20, fontWeight: '500'}}>
              ${product.price}
            </Text>
            <Text
              style={{
                marginBottom: 5,
                color: '#979393',
                fontSize: 10,
                marginBottom: 10,
              }}>
              Excl. of taxes and other charges
            </Text>
          </View>
        </View>

        <View style={styles3.logoDesign}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '300',
              marginTop: 10,
              color: '#746F6F',
            }}>
            LOGO DESIGN
          </Text>
          {!isLogoUploaded ? (
            <View style={styles3.buttonContainer}>
              <TouchableOpacity
                style={styles3.uploadButton}
                onPress={() => handleUpload()}>
                <Text style={styles3.buttonText}>Upload logo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                paddingRight: 10,
              }}>
              <Text style={{fontSize: 18}}>Logo uploaded</Text>
              <TouchableOpacity onPress={() => {setLogoUploaded(false); setImage(null);}}>
                <Text style={{color: '#FF5E3A', fontWeight: '400'}}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{marginTop: 15}}>
            <Text style={{fontWeight: '300', marginTop: 4, color: '#979393'}}>
              Add Text
            </Text>
            <TextInput
              style={{
                height: 40,
                backgroundColor: '#FFFFFF',
                borderColor: '#D3D0D0',
                borderWidth: 1,
                width: '95%',
                color: 'black',
                paddingLeft: 4,
                marginTop: 10,
                marginBottom: 20,
                borderRadius: 5,
              }}
              onFocus={() => scrollViewRef.scrollToEnd({animated: true})}
              placeholderTextColor="#D3D0D0"
              placeholder="Name"
              value={logoText}
              onChangeText={(text) => setLogoText(text)}
            />
          </View>
        </View>

        <View style={styles3.size}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 12, color: '#746F6F', fontWeight: '300'}}>
              SIZE:
            </Text>
            <Text style={{color: 'blue', fontWeight: '400'}}>Size Chart</Text>
          </View>

          <View
            style={{
              flex: 1,
              marginTop: 10,
              marginBottom: 20,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            {product.sizes &&
              product.sizes.map((el, i) => (
                <TouchableWithoutFeedback
                  onPress={() => setSelectedSize(el)}
                  key={i}
                  style={{
                    height: 40,
                    width: 40,
                    marginVertical: 15,
                    marginRight: 10,
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: el == selectedSize ? '#FF9F0E' : '#000000',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: el == selectedSize ? '#FF9F0E' : '#000000'}}>
                    {el}
                  </Text>
                </TouchableWithoutFeedback>
              ))}
          </View>
        </View>

        <View style={styles3.addToBagBtnContainer}>
          <TouchableOpacity onPress={() => alert('Add to bag')}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.6, y: 1.0}}
              colors={['#FF9F0E', '#F53800']}
              style={styles3.linearGradient}>
              <Text style={styles3.buttonText2}>Add to bag</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles3 = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    // marginTop: 20,
  },
  image: {
    height: 0.63 * screenHeight,
  },
  logoDesign: {
    backgroundColor: '#FFFFFF',
    marginTop: 15,
    paddingLeft: 10,
    // marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 10,
    flex: 1,
    width: '95%',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 6,
    height: 0.04 * screenHeight,
    borderWidth: 1,
    borderColor: '#FF5E3A',
    // backgroundColor: '#FF5E3A',
    borderRadius: 100,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FF5E3A',
    fontSize: 16,
  },
  logo: {
    height: 200,
  },
  size: {
    backgroundColor: '#FFFFFF',
    marginTop: 15,
    paddingHorizontal: 10,
    paddingTop: 10,
    // marginLeft: 10,
  },
  linearGradient: {
    borderRadius: 100,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText2: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  addToBagBtn: {
    flex: 1,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: 'orange',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToBagBtnContainer: {
    marginVertical: 30,
    paddingHorizontal: 10,
  },
});

const HomeScreen = () => {
    return (
      // <SafeAreaView>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Categories} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
      // </SafeAreaView>
    );
}


export default HomeScreen;