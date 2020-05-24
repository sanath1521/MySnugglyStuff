import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from '../components/Auth';
import Orders from '../components/Orders';
import { useDispatch } from "react-redux";
import { removeData } from '../../AsyncStorage';
import axios from 'axios';
import { apiUrl } from '../../App';
import {useFocusEffect} from '@react-navigation/native';
import {storeData} from '../../AsyncStorage';



let {width, height} = Dimensions.get('window');


const Stack = createStackNavigator();


const Profile = ({ navigation }) => {


  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.app.isLoggedIn);

  const userName = useSelector(state => state.user.name);


  const [username, setUsername] = useState(userName);

  // useEffec
  useFocusEffect(
    React.useCallback(() => {
      setUsername(userName);
    }, [userName])
  )

  if(!isUserLoggedIn) {
    return(
      <Auth />
    )
  }


  const handleLogoutPress = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => logout()},
      ],
      {cancelable: false},
    );
  }

  const logout = () => {
    dispatch({
      type: 'LOGOUT_USER',
    });

    //Removing user data in AsyncStorage;
    removeData('user');
  }

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={styles1.profileCard}>
            <View style={styles1.profilePic}></View>
            <View style={styles1.profileName}>
              <Text style={{fontSize: 25, fontWeight: '400'}}>{username}</Text>
            </View>
          </View>

          <View style={styles1.mainView}>
            <TouchableOpacity
              style={{marginBottom: 20}}
              onPress={() => navigation.navigate('Details')}>
              <Text style={{fontSize: 20, fontWeight: '400'}}>Details</Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '300',
                  opacity: 0.6,
                  marginTop: 4,
                }}>
                Check your profile details
              </Text>
              <View
                style={{borderWidth: 1, opacity: 0.2, marginTop: 20}}></View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginBottom: 20}}
              onPress={() => navigation.navigate('Orders')}>
              <Text style={{fontSize: 20, fontWeight: '400'}}>Orders</Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '300',
                  opacity: 0.6,
                  marginTop: 4,
                }}>
                Check your orders
              </Text>
              <View
                style={{borderWidth: 1, opacity: 0.2, marginTop: 20}}></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Addresses')}>
              <Text style={{fontSize: 20, fontWeight: '400'}}>Addresses</Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '300',
                  opacity: 0.6,
                  marginTop: 4,
                }}>
                Check your saved addresses
              </Text>
              {/* <View style={{borderWidth: 1, opacity: 0.2, marginTop: 5}}></View> */}
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{marginBottom: 10, paddingHorizontal: 20}}>
          <TouchableOpacity
            style={{borderWidth: 1, height: 40, borderColor: '#dc8e19'}}
            onPress={() => handleLogoutPress()}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                marginTop: 5,
                color: '#dc8e19',
              }}>
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}



