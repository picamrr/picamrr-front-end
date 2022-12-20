import {Button, Card, Title} from "react-native-paper";
import {FlatList, StyleSheet, View} from "react-native";
import React from "react";
import {StatusBar} from "expo-status-bar";

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
                    image: item.image, location: item.location, stars: item.stars,
                    availableSeatsPerInterval: item.availableSeatsPerInterval})}>Book</Button>
            </Card.Actions>
        </Card>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={route.params.restaurants}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>);
}