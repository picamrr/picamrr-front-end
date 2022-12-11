import styles from './styles';
import {Dimensions, View, Text} from "react-native";
import Svg, {Image} from 'react-native-svg';

export default function Login() {
    const {height, width} = Dimensions.get('window')
    console.log(height, width)
    return (
        <View style = {styles.container}>
            <View style={StyleSheet.absoluteFill}>
                <Svg height={height} width={width}>
                    <Image href={require('../../images/login-background.jpg')}
                           width = {width}
                           height={height}
                           preserveAspectRatio={"xMidYMid slice"}
                    />
                </Svg>
            </View>
            <View>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>LOG IN</Text>
                </View>
            </View>
            <View>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>LOG IN</Text>
                </View>
            </View>
        </View>
    )
}