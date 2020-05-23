import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {createStackNavigator} from '@react-navigation/stack';
import { ScreenStackHeaderRightView } from 'react-native-screens';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { apiUrl } from '../../App';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import stripe from 'tipsi-stripe';
import {CommonActions} from '@react-navigation/native';



stripe.setOptions({
  publishableKey: 'pk_test_huzvfa7zc7ZDNuJNhlKktCvu00l6CNCDxw',
});

const Stack = createStackNavigator();
const screenHeight = Math.round(Dimensions.get('window').height);


const CheckoutStatusBar = ({step, onAddNewAddressPress}) => {
  //step check out process 1-Review; 2-Address;3-Payment
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginVertical: 20,
      }}>
      <View
        style={{
          flex: 1,
          paddingLeft: 30,
          flexDirection: 'row',
          //   alignItems: 'flex-end',
          justifyContent: 'space-around',
        }}>
        <View style={{flex: 1,justifyContent: 'center'}}>
          <View
            style={{
              height: 20,
              width: 20,
              // borderWidth: 1,
              borderRadius: 100,
              backgroundColor: '#FF7A1A',
            }}></View>
          <Text style={{marginTop: 8, fontWeight: '300', textAlign: 'left', marginRight: 5}}>Review</Text>
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
          <View
            style={{
              height: 20,
              width: 20,
              backgroundColor: step > 1 ? '#FF7A1A' : '#6c6b6b',
              borderRadius: 100,
            }}></View>
          <Text style={{marginTop: 8, fontWeight: '300'}}>Address</Text>
        </View>

        <View style={{flex: 1, alignItems: 'center', marginLeft: 30}}>
          <View
            style={{
              height: 20,
              width: 20,
              zIndex: 10,
              backgroundColor: step > 2 ? '#FF7A1A' : '#6c6b6b',
              borderRadius: 100,
            }}></View>
          <Text style={{marginTop: 8, fontWeight: '300'}}>Payment</Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            opacity: 0.04,
            position: 'absolute',
            width: '72%',
            marginTop: 10,
            marginLeft: '14%',
          }}></View>
      </View>
      {step == 2 && (
        <TouchableOpacity onPress={() => onAddNewAddressPress()}>
          <View
            style={{
              height: 40,
              borderWidth: 1,
              borderRadius: 20,
              backgroundColor: '#ffffff',
              marginTop: 25,
            }}>
            <Text style={{textAlign: 'center', marginTop: 10}}>
              Add New Address
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};


const Review = ({ navigation }) => {

  const [items, setItems] = useState([]);
  const [priceDetails, setPriceDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const userId = useSelector(state => state.user.id);

  const isUserLoggedIn = useSelector((state) => state.app.isLoggedIn);  

  useFocusEffect(
    React.useCallback(() => {
      console.log(isUserLoggedIn);
      if (isUserLoggedIn) {
        setIsLoading(true);
        if (!error) setError(false);
        let data = {
          userId,
        };
        axios
          .post(`${apiUrl}/users/getSavedItems`, data, {timeout: 10000})
          .then((res) => {
            // console.log(`${error}-err`);
            // console.log(res);
            setItems(res.data.items);
            setPriceDetails(res.data.priceDetails);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log('An error occured at the server.');
            setItems(null);
            setPriceDetails(null);
            setIsLoading(false);
            setError(true);
          });
      }
    }, [isUserLoggedIn]),
  );



  const handleRemovePress = (itemId) => {
    Alert.alert(
      'Remove',
      'Remove item from bag',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => removeSavedItem(itemId)},
      ],
      {cancelable: false},
    );
  }



  const removeSavedItem = (itemId) => {
    let data = {
      userId: '5ec4c1866c41f402e98f35dd',
      itemId 
    }

    axios.post(`${apiUrl}/users/removeItem`, data)
    .then(res => {
      alert('Item removed.');
      console.log(res);
      setItems(res.data.items);
      setPriceDetails(res.data.priceDetails);
    })
    .catch(err => {
      alert('Sorry! An error occured at the server');
    })
  } 



  const dispatch = useDispatch();

  const placeOrder = () => {
    dispatch({
      type: 'UPDATE_ORDER_ITEMS',
      data: {
        items: items,
        price: priceDetails
      }
    });

   
    navigation.navigate('Address');
  }



  if (!isUserLoggedIn) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 50,
        }}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>
          Please log in to view your shopping bag
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{
            backgroundColor: '#FF9F0E',
            height: '5%',
            width: '50%',
            borderRadius: 10,
            marginTop: 30,
          }}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              marginTop: 4,
              color: '#fff',
            }}>
            Log In
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  //Loading state
  if(isLoading){
    return (
      <SafeAreaView style={styles1.contaier}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="small" color="#FF9F0E" />
        </View>
      </SafeAreaView>
    );
  }


  //No Items in bag
  if(items && items.length == 0){
    return(<SafeAreaView style={styles1.contaier}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>No items in the bag</Text>
      </View>
    </SafeAreaView>);
  }

  //Server error
  if (error) {
    return(<SafeAreaView style={styles1.contaier}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Sorry! something is not right here.</Text>
      </View>
    </SafeAreaView>);
  }


  return (
    <SafeAreaView style={styles1.contaier}>
      <ScrollView>
        <CheckoutStatusBar />
        {items &&
          items.length > 0 &&
          items.map((el, i) => (
            <View style={styles1.orderView} key={i}>
              <View style={styles1.orderDetailsView}>
                <View style={styles1.imageContainer}>
                  <Image
                    style={styles1.image}
                    source={{
                      uri: el.imageUrl,
                    }}
                  />
                </View>
                <View style={styles1.detailsContainer}>
                  <Text
                    style={{marginBottom: 10, fontSize: 20, fontWeight: '500'}}>
                    {el.name}
                  </Text>
                  <Text style={{marginBottom: 10, color: '#979393'}}>
                    {el.description}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      height: 30,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '500',
                        textTransform: 'uppercase',
                      }}>
                      Size: {el.size}
                    </Text>
                    <Text
                      style={{fontSize: 15, fontWeight: '500', marginLeft: 50}}>
                      Quantity: 1
                    </Text>
                  </View>

                  <Text
                    style={{marginBottom: 10, fontSize: 15, fontWeight: '500'}}>
                    Price: ${el.price}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  marginTop: 25,
                  backgroundColor: '#979393',
                  opacity: 0.2,
                }}></View>
              <TouchableOpacity
                onPress={() => handleRemovePress(el._id)}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <Text style={{color: '#504343'}}>REMOVE</Text>
              </TouchableOpacity>
            </View>
          ))}
        <View style={styles1.priceDetails}>
          <View>
            <Text style={{fontSize: 15, fontWeight: '600'}}>Price Details</Text>
          </View>
          <View>
            <View
              style={{
                //   backgroundColor: 'blue',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text>Items price</Text>
              <Text style={{marginLeft: 30}}>
                ${priceDetails && priceDetails.totalPrice}
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                //   backgroundColor: 'blue',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text>Taxes</Text>
              <Text style={{marginLeft: 30}}>
                ${priceDetails && priceDetails.tax}
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                //   backgroundColor: 'blue',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text>Delivery charges</Text>
              <Text style={{marginLeft: 30}}>
                ${priceDetails && priceDetails.deliveryCharge}
              </Text>
            </View>
          </View>
          <View style={{borderWidth: 1, opacity: 0.2, marginTop: 15}}></View>
          <View
            style={{
              marginTop: 30,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>Total</Text>
            <Text>
              $
              {priceDetails &&
                priceDetails.totalPrice +
                  priceDetails.tax +
                  priceDetails.deliveryCharge}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: '#ffffff',
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
        }}>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={{fontSize: 20}}>
            $
            {priceDetails &&
              priceDetails.totalPrice +
                priceDetails.tax +
                priceDetails.deliveryCharge}
          </Text>
        </View>
        <View style={{flex: 2, marginTop: 2, alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={{width: '80%'}}
            onPress={() => placeOrder()}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.6, y: 1.0}}
              colors={['#FF9F0E', '#F53800']}
              style={styles1.linearGradient}>
              <Text style={styles1.buttonText}>Place order</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles1 = StyleSheet.create({
  contaier: {
    flex: 1,
  },
  orderView: {
    marginTop: 10,
    padding: 10,
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: 0.25 * screenHeight,
  },
  orderDetailsView: {
    height: '70%',
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    padding: 10,
    height: '100%',
  },
  detailsContainer: {
    flex: 2,
    marginLeft: 10,
  },
  linearGradient: {
    height: '90%',
    borderRadius: 100,
  },
  buttonText: {
    textAlign: 'center',
    marginTop: 5,
    color: '#ffffff',
    fontSize: 20,
  },
  priceDetails: {
      marginTop: 10,
      backgroundColor: '#ffffff',
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 20
  },
});


const Address = ({active, navigation}) => {

  const [addresses, setAddresses] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error , setError] = useState(false);

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      let data = {
        userId: '5ec4c1866c41f402e98f35dd',
      };
      axios
        .post(`${apiUrl}/users/getSavedAddresses`, data)
        .then((res) => {
          console.log(res);
          if(res.data.length > 0){
             setAddresses(res.data);
             setSelectedAddress(res.data[0]);
          }
         
          setIsLoading(false);
        })
        .catch((err) => {
          alert('Sorry! an error occured at the server.');
          setAddresses(null);
          setIsLoading(false);
          setError(true);
        });
    }, []),
  );

  const [selectedAddress, setSelectedAddress] = useState(null);

  let scrollViewRef = React.createRef();


  const handleConfirm = () => {
     dispatch({
       type: 'UPDATE_ORDER_ADDRESS',
       data: {
         ...selectedAddress
       },
     });
     navigation.navigate('Payment')
  }

  return (
    <SafeAreaView style={styles2.contaier}>
      <ScrollView ref={(ref) => (scrollViewRef = ref)}>
        <CheckoutStatusBar
          step={2}
          onAddNewAddressPress={() => navigation.navigate('Add Address')}
        />
        {addresses.map((el, i) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedAddress(el);
              scrollViewRef && scrollViewRef.scrollToEnd({animated: true});
            }}
            key={i}>
            <View style={styles2.addressView}>
              <View style={styles2.circleContainer}>
                <View
                  style={{
                    ...styles2.circle,
                    backgroundColor:
                      selectedAddress && selectedAddress._id == el._id
                        ? '#75BE3B'
                        : '#ffffff',
                  }}></View>
              </View>
              <View style={styles2.addressContainer}>
                <View style={styles2.address}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '500',
                      marginBottom: 0,
                    }}>
                    {el.userName}
                  </Text>
                  {el.street && (
                    <Text style={{fontSize: 18, marginVertical: 4}}>
                      {el.street}
                    </Text>
                  )}
                  <Text style={{fontSize: 18, marginVertical: 4}}>
                    {el.town}
                  </Text>
                  <Text style={{fontSize: 18, marginVertical: 4}}>
                    {el.city}
                  </Text>
                  <Text style={{fontSize: 18, marginVertical: 4}}>
                    {el.state}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 8,
                      alignItems: 'center',
                      //   j,
                    }}>
                    <Text style={{fontSize: 18, fontWeight: '400'}}>
                      ZIP code:{' '}
                    </Text>
                    <Text style={{fontSize: 18, fontWeight: '400'}}>
                      {el.zipcode}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 8,
                      alignItems: 'center',
                      //   j,
                    }}>
                    <Text style={{fontSize: 18, fontWeight: '600'}}>
                      Mobile:{' '}
                    </Text>
                    <Text style={{fontSize: 18, fontWeight: '400'}}>
                      {el.phone}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selectedAddress != null && (
        <View style={styles2.buttonContainer}>
          <TouchableOpacity onPress={() => handleConfirm()}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.6, y: 1.0}}
              colors={['#FF9F0E', '#F53800']}
              style={styles2.linearGradient}>
              <Text style={styles2.buttonText}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};


