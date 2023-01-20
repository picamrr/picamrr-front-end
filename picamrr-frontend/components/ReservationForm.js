import React, {useEffect, useState} from "react";
import {Text, StyleSheet, View, Button, Pressable} from 'react-native';
import {Card, Title} from "react-native-paper";
import InputSpinner from "react-native-input-spinner";
import "../css/reservation-form.css";
import {DateTimePickerModal} from 'react-native-paper-datetimepicker';
import {TextInput} from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker';
import {addReservation, getUserByEmail} from "../services/APIRequests";
import {getToken} from "../services/SecureStorage";
import {toast, Toaster} from "react-hot-toast";


export default function ReservationForm({navigation, route}) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date('2023-01-13'));
    const [value, setValue] = useState([]);
    const [spinnerValue, setSpinnerValue] = useState(1);
    const [items, setItems] = useState(getItems(route.params.availableSeatsPerInterval));
    const restaurantId = route.params.id;

    const [fieldName, setFieldName] = useState("");
    const [fieldEmail, setFieldEmail] = useState("");

    useEffect(() => {
        const getUser = async () => {
            await getToken().then(async (encodedString) => {
                const emailOfUser = atob(encodedString).split(':')[0];
                await getUserByEmail(emailOfUser).then(user => {
                    setFieldEmail(user.email);
                    setFieldName(user.name);
                });
            });
        }
        getUser();
    }, [])


    function getItems(availableSeatsPerInterval) {
        let items = [];
        availableSeatsPerInterval.forEach(function(a) {
            let jsonData = {}
            jsonData["value"] = a.gap;
            jsonData["label"] = a.gap;
            items.push(jsonData);
        });
        return items
    }

    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        console.log("executing")
        setDate(date);
        hideDatePicker();
    };

    const bookReservation = async () => {
        await addReservation(restaurantId, date, spinnerValue, value).then(response => {
            console.log("Added reservation " + response.status);
            if (response.status === 201) {
                // toast.success("Reservation made successfully!", { position: "bottom-center" });
                navigation.goBack();
                return 1;
            }
            return response.json();
        }).then(response => {
            if (response !== 1) {
                toast.error(response.message, { position: "bottom-center" });
            }
        })
    }

    return (
        <View style={styles.parent}>
            <Toaster />
            <Card>
                <Card.Title title={route.params.name} subtitle={String(route.params.stars).slice(0,3) + "⭐"}/>
                <Card.Cover source={{uri: `data:image/jpeg;base64,${route.params.image.trim()}`}}/>
                <Card.Content>
                    <Title>{route.params.location}</Title>
                </Card.Content>
            </Card>
            <View style={styles.wrapperInputForm}>
                <TextInput
                    left={
                        <TextInput.Icon
                            color="purple"
                            name="human"
                        />
                    }
                    value={fieldName}
                    editable={false}
                />

                <TextInput
                    left={
                        <TextInput.Icon
                            color="purple"
                            name="email"
                        />
                    }
                    value={fieldEmail}
                    editable={false}
                />

                <TextInput
                    left={
                        <TextInput.Icon
                            color="purple"
                            name="calendar"
                            onPress={() => showDatePicker()}
                        />
                    }
                    value={date.toDateString()}
                    editable={false}
                />
                <DateTimePickerModal
                    visible={isDatePickerVisible}
                    mode="date"
                    date={date}
                    onConfirm={handleConfirm}
                    label="Pick A Date"
                    onDismiss={hideDatePicker}
                />
                <DropDownPicker
                    style={styles.dropDownPicker}
                    open={open}
                    placeholder={"Choose the appropiate interval"}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    multiple={false}
                />

                <InputSpinner
                    max={10}
                    min={1}
                    step={1}
                    value={spinnerValue}
                    width={250}
                    skin={"paper"}
                    color="purple"
                    background={"#e7e7e7"}
                    onChange={(newValue) => setSpinnerValue(newValue)}
                />
                <Button
                    color='purple'
                    title={"Book Now"}
                    onPress={bookReservation}
                />
            </View>
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

});
