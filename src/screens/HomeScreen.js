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
  Alert,
  ActivityIndicator,
  ActionSheetIOS
} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();
import { retrieveData } from '../../AsyncStorage';
import {CommonActions} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';



import ImagePicker from 'react-native-image-crop-picker';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { apiUrl } from '../../App';

const screenHeight = Math.round(Dimensions.get('window').height);
var {width, height} = Dimensions.get('window');

const Stack = createStackNavigator();


const Categories = ({ navigation }) => {

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    //Sets loader true
    setIsLoading(true);

    //Calling categories
    axios
      .get(`${apiUrl}/categories`, {timeout: 10000})
      .then((res) => {
        // setCategories([]);
        setCategories(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setCategories([]);
        setIsLoading(false);
      });

    retrieveData('user').then(val => {
      console.log(val);
      if(val && val.isLoggedIn){
        getUserDetails(val.id);
      }
    });
  }, []);


  const getUserDetails = (id) => {
    let data = {
      id
    }
    axios.post(`${apiUrl}/users/getUser`,data,  { timeout: 15000 })
    .then(res => {
      if(res.data.status == 200){
         let result = res.data.user;
         let data = {
           id: result._id,
           password: result.password,
           name: result.name,
           phone: result.phone,
           email: result.email,
           savedItems: result.savedItems,
           addresses: result.addresses ? result.addresses : [],
           orders: result.orders,
         };

         dispatch({
           type: 'UPDATE_USER_DATA',
           data,
         });

         //dispatch an action to LOGIN USER
         dispatch({
           type: 'LOGIN_USER',
         });
      }
    })
  };

  return (
    <SafeAreaView style={styles1.container}>
      <ScrollView style={styles1.scrollview}>
        <View>
          <Text style={styles1.heading}>Explore different categories</Text>
        </View>
        {!isLoading ? (categories.length > 0 ? 
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
                      uri: el.imageUrl,
                    }}
                  />
                  <Text style={styles1.text}>{el.name}</Text>
                  {/* <Text style={styles1.subText}>
                  Starting from ${el.price_start}
                </Text> */}
                </View>
              </TouchableOpacity>
            ))}
          </View>: (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Sorry! Something is not right here.</Text></View>)
        ) : (
          <ActivityIndicator size="small" color="#FF9F0E" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}


const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 10,
    marginLeft: 20,
    marginRight: 0,
  },
  heading: {
    fontSize: 40,
    marginTop: 20,
    marginBottom: 30,
    // color: '#F5101F',
    opacity: 0.8,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginTop: 30,
  },
  rowContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  item: {
    width: '50%',
    paddingRight: 20,
    marginBottom: 30,
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
    opacity: 0.6,
    fontSize: 15,
  },
});




