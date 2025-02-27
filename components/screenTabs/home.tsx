import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";

export default function Home(){
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Esta es la pantalla principal</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1a1a2e",
        flex:1,
    },
    text1: {
        color:"white",
        fontSize:30,
        textAlign:"center"
    }
})