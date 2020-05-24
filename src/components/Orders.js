import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ActivityIndicatorBase,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {apiUrl} from '../../App';
import {useFocusEffect} from '@react-navigation/native';



let {width, height} = Dimensions.get('window');

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const userId = useSelector(state => state.user.id);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState(false);

    useFocusEffect(
        React.useCallback(() => {            
            setIsLoading(true);
            if (!error) setError(false);
            
            let data = {
                userId,
            };


            axios
            .post(`${apiUrl}/users/getOrders`, data, {timeout: 10000})
            .then((res) => {
                if(res.data.status == 200){
                    setOrders(res.data.orders);
                }
                else{
                    setError(true);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.log('An error occured at the server.');
                setOrders(null);
                setIsLoading(false);
                setError(true);
            });
        }, [])
    );

     //Loading state
    if(isLoading){
        return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="small" color="#FF9F0E" />
            </View>
        </SafeAreaView>
        )
    }

     if (orders.length == 0) {
       return (
         <SafeAreaView style={{flex: 1}}>
           <View
             style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
             <Text>No Orders found.</Text>
           </View>
         </SafeAreaView>
       );
     }

    if (error) {
      return (
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Sorry! something is not right here.</Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          {orders.map((order, i) => (
            <>
              <View
                key={i}
                style={{
                  marginVertical: 20,
                  paddingHorizontal: 20,
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 15, fontWeight: '400', paddingRight: 10}}>
                  Order Id: {order.id}
                </Text>
                <Text
                  style={{
                    color: '#FF9F0E',
                    fontSize: 15,
                    fontWeight: '700',
                    paddingRight: 10,
                    textTransform: 'capitalize'
                  }}>
                  {order.status}
                </Text>
              </View>
              {order.items.map((el, i) => (
                <View style={styles1.orderView} key={i}>
                  <View style={styles1.orderDetailsView}>
                    <View style={styles1.imageContainer}>
                      <Image
                        style={styles1.image}
                        source={{
                          uri:
                            el.imageUrl
                        }}
                      />
                    </View>
                    <View style={styles1.detailsContainer}>
                      <Text
                        style={{
                          marginBottom: 10,
                          fontSize: 20,
                          fontWeight: '500',
                        }}>
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
                          style={{
                            fontSize: 15,
                            fontWeight: '500',
                            marginLeft: 50,
                          }}>
                          Quantity: 1
                        </Text>
                      </View>

                      <Text
                        style={{
                          marginBottom: 10,
                          fontSize: 15,
                          fontWeight: '500',
                        }}>
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
                    <View style={{flex: 1, flexDirection: 'row',justifyContent: 'flex-end', marginVertical: 10, paddingRight: 20}}>
                        <Text>Total: $30</Text>
                    </View>
                </View>
              ))}
            </>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
}



const styles1 = StyleSheet.create({
  contaier: {
    flex: 1,
  },
  orderView: {
    // marginTop: 10,
    padding: 10,
    flex: 1,
    backgroundColor: '#FFFFFF',
    // height: 0.2 * height,
  },
  orderDetailsView: {
    // flex: 2,
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
      marginLeft: 10
  },
});


export default Orders;