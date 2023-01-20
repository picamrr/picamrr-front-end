import {Button, Card, Searchbar, Title} from "react-native-paper";
import {Dimensions, FlatList, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import {StatusBar} from "expo-status-bar";
import {SearchBar} from "react-native-elements";

const deviceWidth = Math.round(Dimensions.get('window').width);


export default function Home({ navigation, route }) {
    const [data, setData] = useState(route.params.restaurants);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [displayedData, setDisplayedData] = useState(route.params.restaurants);

    const renderItem = ({ item }) => {
        return (
            <Card style={styles.card}
                  onPress={() => navigation.navigate('ReviewsPage', {id: item.id, name: item.name,
                      image: item.image, location: item.location, stars: item.stars, availableSeatsPerInterval: item.availableSeatsPerInterval,})}>
                <Card.Title titleStyle={styles.title} subtitleStyle={styles.subtitle}
                            title = {item.name}
                            subtitle ={String(item.stars).slice(0,3) + "⭐"} />
                <Card.Cover source={ {uri:`data:image/jpeg;base64,${item.image.trim()}`}} />
                <Card.Content>
                    <Title style={styles.address_phone}>{"📍" + item.address}</Title>
                    <Title style={styles.address_phone}>{"📞" + item.phoneNumber}</Title>
                </Card.Content>
            </Card>
        )
    }

    function searchRestaurants(query) {
        if (searchQuery === "") {
            setDisplayedData(data);
        } else {
            setDisplayedData(data.filter(d => d.name.toLowerCase().startsWith(query.toLowerCase())));
        }
    }

    const onChangeSearch = query => {
        setSearchQuery(query);
        searchRestaurants(query);
    }

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />

            <FlatList
                data={displayedData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>);
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
        fontSize: 25,
        fontFamily: "FontFamily",
        fontWeight:'600',
        lineHeight: 24,
    },
    subtitle: {
        fontSize: 15,
        fontWeight:'500',
    },
    address_phone:{
        fontSize: 20,
        fontFamily: "FontFamily",
    },
    card: {
        width: deviceWidth - 25,
        borderRadius: 10,
        margin: 10,
        marginTop: 2,
        shadowColor:'#000',
        shadowOffset: {
            width: 5,
            height:5,
        },
        shadowOpacity:0.5,
        shadowRadius: 5,
        elevation: 9
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor:'#000',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 4,
        shadowRadius: 5,
        elevation: 3,
        backgroundColor: 'rgba(123,104,238,0.8)',
    },
});
