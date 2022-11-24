import React, {useState} from "react";
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import {Card, Title} from "react-native-paper";
import InputSpinner from "react-native-input-spinner";
import "../css/reservation-form.css";
import { DateTimePickerModal } from 'react-native-paper-datetimepicker';
import {StatusBar} from "expo-status-bar";
//import Toast from 'react-native-simple-toast';


const loggedUser = {
    id: 1,
    name: "Popescu Ion",
    email: "popescuion@gmail.com",
}

export default function ReservationForm({navigation, route}) {
    const [currency, setCurrency] = useState('US Dollar');
    const [mydate, setDate] = useState(new Date());
    const [displaymode, setMode] = useState('date');
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const onDismiss = React.useCallback(() => {
        setIsDatePickerVisible(false);
    }, []);

    const onChange = React.useCallback(({ date }) => {
        console.log({ date });
        setIsDatePickerVisible(false);
    }, []);

    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();
    };

    return(
        <View style={styles.parent}>
            <Card>
                <Card.Title title = {route.params.name} subtitle ={route.params.stars + "⭐"} />
                <Card.Cover source={{ uri: route.params.image }} />
                <Card.Content>
                    <Title>{route.params.location}</Title>
                </Card.Content>
            </Card>
            <View style={styles.wrapperInputForm}>
                <Text> Email: </Text>
                <TextInput
                    placeholder={loggedUser.email} />
                <Text> Name: </Text>
                <TextInput
                    placeholder={loggedUser.name} />
            <DateTimePickerModal
                visible={isDatePickerVisible}
                date={mydate}
                mode="datetime"
                onConfirm={handleConfirm}
                label="Pick A Date"
                onDismiss={hideDatePicker}
            />
            <Text onPress={() => showDatePicker()}>{mydate.toLocaleString()}</Text>
            <InputSpinner
                max={10}
                min={1}
                step={1}
                colorMax={"#f04048"}
                colorMin={"#40c5f4"}
                value={1}
                width={350}
                skin={"clean"}
                onChange={(num) => {
                    console.log(num);
                }} />
            <Button title={"Book Now"} onPress = {() => {/*Toast.show("Your booking is complete!", Toast.LONG); */navigation.navigate('Home')}}/>
            </View>
            </View>
    );
}

const styles = StyleSheet.create({
    parent: {
        flex:1
    },
    wrapperInputForm: {
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItems: "center",
        flex:1
    }
});