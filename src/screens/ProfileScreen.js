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
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from '../components/Auth';

const Stack = createStackNavigator();


const Profile = ({  }) => {

    const isUserLoggedIn = useSelector((state) => state.app.isLoggedIn);

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View style={styles1.profileCard}>
            <View style={styles1.profilePic}></View>
            <View style={styles1.profileName}>
              <Text style={{fontSize: 25, fontWeight: '400'}}>Rob</Text>
            </View>
          </View>

          <View style={styles1.mainView}>
            <View style={{marginBottom: 20}}>
              <Text style={{fontSize: 20, fontWeight: '400'}}>Details</Text>
              <Text style={{fontSize: 12, fontWeight: '300', opacity: 0.6}}>
                Check your profile details
              </Text>
              <View
                style={{borderWidth: 1, opacity: 0.2, marginTop: 20}}></View>
            </View>
            <View style={{marginBottom: 20}}>
              <Text style={{fontSize: 20, fontWeight: '400'}}>Orders</Text>
              <Text style={{fontSize: 12, fontWeight: '300', opacity: 0.6}}>
                Check your orders
              </Text>
              <View
                style={{borderWidth: 1, opacity: 0.2, marginTop: 20}}></View>
            </View>
            <View>
              <Text style={{fontSize: 20, fontWeight: '400'}}>Addresses</Text>
              <Text style={{fontSize: 12, fontWeight: '300', opacity: 0.6}}>
                Check your saved addresses
              </Text>
              {/* <View style={{borderWidth: 1, opacity: 0.2, marginTop: 5}}></View> */}
            </View>
          </View>
        </ScrollView>
        <View style={{marginBottom: 10, paddingHorizontal: 20}}>
          <TouchableOpacity
            style={{borderWidth: 1, height: 40, borderColor: '#dc8e19'}}
            onPress={() => alert('Logout')}>
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

const Orders = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Orders Screen</Text>
      </View>
    </SafeAreaView>
  );
};


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