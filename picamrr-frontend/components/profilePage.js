import { Card } from "react-native-paper";
import { StyleSheet, View, Pressable, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import TextField from '@material-ui/core/TextField';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { getToken } from "../services/SecureStorage";
import { getUserByEmail, updateUser } from "../services/APIRequests";
import { Toaster, toast } from 'react-hot-toast'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        alignItems: "center"
    },
    card: {
        borderRadius: 10,
        margin: 10,
        marginTop: 30,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center'
    },
    button: {
        marginTop: 30,
        backgroundColor: '#03fc0f',
        height: 55,
        width: 85,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0.5
    }
});

export default function Profile({ navigation }) {

    const [isEditable, setIsEditable] = useState(false);
    const [fieldName, setFieldName] = useState("");
    const [fieldPhone, setFieldPhone] = useState("");
    const [fieldEmail, setFieldEmail] = useState("");

    useEffect(() => {
        const getUser = async () => {
            await getToken().then(async (encodedString) => {
                const emailOfUser = atob(encodedString).split(':')[0];
                await getUserByEmail(emailOfUser).then(user => {
                    setFieldEmail(user.email);
                    setFieldPhone(user.phoneNumber);
                    setFieldName(user.name);
                });
            });
        }
        getUser();
    }, [])

    const handleSaveBtnClick = async () => {
        await updateUser(fieldEmail, fieldName, fieldPhone).then(response => {
            if (response.status === 200) {
                toast.success("Profile edited successfully!", { position: "bottom-center" });
                setIsEditable(!isEditable);
                return 1;
            }
            return response.json();
        }).then(response => {
            if (response !== 1) {
                toast.error(response.message, { position: "bottom-center" });
            }
        })
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === 'name') {
            setFieldName(value);
        }
        if (id === 'phone') {
            setFieldPhone(value);
        }
    }

    return (
        <View style={styles.container}>
            <Toaster />
            <div>
                <Icon style={{ marginTop: '25%' }} name="ios-person" size={80} />
                <h4 style={{ marginTop: '55%' }}>Edit profile</h4>

                <div style={{ display: isEditable ? 'block' : 'none' }}>
                    <TouchableOpacity style={{ marginLeft: '25%' }} onPress={() => setIsEditable(!isEditable)}>
                        <Icon name="ios-close-circle" size={30} />
                    </TouchableOpacity>
                </div>
                <div style={{ display: isEditable ? 'none' : 'block' }}>
                    <TouchableOpacity style={{ marginLeft: '25%' }} onPress={() => setIsEditable(!isEditable)}>
                        <Icon name="ios-pencil" size={30} />
                    </TouchableOpacity>
                </div>
            </div>
            <Card style={styles.card}>
                <Card.Content style={{ display: 'flex' }}>
                    <View>
                        <TextField
                            id="name"
                            label="Name"
                            value={fieldName}
                            disabled={!isEditable}
                            onChange={(e) => handleInputChange(e)}
                        />
                        <TextField
                            style={{ marginTop: '10%' }}
                            id="email"
                            label="Email"
                            value={fieldEmail}
                            disabled={true}

                        />
                        <TextField
                            style={{ marginTop: '10%' }}
                            id="phone"
                            label="Phone"
                            value={fieldPhone}
                            disabled={!isEditable}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </View>
                </Card.Content>
            </Card>
            <div style={{ display: isEditable ? 'block' : 'none' }}>
                <Pressable style={styles.button} onPress={handleSaveBtnClick}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
            </div>

        </View>);
}