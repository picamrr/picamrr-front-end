import React, {useState} from "react";
import {Text, StyleSheet, View, Button, Pressable} from 'react-native';
import {Card, Title} from "react-native-paper";
import InputSpinner from "react-native-input-spinner";
import "../css/reservation-form.css";
import {DateTimePickerModal} from 'react-native-paper-datetimepicker';
import {TextInput} from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker';
import {addReservation} from "../services/APIRequests";

const loggedUser = {
    id: 1,
    name: "Popescu Ion",
    email: "popescuion@gmail.com",
}

export default function ReservationForm({navigation, route}) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [value, setValue] = useState([]);
    const [spinnerValue, setSpinnerValue] = useState(1);
    const [items, setItems] = useState(getItems(route.params.availableSeatsPerInterval));
    const restaurantId = route.params.id;

    function getItems(availableSeatsPerInterval) {
        let items = [];
        let jsonData = {}
        availableSeatsPerInterval.forEach(function(a) {
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

    function bookReservation() {
        addReservation(restaurantId, date, spinnerValue, value).then(r => console.log(r));
    }

    return (
        <View style={styles.parent}>
            <Card>
                <Card.Title title={route.params.name} subtitle={route.params.stars + "⭐"}/>
                <Card.Cover source={{uri: route.params.image}}/>
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
                    value={loggedUser.name}
                    editable={false}
                />

                <TextInput
                    left={
                        <TextInput.Icon
                            color="purple"
                            name="email"
                        />
                    }
                    value={loggedUser.email}
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
                    value={date.toLocaleString()}
                    editable={false}
                />
                <DateTimePickerModal
                    visible={isDatePickerVisible}
                    mode='date'
                    date={date}
                    onConfirm={handleConfirm}
                    label="Pick A Date"
                    onDismiss={hideDatePicker}
                />
                <DropDownPicker
                    style={styles.dropDownPicker}
                    open={open}
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
                />
                <Button
                    color='purple'
                    title={"Book Now"}
                    onPress={() => {
                        bookReservation();
                        navigation.navigate('Home')
                    }}
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
