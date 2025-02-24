import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function AboutView() {
    return (
        <ImageBackground style={styles.fondo} source={require("../../assets/images/fondo.jpg")}>
            <View style={styles.overlay}>
                <Text style={styles.title}>Acerca de</Text>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        Esta App fue creada con ayuda de tecnologías como React Native y Supabase para crear esta experiencia.
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        width: "100%",
        height:"100%",
        alignItems: "center",
        justifyContent: "center",
    },
    overlay: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)", 
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 42,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        marginBottom: 20,
    },
    container: {
        width: "90%",
        padding: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#fff",
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparente para más estilo
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
    },
    university: {
        fontWeight: "bold",
        color: "#ffcc00",
    },
});
