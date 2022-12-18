import { Button, Card, Title, Divider } from "react-native-paper";
import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { getReservations, cancelReservation } from "../services/APIRequests";
import Modal from "react-native-modal";
import { MyModal } from "../components/modal"

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
        alignItems: "center"


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


export default function Reservations({ navigation }) {
    const [reservations, setReservations] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedId, setSelectedId] = useState();
    useEffect(() => {
        getReservations().then((data) => { if (data) { setReservations(data) } }).catch((error) => console.log("nu e bine"));
    }, []);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);
    const handleCancel = () => {
        cancelReservation(selectedId).then((_) => {
            const temp = [];
            for (const res of reservations) {
                if (res.id !== selectedId){
                    temp.push(res);
                }
                    
            }
            setReservations(temp);
            handleModal();
        });
    };

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Title
                title={item.restaurant.name}
                subtitle={`Reservation date : ${item.dateOfReservation}`}

            />
            <Divider />
            <Card.Content style={{ display: 'flex' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '70%' }}>
                        <div style={{ marginTop: "3%" }}>{"Reservation interval →" + item.gap}</div>
                        <div style={{ marginTop: "3%" }}>{"Number of seats → " + item.noOfSeats}</div>
                    </View>
                    <View>
                        <Card.Actions >
                            <Pressable style={styles.cancelbutton} onPress={() => { setSelectedId(item.id); handleModal() }}>
                                <Text style={styles.textCancelBtn}>Cancel</Text>
                                <Text style={styles.textCancelBtn}>Reservation</Text>
                            </Pressable>
                        </Card.Actions>
                    </View>
                </View>
            </Card.Content>
        </Card>

    );

    return (
        <View style={styles.container}>
            <MyModal isVisible={isModalVisible === undefined ? false : isModalVisible === true ? true : false}>
                <MyModal.Container>
                    <MyModal.Header title="You're just one step away!" />
                    <MyModal.Body>
                        <Text style={styles.text}>Are you sure you want to cancel your reservation?</Text>
                    </MyModal.Body>
                    <MyModal.Footer>
                        <Pressable style={styles.modalbtn} onPress={handleCancel}>
                            <Text style={styles.textCancelBtn}>     Yes     </Text>
                        </Pressable>
                        <Pressable style={styles.modalbtn} onPress={handleModal}>
                            <Text style={styles.textCancelBtn}>     No      </Text>
                        </Pressable>
                    </MyModal.Footer>
                </MyModal.Container>
            </MyModal>
            <FlatList
                data={reservations}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>);
}