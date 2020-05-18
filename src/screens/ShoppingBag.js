import React, { useEffect, useState } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import {createStackNavigator} from '@react-navigation/stack';
import { ScreenStackHeaderRightView } from 'react-native-screens';


const Stack = createStackNavigator();
const screenHeight = Math.round(Dimensions.get('window').height);


const CheckoutStatusBar = ({step, onAddNewAddressPress}) => {
  //step check out process 1-Review; 2-Address;3-Payment
  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        paddingVertical: 20,
        paddingHorizontal: 20,
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
        <View style={{flex: 1}}>
          <View
            style={{
              height: 20,
              width: 20,
              // borderWidth: 1,
              borderRadius: 100,
              backgroundColor: '#FF7A1A',
            }}></View>
          <Text style={{marginTop: 8, fontWeight: '300'}}>Review</Text>
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
            marginLeft: '15%',
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

    const orders = [{a:1},{a:1},{a:1},{a:1}]
    return (
      <SafeAreaView style={styles1.contaier}>
        <ScrollView>
          <CheckoutStatusBar />
          {orders.map((el, i) => (
            <View style={styles1.orderView} key={i}>
              <View style={styles1.orderDetailsView}>
                <View style={styles1.imageContainer}>
                  <Image
                    style={styles1.image}
                    source={{
                      uri:
                        'https://img.freepik.com/free-psd/white-t-shirts-mockup-grey_34168-1032.jpg?size=626&ext=jpg',
                    }}
                  />
                </View>
                <View style={styles1.detailsContainer}>
                  <Text
                    style={{marginBottom: 10, fontSize: 20, fontWeight: '500'}}>
                    T-shirt
                  </Text>
                  <Text style={{marginBottom: 10, color: '#979393'}}>
                    Product Description lorem ipsum dolrem
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      height: 30,
                    }}>
                    <Text style={{fontSize: 15, fontWeight: '500'}}>
                      Size: M
                    </Text>
                    <Text
                      style={{fontSize: 15, fontWeight: '500', marginLeft: 50}}>
                      Quantity: 1
                    </Text>
                  </View>

                  <Text
                    style={{marginBottom: 10, fontSize: 15, fontWeight: '500'}}>
                    Price: $25
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
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <Text style={{color: '#504343'}}>REMOVE</Text>
              </View>
            </View>
          ))}
          <View style={styles1.priceDetails}>
            <View>
              <Text style={{fontSize: 15, fontWeight: '600'}}>
                Price Details
              </Text>
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
                <Text style={{marginLeft: 30}}>$45</Text>
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
                <Text style={{marginLeft: 30}}>$10</Text>
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
                <Text style={{marginLeft: 30}}>$15</Text>
              </View>
            </View>
            <View style={{borderWidth: 1,opacity: 0.2, marginTop: 15}}></View>
            <View
              style={{
                  marginTop: 30,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>Total</Text>
              <Text>$70</Text>
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
            <Text style={{fontSize: 20}}>$25</Text>
          </View>
          <View style={{flex: 2, marginTop: 2, alignItems: 'flex-end'}}>
            <TouchableOpacity
              style={{width: '80%'}}
              onPress={() => navigation.navigate('Address')}>
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
  const addresses = [{a: 1}, {a: 2}, {a: 3}];
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);

  let scrollViewRef = React.createRef();

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
                      selectedAddress.a == el.a ? '#75BE3B' : '#ffffff',
                  }}></View>
              </View>
              <View style={styles2.addressContainer}>
                <View style={styles2.address}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: '500',
                      marginBottom: 10,
                    }}>
                    Rob
                  </Text>
                  <Text style={{fontSize: 18}}>
                    #23, lorem avenue, Sydney, Australia
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 8,
                      alignItems: 'center',
                      //   j,
                    }}>
                    <Text style={{fontSize: 18, fontWeight: '400'}}>
                      PIN code:{' '}
                    </Text>
                    <Text style={{fontSize: 18, fontWeight: '400'}}>
                      605268
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
                      1234567890
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles2.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.6, y: 1.0}}
              colors={['#FF9F0E', '#F53800']}
              style={styles2.linearGradient}>
              <Text style={styles2.buttonText}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles2 = StyleSheet.create({
  contaier: {
    flex: 1,
  },
  addressView: {
    backgroundColor: '#ffffff',
    marginTop: 10,
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
    marginVertical: 30,
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


const AddAddress = () => {
    return (
      <View>
        <Text>Add address form</Text>
      </View>
    );
}

const Payment = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <CheckoutStatusBar
          step={3}
        />
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
          <Text style={{fontSize: 20}}>$25</Text>
        </View>
        <View style={{flex: 2, marginTop: 2, alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={{width: '80%'}}
            onPress={() => alert('Payment gateway')}>
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

const ShoppinBag = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Review" component={Review} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="Add Address" component={AddAddress} />
        <Stack.Screen name="Payment" component={Payment} />
      </Stack.Navigator>
    );
}


export default ShoppinBag;