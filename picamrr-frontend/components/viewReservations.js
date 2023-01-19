import {Button, Card, Title, Divider} from "react-native-paper";
import {FlatList, Pressable, StyleSheet, View, Text, TextInput} from "react-native";
import React, {useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {getReservations, cancelReservation, addReview} from "../services/APIRequests";
import {MyModal} from "./modal"
import StarRating from 'react-native-star-rating-widget';
import {FAB} from 'react-native-paper';
import {Portal} from "@material-ui/core";

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
        alignItems: 'center'
    },
    card: {
        borderRadius: 10,
        margin: 10,
        marginTop: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center'
    },
    cancelbutton: {
        backgroundColor: '#75121c',
        height: 50,
        width: 100,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        display: 'flex',
        align: 'center',
    },
    cancelbuttonDisabled: {
        backgroundColor: '#75121c',
        height: "auto",
        width: '108%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'column',
        alignItems: "center",
        opacity: 0.3,

    },
    textCancelBtn: {
        color: 'white',
        fontSize: '15px'
    },


    modalbtn: {
        backgroundColor: '#75121c',
        height: "30",
        width: "50",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'column',
        alignItems: "center",
        color: "white"
    }

});


export default function Reservations({navigation}) {
    const [reservations, setReservations] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalRatingsVisible, setIsModalRatingsVisible] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const [rating, setRating] = useState(0);
    const [ratingText, setRatingText] = useState("");

    useEffect(() => {
        getReservations().then((data) => {
            if (data) {
                setReservations(data)
            }
        }).catch((error) => console.log("nu e bine"));
    }, []);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);
    const handleModalRatings = () => setIsModalRatingsVisible(() => !isModalRatingsVisible);

    const handleCancel = () => {
        cancelReservation(selectedId).then((_) => {
            const temp = [];
            for (const res of reservations) {
                if (res.id !== selectedId) {
                    temp.push(res);
                }

            }
            setReservations(temp);
            handleModal();
        });
    };

    const handleAddReview = () => {
        addReview(selectedId, rating, ratingText).then((_) => {
            handleModalRatings();
        });

    };

    const verifyDate = (date, gap) => {
        const today = new Date();
        const reservationHours = gap.split("-");
        const start = new Date(date);
        console.log(today);
        console.log(reservationHours);
        console.log(start);
        if (today < start) {
            return true;
        }
        if (start.getDay() === today.getDay() && start.getMonth() === today.getMonth() && start.getFullYear() === today.getFullYear()) {
            if (reservationHours[0] > today.getHours().toString())
                return true;
        }
        return false;

    }

    const renderButton = ({item}) => {
        if (verifyDate(item.dateOfReservation, item.gap) !== true) {
            return (
                <Pressable
                    style={styles.cancelbutton}
                    onPress={() => {
                        setSelectedId(item.restaurant.id);
                        handleModalRatings();
                    }}
                >
                    <Text style={styles.textCancelBtn}>Rate it!</Text>
                </Pressable>
            );
        } else {
            return (
                <Pressable
                    hide={verifyDate(item.dateOfReservation, item.gap) !== true}
                    style={styles.cancelbutton}
                    onPress={() => {
                        setSelectedId(item.id);
                        handleModal();
                    }}
                >
                    <Text style={styles.textCancelBtn}>Cancel</Text>
                    <Text style={styles.textCancelBtn}>Reservation</Text>
                </Pressable>
            );
        }
    }

    const renderItem = ({item}) => (
        <Card style={styles.card}>
            <Card.Title
                title={item.restaurant.name}
                subtitle={`Reservation date : ${item.dateOfReservation}`}

            />
            <Divider/>
            <Card.Content style={{display: 'flex'}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: '70%'}}>
                        <div style={{marginTop: "3%"}}>{"Reservation interval →" + item.gap}</div>
                        <div style={{marginTop: "3%"}}>{"Number of seats → " + item.noOfSeats}</div>
                    </View>
                    <View>
                        <Card.Actions>
                            {
                                renderButton({item})
                            }
                        </Card.Actions>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );

    function onChangeText(text) {
        setRatingText(text);
    }

    return (

        <View style={styles.container}>
            <MyModal isVisible={isModalVisible === undefined ? false : isModalVisible === true}>
                <MyModal.Container>
                    <MyModal.Header title="You're just one step away!"/>
                    <MyModal.Body>
                        <Text style={styles.text}>Are you sure you want to cancel your reservation?</Text>
                    </MyModal.Body>
                    <MyModal.Footer>
                        <Pressable style={styles.modalbtn} onPress={handleCancel}>
                            <Text style={styles.textCancelBtn}> Yes </Text>
                        </Pressable>
                        <Pressable style={styles.modalbtn} onPress={handleModal}>
                            <Text style={styles.textCancelBtn}> No </Text>
                        </Pressable>
                    </MyModal.Footer>
                </MyModal.Container>
            </MyModal>

            <MyModal isVisible={isModalRatingsVisible === undefined ? false : isModalRatingsVisible === true}>
                <MyModal.Container>
                    <MyModal.Header title="Rate your experience!"/>
                    <MyModal.Body>
                        <StarRating
                            maxStars={5}
                            rating={rating}
                            onChange={setRating}
                        />

                        <TextInput
                            editable
                            multiline
                            placeholder={"Write something about your experience"}
                            numberOfLines={4}
                            maxLength={40}
                            onChangeText={text => onChangeText(text)}
                            value={ratingText}
                            style={{padding: 10}}
                        />
                    </MyModal.Body>
                    <MyModal.Footer>
                        <Pressable style={styles.modalbtn} onPress={handleAddReview}>
                            <Text style={styles.textCancelBtn}> Submit </Text>
                        </Pressable>
                    </MyModal.Footer>
                </MyModal.Container>
            </MyModal>

            <FlatList
                data={reservations}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}