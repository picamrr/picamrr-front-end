import React, {useEffect, useState} from "react";
import {Text, StyleSheet, View, Button, Pressable, FlatList} from 'react-native';
import {Card, FAB, Title} from "react-native-paper";
import "../css/reservation-form.css";
import {addReservation, getReviewsForRestaurant, getUserByEmail} from "../services/APIRequests";

export default function ReviewsPage({navigation, route}) {
    const restaurantId = route.params.id;
    const item = route.params;
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getReviews = async () => {
            await getReviewsForRestaurant(restaurantId).then((reviews) => {
                if (reviews) {
                    setReviews(reviews);
                }
            });
        }
        getReviews();
    }, [restaurantId])


    const renderItem = ({ item }) => {
        return (
            <Card style={styles.card}>
                <Card.Title titleStyle={styles.title} subtitleStyle={styles.subtitle}
                            title = {item.noOfStars + "⭐"}
                />

                <Card.Content>
                    <Text style={styles.address_phone}>{item.reviewText}</Text>
                </Card.Content>
            </Card>
        )
    }
    return (
        <View style={styles.parent}>
            <Card>
                <Card.Title title={route.params.name} subtitle={String(route.params.stars).slice(0,3)+ "⭐"}/>
                <Card.Cover source={{uri: `data:image/jpeg;base64,${route.params.image.trim()}`}}/>
                <Card.Content>
                    <Title>{route.params.location}</Title>
                </Card.Content>
            </Card>
            <FlatList
                data={reviews}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <FAB
                visible={true}
                label="BOOK"
                size={"small"}
                style={styles.fab}
                onPress={() =>
                    navigation.navigate('ReservationForm', {
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    location: item.location,
                    stars: item.stars,
                    availableSeatsPerInterval: item.availableSeatsPerInterval
                })
                    // console.log("am apasat curva" + JSON.stringify(item))
            }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    parent: {
        flex: 1
    },
    wrapperInputForm: {
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItems: "center",
        flex: 1
    },
    button: {
        borderRadius: 10,
        backgroundColor: 'grey',
    },
    dropDownPicker: {
        borderColor: 'transparent',
        borderBottomColor: '#c1c1c1',
        backgroundColor: '#e7e7e7',
        width: 250,
        alignSelf: "center"
    },
    fab: {
        position: "absolute",
        width: "15%",
        margin: 16,
        bottom: 0,
        right: 0,
        backgroundColor: "purple",
    },
});
