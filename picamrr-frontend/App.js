import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, Card, useTheme, Title } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from "expo-status-bar";
import Home from "./components/home";
import ReservationForm from "./components/ReservationForm";
import Profile from './components/profilePage';
import Login from "./components/login/login";
import ViewReservations from './components/viewReservations';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={({ navigation }) => ({
                        headerRight: () =>
                        (<div style={styles.wrapperIcons}>
                            <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Reservations')}>
                                <Icon name="ios-list" size={27} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Profile')}>
                                <Icon name="ios-person" size={27} />
                            </TouchableOpacity>
                        </div>)
                    })
                    }
                />
                <Stack.Screen name="Reservations" component={ViewReservations} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="ReservationForm" component={ReservationForm} />
            </Stack.Navigator>
        </NavigationContainer>
    );
    //const theme = useTheme();
    //   const renderItem = ({ item }) => (
    //       <Card>
    //           <Card.Title title = {item.name} subtitle ={item.stars + "⭐"} />
    //           <Card.Cover source={{ uri: item.image }} />
    //           <Card.Content>
    //               <Title>{item.location}</Title>
    //           </Card.Content>
    //           <Card.Actions>
    //               <Button  onPress={() => console.log('Pressed')}>Raul</Button>
    //           </Card.Actions>
    //       </Card>
    //   );
    //
    //   return (
    //     <View style={styles.container}>
    //         <FlatList
    //             data={CARDS}
    //             renderItem={renderItem}
    //             keyExtractor={item => item.id}
    //         />
    //     </View>
    // );
    return <Home />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },

    icon: {
        marginLeft: '35%',
    },
    wrapperIcons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingRight: '15%'
    }
});
