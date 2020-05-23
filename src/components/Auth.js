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
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ActivityIndicatorBase
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { apiUrl } from '../../App';
import { useDispatch } from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { storeData } from '../../AsyncStorage';

var {width, height} = Dimensions.get('window');


const Auth = ({ navigateTo }) => {


    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [password1, setPassword1] = useState(null);

    const [authState, setAuthState] = useState(0); //0 - Login state, 1 - sign up state

    const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

    const loginUser = () => {
      if(isLoading) return;
       let data = {
         email,
         password,
       };
       console.log(data);
       setLoading(true);
       axios
         .post(`${apiUrl}/users/login`, data, {timeout: 20000})

         .then((res) => {
           setLoading(false);
           if (res.data.status == 200) {
             //dispatch an action to save user details
             
             let result = res.data.user;
              storeData(
                'user',
                JSON.stringify({isLoggedIn: true, id: result._id}),
              );
             let data = {
               id: result._id,
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

           else if(res.data.status == 500){
              alert(res.data.message);
           }

         })
         .catch((err) => {
           console.log(err);
           setLoading(false);
           alert('Sorry! An error occured at the server.');
         });
    }

    const signupUser = () => {
      if(name.length < 2){
        alert('Please enter a valid name.');
        return;
      }
      if(phone.length != 10){
        return alert('Please enter a valid phone number.');
      }
      if(email.length < 5 || !email.includes('@')){
        return alert('Please enter a valid email');
      }
      if(password.length < 8) {
        return alert('Please enter a password with min 8 characters');
      }

      if(password != password1){
        return alert('Please make sure that passwords you entered are same.');
      }

      let data = {
        name, phone, email, password
      }

      setLoading(true);

      axios.post(`${apiUrl}/users/signup`, data, { timeout: 10000 })
      .then(res => {
        if(res.data.status == 200){
            //dispatch user details
            setLoading(false);
            console.log(res);

          let result = res.data.user;
          storeData('user', JSON.stringify({isLoggedIn: true, id: result._id}));
          let data = {
            id: result._id,
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

          //dispatch login user action
          dispatch({
            type: 'LOGIN_USER',
          })
        }
      })
      .catch(err => {
        setLoading(false);
        alert("An Error occured at the server.");
      })
    }

    const handleButtonPress = () => {
      if(authState == 0){
        loginUser();
      }
      else{
        signupUser();
      }
    }

    return (
      <>
        <SafeAreaView style={styles.body}>
          {isLoading && <View style={[styles.overlay, {height: '100%'}]}>
            <ActivityIndicator size="small" color="#FF9F0E" />
          </View>}
          <KeyboardAwareScrollView>
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
                  keyboardType="numeric"
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
                autoCapitalize={'none'}
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
                  secureTextEntry={true}
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
                  By creating an account with us, you accept to agree our Terms
                  and Conditions
                </Text>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleButtonPress()}>
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
              }}>
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  {authState == 1
                    ? 'Have an account? Log In'
                    : 'New here? Sign up'}
                </Text>
              </View>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
}
  


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
    justifyContent: 'center'
  } ,
  body: {
    backgroundColor: '#ffffff',
    // height: '100%',
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 30,
    // paddingTop: 80,
    fontFamily: 'Gill Sans',
  },
  heading:{
    marginTop: 10
  },
  headingText: {
    fontSize: 35,
    color: '#F53800',
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
    marginTop: 50
  },
  input: {
    // height: 40,
    paddingVertical:10,
    borderBottomColor: '#bfbfbf',
    // backgroundColor: '#bfbfbf',
    // color: 'black',
    marginTop: 40,
    borderBottomWidth: 0.4,
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
  footer: {},
  footerText: {
    color: '#FF9F0E',
    marginLeft: 6,
  },
});


export default Auth;