const styles2 = StyleSheet.create({
  contaier: {
    flex: 1,
  },
  addressView: {
    backgroundColor: '#ffffff',
    marginTop: 5,
    padding: 20,
    flex: 1,
    flexDirection: 'row',
  },
  circleContainer: {
    flex: 1,
    // backgroundColor: 'yellow'
  },
  circle: {
    height: 20,
    width: 20,
    borderWidth: 0.6,
    borderRadius: 100,
    marginTop: 5,
    // backgroundColor:
  },
  addressContainer: {
    flex: 10,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    marginVertical: 10,
    display: 'flex',
    height: '8%',
    // backgroundColor: 'blue',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    borderRadius: 100,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});


const AddAddress = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [zipcode, setZipcode] = useState('');
  const [street, setStreet] = useState('');
  const [town, setTown] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleSavePress = () => {
    if (name == '') {
      alert('Please enter a valid name');
      return;
    } else if (phone.length < 10) {
      alert('Please enter a valid phone');
      return;
    } else if (zipcode == '') {
      alert('Please enter a valid phone');
      return;
    } else if (street.length < 10) {
      alert('Please enter a valid building name and street');
      return;
    } else if (town.length < 3) {
      alert('Please enter a valid Area/Locality');
      return;
    }

    let data = {
      userId: '5ec4c1866c41f402e98f35dd',
      address: {
        userName: name,
        phone,
        zipcode,
        street,
        town,
        city,
        state,
      },
    };

    console.log(data);

      
    axios
    .post(`${apiUrl}/users/addAddress`, data, { timeout: 100000 })
    .then((res) => {
      alert('Address saved');
      navigation.goBack();
    })
    .catch((err) => {
      alert('Sorry! an error occured at the server.');
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView>
        <View style={{marginTop: 10}}>
          <Text style={{paddingHorizontal: 10, fontWeight: '500'}}>
            Contact Details
          </Text>
          <View
            style={{
              backgroundColor: '#ffffff',
              marginVertical: 20,
              paddingHorizontal: 10,
              paddingVertical: 15,
            }}>
            <TextInput
              style={{
                marginVertical: 10,
                paddingVertical: 10,
                paddingHorizontal: 5,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#c4c4c4',
                color: '#000',
                fontSize: 15,
              }}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Name"
              placeholderTextColor="#c4c4c4"
            />
            <TextInput
              style={{
                marginVertical: 10,
                paddingVertical: 10,
                paddingHorizontal: 5,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#c4c4c4',
                color: '#000',
                fontSize: 15,
              }}
              keyboardType="numeric"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="Phone"
              placeholderTextColor="#c4c4c4"
            />
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={{paddingHorizontal: 10, fontWeight: '500'}}>
            Address
          </Text>

          <KeyboardAvoidingView
            style={{
              marginBottom: 100,
              backgroundColor: '#ffffff',
              marginVertical: 20,
              paddingHorizontal: 10,
              marginBottom: 100,
              paddingVertical: 15,
            }}>
            <TextInput
              style={{
                marginVertical: 10,
                paddingVertical: 10,
                paddingHorizontal: 5,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#c4c4c4',
                color: '#000',
                fontSize: 15,
              }}
              value={zipcode}
              keyboardType="numeric"
              onChangeText={(text) => setZipcode(text)}
              placeholder="zip code"
              placeholderTextColor="#c4c4c4"
            />
            <TextInput
              style={{
                marginVertical: 10,
                paddingVertical: 10,
                paddingHorizontal: 5,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#c4c4c4',
                color: '#000',
                fontSize: 15,
              }}
              value={street}
              onChangeText={(text) => setStreet(text)}
              placeholder="House No., Building, Street, Area"
              placeholderTextColor="#c4c4c4"
            />
            <TextInput
              style={{
                marginVertical: 10,
                paddingVertical: 10,
                paddingHorizontal: 5,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#c4c4c4',
                color: '#000',
                fontSize: 15,
              }}
              value={town}
              onChangeText={(text) => setTown(text)}
              placeholder="Town/Locality"
              placeholderTextColor="#c4c4c4"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <TextInput
                style={{
                  // flex: 1,
                  marginVertical: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  width: '48%',
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#c4c4c4',
                  color: '#000',
                  fontSize: 15,
                }}
                value={city}
                onChangeText={(text) => setCity(text)}
                placeholder="City"
                placeholderTextColor="#c4c4c4"
              />
              <TextInput
                style={{
                  // flex: 1,
                  width: '48%',
                  marginVertical: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#c4c4c4',
                  color: '#000',
                  fontSize: 15,
                }}
                value={state}
                onChangeText={(text) => setState(text)}
                placeholder="State"
                placeholderTextColor="#c4c4c4"
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </KeyboardAwareScrollView>
      <View style={addressStyles.buttonContainer}>
        <TouchableOpacity onPress={() => handleSavePress()}>
          <LinearGradient
            start={{x: 0.0, y: 0.25}}
            end={{x: 0.6, y: 1.0}}
            colors={['#FF9F0E', '#F53800']}
            style={addressStyles.linearGradient}>
            <Text style={addressStyles.buttonText}>Save Address</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const addressStyles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 10,
    marginTop: 30,
    display: 'flex',
    height: '10%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  linearGradient: {
    borderRadius: 100,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

const Payment = ({navigation}) => {
  const items = useSelector((state) => state.order.items);
  const price = useSelector((state) => state.order.price);
  const address = useSelector((state) => state.order.address);
  const user = useSelector((state) => state.user);

  const createOrder = (token) => {
    let data = {
      items,
      price,
      address,
      paymentToken: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    };

    console.log(data);

    axios
      .post(`${apiUrl}/orders/createOrder`, data, {timeout: 10000})
      .then((res) => {
        if (res.data.status == 200) {
          alert('Order placed successfully.');
           navigation.dispatch(
             CommonActions.reset({
               index: 1,
               routes: [{name: 'Review'}],
             }),
           );
          navigation.navigate('Confirmed');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Sorry! An error occured at the server.');
      });
  };


  const handlePayNowPress = async () => {
    // createOrder('');
    try{
      const token = await stripe.paymentRequestWithCardForm();
      if(token){
        createOrder(token.tokenId);
      }
    }
    catch(e){
      alert('Sorry! unable to process your payment');
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <CheckoutStatusBar step={3} />
      </ScrollView>
      <View
        style={{
          backgroundColor: '#ffffff',
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
        }}>
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={{fontSize: 20, marginLeft: 10}}>
            ${price.totalPrice + price.deliveryCharge + price.tax}
          </Text>
        </View>
        <View style={{flex: 2, marginTop: 2, alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={{width: '80%'}}
            onPress={() => handlePayNowPress()}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.6, y: 1.0}}
              colors={['#FF9F0E', '#F53800']}
              style={styles1.linearGradient}>
              <Text style={styles1.buttonText}>Pay now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};


const OrderConfirmed = ({ navigation }) => {

  const handleConfirmPress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'Review' }]
      })
    )
    navigation.navigate('Home')
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 18, fontWeight: '500'}}>
        Order Placed successfully
      </Text>
      <View
        style={{
          marginVertical: 10,
          paddingHorizontal: 10,
          height: '8%',
          width: '90%',
        }}>
        <TouchableOpacity onPress={() => handleConfirmPress()}>
          <LinearGradient
            start={{x: 0.0, y: 0.25}}
            end={{x: 0.6, y: 1.0}}
            colors={['#FF9F0E', '#F53800']}
            style={styles1.linearGradient}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: '#ffffff',
                marginTop: 10,
              }}>
              Continue Shopping
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ShoppinBag = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Review" component={Review} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="Add Address" component={AddAddress} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Confirmed" component={OrderConfirmed} />
      </Stack.Navigator>
    );
}


export default ShoppinBag;