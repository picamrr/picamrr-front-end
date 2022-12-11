import {Button, Card, Title} from "react-native-paper";
import {FlatList, StyleSheet, View} from "react-native";
import React from "react";
import {StatusBar} from "expo-status-bar";

const CARDS = [
    {
        id: 1,
        name: 'Mad Bee Bistro',
        image: require('../images/restaurant1.jpg'),
        location: "Strada Regele Ferdinand 22, Cluj-Napoca 400394",
        stars:9.5
    },
    {
        id: 2,
        name: 'Ginger Bliss Provisions',
        image: require('../images/restaurant2.jpg'),
        location: "Strada Émile Zola 5, Cluj-Napoca 400112",
        stars:8.8
    },
    {
        id: 3,
        name: 'Daily Lantern Lounge',
        image: require('../images/restaurant3.jpg'),
        location: "Str. Al.V. Voievod nr. 53-55",
        stars:9.1
    },
]

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
    card: {
        borderRadius: 10,
        margin: 10,
        marginTop: 2,
    }
});

export default function Home({ navigation, route }) {
    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Title title = {item.name} subtitle ={item.stars + "⭐"} />
            <Card.Cover source={{ uri: item.image }} />
            <Card.Content>
                <Title>{item.location}</Title>
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => navigation.navigate('ReservationForm', {id: item.id, name: item.name,
                    image: item.image, location: item.location, stars: item.stars})}>Book</Button>
            </Card.Actions>
        </Card>
    );

    return (
        <View  style={styles.container}>
            <FlatList
                data={route.params.restaurants}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>);
}