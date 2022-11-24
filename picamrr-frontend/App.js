import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import { Button, Card, useTheme, Title } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import {StatusBar} from "expo-status-bar";
import Home from "./components/home";
import ReservationForm from "./components/ReservationForm";

// const CARDS = [
//     {
//         id: 1,
//         name: 'brynn',
//         image: 'https://picsum.photos/700',
//         location: "ceva",
//         stars:9.2
//     },
//     {
//         id: 2,
//         name: 'brasfasfasfynn',
//         image: 'https://picsum.photos/700',
//         location: "ceva",
//         stars:9.2
//     },
//     {
//         id: 3,
//         name: 'brasfasfasfynn',
//         image: 'https://picsum.photos/700',
//         location: "ceva 2",
//         stars:9.2
//     },
// ]

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: 'Welcome to PICAMRR App' }}
                />
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
    return <Home/>;
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
});