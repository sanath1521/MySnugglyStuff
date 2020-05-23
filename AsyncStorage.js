import {AsyncStorage} from 'react-native';



export const storeData = async (key,value) => {
    try {
        await AsyncStorage.setItem(key, value);
    }
    catch(error){
        console.log('Error saving data');
    }
}


export const retrieveData = async (key) => {

    console.log(key);
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch {
        return null;
    }
};


export const removeData = async(key) => {
    try{
        await AsyncStorage.removeItem(key);
    }
    catch(error){
        console.log('error');
    }
}