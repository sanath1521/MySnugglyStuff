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
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from '../components/Auth';
import Orders from '../components/Orders';
import { useDispatch } from "react-redux";
import { removeData } from '../../AsyncStorage';

const Stack = createStackNavigator();


const Profile = ({ navigation }) => {


  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.app.isLoggedIn);

  const userName = useSelector(state => state.user.name);

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
              <Text style={{fontSize: 25, fontWeight: '400'}}>{userName}</Text>
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
  return (
    <SafeAreaView>
      <View>
        <Text>Addresses Screen</Text>
      </View>
    </SafeAreaView>
  );
};



const ProfileScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Addresses" component={Addresses} />
      </Stack.Navigator>
    );
}


export default ProfileScreen;