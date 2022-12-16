// to install it 'expo install expo-secure-store'

import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = (token) => {
    return AsyncStorage.setItem('secure_token', token);
};

export const getToken = async () => {
    return await AsyncStorage.getItem('secure_token')
};
