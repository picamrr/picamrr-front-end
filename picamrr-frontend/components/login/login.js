import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    Pressable,
} from "react-native";
import styles from "./styles";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    withTiming,
    withDelay,
    runOnJS,
    withSequence,
    withSpring
} from "react-native-reanimated";
import {getRestaurants} from "../../services/APIRequests";
import {setToken} from "../../services/SecureStorage";

export default function Login({navigation}) {
    const { height, width } = Dimensions.get("window");
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [restaurants, setRestaurants] = useState([])
    useEffect( () => {
        async function updateToken() {
            await setToken(Buffer.from(email + ":" + password).toString('base64'))
        }
        updateToken();
    }, [email, password]);
    useEffect(() => {
        console.log("updated restaurants");
        if (restaurants.length > 0) {
            navigation.navigate("Home", {restaurants: restaurants});
        }
    }, [restaurants])
    const imagePosition = useSharedValue(1);
    const formButtonScale = useSharedValue(1);
    const [isRegistering, setIsRegistering] = useState(false);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(
            imagePosition.value,
            [0, 1],
            [-height / 2, 0]
        );
        return {
            transform: [
                { translateY: withTiming(interpolation, { duration: 1000 }) },
            ],
        };
    });

    const buttonsAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
        return {
            opacity: withTiming(imagePosition.value, { duration: 500 }),
            transform: [
                { translateY: withTiming(interpolation, { duration: 1000 }) },
            ],
        };
    });

    const closeButtonContainerStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
        return {
            opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
            transform: [
                { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
            ],
        };
    });

    const formAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity:
                imagePosition.value === 0
                    ? withDelay(400, withTiming(1, { duration: 800 }))
                    : withTiming(0, { duration: 300 }),
        };
    });

    const formButtonAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{scale: formButtonScale.value}]
        }
    })

    const loginHandler = () => {
        imagePosition.value = 0;
        if (isRegistering) {
            runOnJS(setIsRegistering)(false);
        }
    };

    const registerHandler = () => {
        imagePosition.value = 0;
        if (!isRegistering) {
            runOnJS(setIsRegistering)(true);
        }
    };

    const onLoginButtonClick =  () =>
        getRestaurants().then((data) =>{ if (data) setRestaurants(data)}).catch((error) => console.log("nu e bine"));

    return (
        <Animated.View style={styles.container}>
            <Animated.View style={[{position: "absolute", left:0, right:0,top: 0}, imageAnimatedStyle]}>
                <Svg height={height + 100} width={width + 100}>
                    <ClipPath id="clipPathId">
                        <Ellipse cx={width / 2} rx={height + 100} ry={height + 100} />
                    </ClipPath>
                    <Image
                        href={require("../../images/login-background.jpg")}
                        width={width + 100}
                        height={height + 100}
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="url(#clipPathId)"
                    />
                </Svg>
                <Animated.View
                    style={[styles.closeButtonContainer, closeButtonContainerStyle]}
                >
                    <Text onPress={() => (imagePosition.value = 1)}>X</Text>
                </Animated.View>
            </Animated.View>
            <View style={styles.bottomContainer}>
                <Animated.View style={buttonsAnimatedStyle}>
                    <Pressable style={styles.button} onPress={loginHandler}>
                        <Text style={styles.buttonText}>LOG IN</Text>
                    </Pressable>
                </Animated.View>
                <Animated.View style={buttonsAnimatedStyle}>
                    <Pressable style={styles.button} onPress={registerHandler}>
                        <Text style={styles.buttonText}>REGISTER</Text>
                    </Pressable>
                </Animated.View>
                <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="black"
                        style={styles.textInput}
                        onChangeText={newText => setEmail(newText)}
                    />
                    {isRegistering && (
                        <TextInput
                            placeholder="Full Name"
                            placeholderTextColor="black"
                            style={styles.textInput}
                        />
                    )}
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="black"
                        style={styles.textInput}
                        onChangeText={newText => setPassword(newText)}
                    />
                    <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
                        <Pressable onPress={() => {formButtonScale.value = withSequence(withSpring(1.5), withSpring(1));
                            onLoginButtonClick();
                        }}>
                            <Text style={styles.buttonText}>
                                {isRegistering ? "REGISTER" : "LOG IN"}
                            </Text>
                        </Pressable>
                    </Animated.View>
                </Animated.View>
            </View>
        </Animated.View>
    );
}