const Products = ({ route, navigation }) => {
  const cat = route.params.category;
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(null);
  
  useEffect(() => {
    setIsLoading(true);
    axios
      .post(`${apiUrl}/products`, {categoryId: cat._id})
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setProducts([]);
        setIsLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles2.container}>
      <ScrollView style={styles2.scrollview}>
        {!isLoading ? products.length > 0 ? (<View style={styles2.rowContainer}>
          {products.map((el, i) => (
            <TouchableOpacity
              key={i}
              style={styles2.item}
              onPress={() => navigation.navigate('Details', {product: el})}>
              <Image
                style={styles2.image}
                source={{
                  uri: el.imageUrl,
                }}
              />
              <View style={styles2.itemTextView}>
                <Text style={styles2.text}>{el.name}</Text>
                <Text style={styles2.subText}>{el.description}</Text>
                <Text style={styles2.price}>${el.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>) : (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Sorry! Something is not right here.</Text></View>)
         : <ActivityIndicator size="small" color="#FF9F0E" />}
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
    height: .45 * screenHeight,
    borderColor: '#D3D0D0',
    borderWidth: 1,
    // paddingRight: 20,
  },
  itemTextView: {
    marginBottom: 10,
    marginLeft: 10,
    marginBottom: 30,
    flex: 1
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
    marginTop: 10,
    fontWeight: '600'
  }
});



const Details = ({ route, navigation }) => {

  const product = route.params.product;

  const isUserLoggedIn = useSelector(state => state.app.isLoggedIn);

  let scrollViewRef = React.createRef();
  const [logoImagUrl, setLogoUrl] = React.useState(null);
  const [image, setImage] = React.useState(null);

  const [logoText, setLogoText] = React.useState('');

  const [selectedSize, setSelectedSize] = useState(null);

  const [isLogoUploaded, setLogoUploaded] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const [itemAdded, setItemAdded] = useState(false);

  const dispatch = useDispatch();

  const userId = useSelector(state => state.user.id);

  const [quantity, setQuantity] = useState("1");

  const handleUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      includeBase64: true,
      cropping: true,
    }).then((img) => {
      setImage({
        mime: img.mime,
        data: img.data, //base64 format
        path: img.path
      });
      console.log(img.data);
      setLogoUploaded(true);
    });
  };



  const saveItem = () => {
    setLoading(true);
    let data = {
      userId,
      item: {
        itemId: product._id,
        name: product.name,
        imageUrl: product.imageUrl,
        logo: {
          imageBase64: image && image.data,
          text: logoText,
        },
        description: product.description,
        category: product.category,
        categoryId: product.categoryId,
        quantity,
        size: selectedSize.label,
        price: product.price,
      },
    };

    console.log(data);

    axios.post(`${apiUrl}/users/saveItem`, data, { timeout: 15000 })
    .then(res => {
      setLoading(false);
      dispatch({type: 'SAVE_ITEM', data: data.item});
      alert('Item added to your shopping bag');
      setItemAdded(true);
    })
    .catch(err => {
      setLoading(false);
      console.log(err);
      alert("Sorry! an unexpected error occured at server");
    })

  }

  const handleAddToBagPress = () => {
    if(!isUserLoggedIn){
       Alert.alert(
         'Log In',
         'Please log in to continue.',
         [
           {
             text: 'Cancel',
             onPress: () => console.log('Cancel Pressed'),
             style: 'cancel',
           },
           {text: 'OK', onPress: () => navigation.navigate('Profile')},
         ],
         {cancelable: false},
       );
       return;

    }
    if(!itemAdded){
      if (selectedSize == null) {
        alert('Please select a size');
        return;
      }

      if(quantity.length < 1){
        alert('Please enter quantity');
        return;
      }

      saveItem();
    }
    else{
      setLogoText('');
      setLogoUploaded(false);
      setSelectedSize(null);
      setImage(null);
      setItemAdded(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Home'}],
        }),
      );
      navigation.navigate('Shopping Bag');
    }
  }


  return (
    <SafeAreaView style={styles3.container}>
      {isLoading && (
        <View style={[styles3.overlay, {height: '100%'}]}>
          <ActivityIndicator size="small" color="#FF9F0E" />
        </View>
      )}
      <KeyboardAwareScrollView
        style={styles3.scrollView}
        ref={(ref) => (scrollViewRef = ref)}>
        <View style={{backgroundColor: '#FFFFFF'}}>
          <Image
            style={styles3.image}
            source={{
              uri: product.imageUrl,
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
              <TouchableOpacity
                onPress={() => {
                  setLogoUploaded(false);
                  setImage(null);
                }}>
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
                    style={{
                      color: el == selectedSize ? '#FF9F0E' : '#000000',
                      textTransform: 'uppercase',
                    }}>
                    {el.label}
                  </Text>
                </TouchableWithoutFeedback>
              ))}
          </View>

          <View style={{marginTop: 5}}>
            <Text style={{fontWeight: '300', marginTop: 4, color: '#979393'}}>
              Quantity
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
              type="text"
              keyboardType="numeric"
              onFocus={() => scrollViewRef.scrollToEnd({animated: true})}
              placeholderTextColor="#D3D0D0"
              placeholder="Enter here"
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
            />
          </View>
        </View>

        <View style={styles3.addToBagBtnContainer}>
          <TouchableOpacity onPress={() => handleAddToBagPress()}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.6, y: 1.0}}
              colors={['#FF9F0E', '#F53800']}
              style={styles3.linearGradient}>
              <Text style={styles3.buttonText2}>
                {!itemAdded ? 'Add to bag' : 'Go to bag'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}


const styles3 = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.4,
    backgroundColor: 'black',
    width: width,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  } ,
  container: {
    flex: 1,
  },
  scrollView: {
    // marginTop: 20,
  },
  image: {
    height: 0.6 * screenHeight,
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