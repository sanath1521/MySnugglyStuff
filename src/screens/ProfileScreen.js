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


const Profile = ({ navigation }) => {

    const isUserLoggedIn = useSelector((state) => state.app.isLoggedIn);


    if(!isUserLoggedIn) {
      return(
        <Auth />
      )
    }

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
  return(
    <SafeAreaView>
      <View>
        <Text>Orders screen</Text>
      </View>
    </SafeAreaView>
  )
}

// const Orders = () => {
//   return (
//     <SafeAreaView style={styles1.contaier}>
//       <ScrollView>
//         <CheckoutStatusBar />
//         {orders &&
//           orders.length > 0 &&
//           orders.map((el, i) => (
//             <View style={styles1.orderView} key={i}>
//               <View style={styles1.orderDetailsView}>
//                 <View style={styles1.imageContainer}>
//                   <Image
//                     style={styles1.image}
//                     source={{
//                       uri: el.imageUrl,
//                     }}
//                   />
//                 </View>
//                 <View style={styles1.detailsContainer}>
//                   <Text
//                     style={{marginBottom: 10, fontSize: 20, fontWeight: '500'}}>
//                     {el.name}
//                   </Text>
//                   <Text style={{marginBottom: 10, color: '#979393'}}>
//                     {el.description}
//                   </Text>
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'flex-start',
//                       height: 30,
//                     }}>
//                     <Text
//                       style={{
//                         fontSize: 15,
//                         fontWeight: '500',
//                         textTransform: 'uppercase',
//                       }}>
//                       Size: {el.size}
//                     </Text>
//                     <Text
//                       style={{fontSize: 15, fontWeight: '500', marginLeft: 50}}>
//                       Quantity: 1
//                     </Text>
//                   </View>

//                   <Text
//                     style={{marginBottom: 10, fontSize: 15, fontWeight: '500'}}>
//                     Price: ${el.price}
//                   </Text>
//                 </View>
//               </View>
//               <View
//                 style={{
//                   borderWidth: 1,
//                   marginTop: 25,
//                   backgroundColor: '#979393',
//                   opacity: 0.2,
//                 }}></View>
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: 'center',
//                   alignItems: 'flex-end',
//                 }}>
//                 <Text style={{color: '#504343'}}>STATUS</Text>
//               </View>
//             </View>
//           ))}
//         <View style={styles1.priceDetails}>
//           <View>
//             <Text style={{fontSize: 15, fontWeight: '600'}}>Price Details</Text>
//           </View>
//           <View>
//             <View
//               style={{
//                 //   backgroundColor: 'blue',
//                 flex: 1,
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 marginTop: 20,
//               }}>
//               <Text>Items price</Text>
//               <Text style={{marginLeft: 30}}>
//                 ${priceDetails && priceDetails.totalPrice}
//               </Text>
//             </View>
//           </View>
//           <View>
//             <View
//               style={{
//                 //   backgroundColor: 'blue',
//                 flex: 1,
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 marginTop: 10,
//               }}>
//               <Text>Taxes</Text>
//               <Text style={{marginLeft: 30}}>
//                 ${priceDetails && priceDetails.tax}
//               </Text>
//             </View>
//           </View>
//           <View>
//             <View
//               style={{
//                 //   backgroundColor: 'blue',
//                 flex: 1,
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 marginTop: 10,
//               }}>
//               <Text>Delivery charges</Text>
//               <Text style={{marginLeft: 30}}>
//                 ${priceDetails && priceDetails.deliveryCharge}
//               </Text>
//             </View>
//           </View>
//           <View style={{borderWidth: 1, opacity: 0.2, marginTop: 15}}></View>
//           <View
//             style={{
//               marginTop: 30,
//               flex: 1,
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//             }}>
//             <Text>Total</Text>
//             <Text>
//               $
//               {priceDetails &&
//                 priceDetails.totalPrice +
//                   priceDetails.tax +
//                   priceDetails.deliveryCharge}
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };


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