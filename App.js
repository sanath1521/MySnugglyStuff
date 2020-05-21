/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Platform,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Auth from './src/components/Auth';
import HomeScreen from './src/screens/HomeScreen';
import ShoppingBag from './src/screens/ShoppingBag';
import ProfileScreen from './src/screens/ProfileScreen';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

Ionicons.loadFont();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


//let platform = Platform.OS == 'ios' ? 'ios' : 'md'; //For Ionicons
let platform = 'md'
const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

// const ShoppingBag = () => {
//   return (
//     <View>
//       <Text>Shopping Bag</Text>
//     </View>
//   );
// };

const Home = () => {
  return (
    <View>
      <Text>Home page showing categories</Text>
    </View>
  );
};

const App = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name == 'Home') {
              iconName = focused ? `${platform}-home` : `${platform}-home`;
            } else if (route.name == 'Profile') {
              iconName = focused ? `${platform}-person` : `${platform}-person`;
            } else if (route.name == 'Shopping Bag') {
              iconName = focused ? `${platform}-cart` : `${platform}-cart`;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Shopping Bag" component={ShoppingBag} />
      </Tab.Navigator>
      {/* <Stack.Navigator> */}
      {/* <Stack.Screen name="Auth" component={Auth} /> */}
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      {/* </Stack.Navigator> */}
      {/* <Auth /> */}
      {/* <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <View>
              <Text>Hello World!</Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