const styles1 = StyleSheet.create({
  profileCard: {
    backgroundColor: '#ffffff',
    marginVertical: 30,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profilePic: {
    marginVertical: 10,
    paddingVertical: 10,
    height: 100,
    width: 100,
    backgroundColor: '#c4c4c4',
  },
  profileName: {
    marginTop: 10,
    marginLeft: 20,
  },
  mainView: {
      backgroundColor: '#ffffff',
      marginTop: 20,
      paddingHorizontal: 20,
      paddingVertical: 20
  },
});


const Addresses = () => {

  const userId = useSelector(state => state.user.id);

  const [addresses, setAddresses] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      let data = {
        userId,
      };
      axios
        .post(`${apiUrl}/users/getSavedAddresses`, data)
        .then((res) => {
          console.log(res);
          if (res.data.length > 0) {
            setAddresses(res.data);
            // setSelectedAddress(res.data[0]);
          }

          setIsLoading(false);
        })
        .catch((err) => {
          alert('Sorry! an error occured at the server.');
          setAddresses(null);
          setIsLoading(false);
          // setError(true);
        });
    }, []),
  );


  if (isLoading){
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color="#FF9F0E" />
      </View>
    </SafeAreaView>;
  }



  if (!isLoading && addresses && addresses.length == 0) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No saved addresses found.</Text>
        </View>
      </SafeAreaView>
    );
  }


  if (!isLoading && addresses == null) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Sorry! something is not right here.</Text>
        </View>
      </SafeAreaView>
    );
  }
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          {addresses.map((el, i) => (
            <View
              onPress={() => {
                // setSelectedAddress(el);
                // scrollViewRef && scrollViewRef.scrollToEnd({animated: true});
              }}
              key={i}>
              <View style={styles2.addressView}>
                {/* <View style={styles2.circleContainer}>
                <View
                  style={{
                    ...styles2.circle,
                    backgroundColor:
                      selectedAddress && selectedAddress._id == el._id
                        ? '#75BE3B'
                        : '#ffffff',
                  }}></View>
              </View> */}
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
            </View>
          ))}
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
    marginTop: 5,
    padding: 20,
    flex: 1,
    flexDirection: 'row',
  },
  addressContainer: {
    flex: 1,
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


const Details = ({navigation}) => {

  const userId = useSelector((state) => state.user.id);
  const [name, setName] = useState(useSelector(state => state.user.name));
  const [phone, setPhone] = useState(useSelector((state) => state.user.phone));
  const [email, setEmail] = useState(useSelector((state) => state.user.email));
  const [password, setPassword] = useState(
    useSelector((state) => state.user.password),
  );


  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

   const handleButtonPress = () => {
    Alert.alert('Save Changes', 'Are you sure you want to save changes?', 
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => saveChanges()},
      ],
      {cancelable: true},
    );
   }


   const saveChanges = () => {
     setIsLoading(true);
     let data = {
       userId, 
       name,
       phone,
       email,
       password
     }


     axios.post(`${apiUrl}/users/updateUserDetails`, data, { timeout: 10000 })
     .then(res => {
      if(res.data.status == 200){
        setIsLoading(false);
        alert('Changes updated successfully');
         let result = res.data.user;
         storeData('user', JSON.stringify({isLoggedIn: true, id: result._id}));
         let data = {
           id: result._id,
           name: result.name,
           phone: result.phone,
           password: result.password,
           email: result.email,
           savedItems: result.savedItems,
           addresses: result.addresses ? result.addresses : [],
           orders: result.orders,
         };

         dispatch({
           type: 'UPDATE_USER_DATA',
           data,
         });
      }
     })
     .catch(e => {
       setIsLoading(false);
       alert('Sorry! An error occured at the server.');
     })

   }

   const [isLoading, setIsLoading] = useState(false);


  return (
    <SafeAreaView style={styles.body}>
      {isLoading && (
        <View style={[styles.overlay, {height: '100%'}]}>
          <ActivityIndicator size="small" color="#FF9F0E" />
        </View>
      )}
      <View style={styles.form}>
        <TextInput
          type="text"
          value={name}
          placeholderTextColor="#bfbfbf"
          onChangeText={(text) => setName(text)}
          style={styles.input}
          placeholder={'Name'}
        />

        <TextInput
          type="number"
          value={phone.toString()}
          keyboardType="numeric"
          placeholderTextColor="#bfbfbf"
          onChangeText={(text) => setPhone(text)}
          style={styles.input}
          placeholder={'Phone'}
        />

        <TextInput
          type="email"
          value={email}
          placeholderTextColor="#bfbfbf"
          autoCapitalize={'none'}
          onChangeText={(text) => setEmail(text.toLocaleLowerCase())}
          style={styles.input}
          placeholder={'Email'}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            type="text"
            value={password}
            secureTextEntry={showPassword ? false : true}
            placeholderTextColor="#bfbfbf"
            onChangeText={(text) => setPassword(text)}
            style={{...styles.input, flex: 2}}
            placeholder={'Password'}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{
              marginRight: 30,
              position: 'absolute',
              right: -10,
              zIndex: 100,
            }}>
            <Text
              style={{
                fontSize: 13,
                opacity: 0.4,
              }}>
              {showPassword ? 'HIDE' : 'SHOW'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleButtonPress()}>
          <LinearGradient
            start={{x: 0.0, y: 0.25}}
            end={{x: 0.6, y: 1.0}}
            colors={['#FF9F0E', '#F53800']}
            style={styles.linearGradient}>
            <Text style={styles.buttonText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
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
    justifyContent: 'center',
  },
  form: {
    paddingTop: 30
  },
  body: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 30,
    fontFamily: 'Gill Sans',
  },
  input: {
    // paddingLeft: 10,
    marginVertical: 20,
    borderBottomColor: '#bfbfbf',
    color: 'black',
    paddingVertical: 10,
    borderBottomWidth: 0.3,
  },
  buttonContainer: {
    marginTop: 60,
    display: 'flex',
    height: '20%',
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


const ProfileScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Addresses" component={Addresses} />
      </Stack.Navigator>
    );
}


export default ProfileScreen;