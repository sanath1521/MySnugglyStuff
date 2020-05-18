/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';



const Auth = ({ navigation }) => {

    const name1 = useSelector(state => state.user.name);

    const [name, setName] = useState(name1);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');

    const [authState, setAuthState] = useState(1); //0 - Login state, 1 - sign up state
    return (
      <View style={styles.body}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>
            {authState == 0 ? 'Log In' : 'Sign up'}
          </Text>
        </View>
        <View style={styles.form}>
          {authState == 1 && (
            <TextInput
              type="text"
              value={name}
              placeholderTextColor="#bfbfbf"
              onChangeText={(text) => setName(text)}
              style={styles.input}
              placeholder={'Name'}
            />
          )}

          {authState == 1 && (
            <TextInput
              type="number"
              value={phone}
              placeholderTextColor="#bfbfbf"
              onChangeText={(text) => setPhone(text)}
              style={styles.input}
              placeholder={'Phone'}
            />
          )}

          <TextInput
            type="email"
            value={email}
            placeholderTextColor="#bfbfbf"
            onChangeText={(text) => setEmail(text.toLocaleLowerCase())}
            style={styles.input}
            placeholder={'Email'}
          />

          <TextInput
            type="password"
            value={password}
            secureTextEntry={true}
            placeholderTextColor="#bfbfbf"
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholder={'Password'}
          />

          {authState == 0 && (
            <View style={styles.forgot}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </View>
          )}

          {authState == 1 && (
            <TextInput
              type="password"
              value={password1}
              placeholderTextColor="#bfbfbf"
              onChangeText={(text) => setPassword1(text)}
              style={styles.input}
              placeholder={'Confirm Password'}
            />
          )}
        </View>
        {authState == 1 && (
          <View style={styles.condition}>
            <Text>
              By creating an account with us, you accept to agree our Terms and
              Conditions
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => console.log('Press')}>
            <LinearGradient
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.6, y: 1.0}}
              colors={['#FF9F0E', '#F53800']}
              style={styles.linearGradient}>
              <Text style={styles.buttonText}>
                {authState == 1 ? 'Create account' : 'Log In'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            authState == 0 ? setAuthState(1) : setAuthState(0);
            navigation.navigate('Home');
          }}>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {authState == 1 ? 'Have an account? Log In' : 'New here? Sign up'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
}
  


const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffffff',
    height: '100%',
    paddingLeft: 30,
    paddingRight: 20,
    paddingTop: 80,
    fontFamily: 'Gill Sans',
  },
  heading: {
    height: '8%',
  },
  headingText: {
    fontSize: 35,
    color: '#F53800',
  },
  form: {
    height: '65%',
  },
  forgot: {
    flex: 1,
    marginTop: 30,
    alignItems: 'flex-end',
  },
  forgotText: {
    color: '#FF9F1E',
  },
  condition: {
    // flex: 1,
    marginTop: -30
  },
  input: {
    height: 20,
    borderBottomColor: '#bfbfbf',
    // backgroundColor: '#bfbfbf',
    color: 'black',
    marginTop: 40,
    borderBottomWidth: 0.4,
  },
  buttonContainer: {
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
  footer: {},
  footerText: {
    color: '#FF9F0E',
    marginLeft: 6,
  },
});


export default Auth;