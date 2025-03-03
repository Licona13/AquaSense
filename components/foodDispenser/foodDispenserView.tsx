import { StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";


export default function FoodDispenserView(){
    return(
        <View style={styles.container}>
           <Text style={styles.title}>Dispensador de comida</Text>
           <View style={styles.form}>
            <TextInput 
            style={styles.input}
            placeholder="Ingresa el lapzo de timempo"
            placeholderTextColor={"white"}
            />
            <TextInput 
            style={styles.input}
            placeholder="Ingresa la cantidad de comida"
            placeholderTextColor={"white"}
            />
           </View>
           <View style={styles.containerBtn}>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Enviar</Text>
            </TouchableOpacity>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:"center", 
        backgroundColor:"#1a1a2e",
        flex:1
    },
    title: {
        color:"white", 
        fontSize:30,
        fontWeight:"bold",
    },
    form: {
        marginTop:20,
        width:"90%",
        height:120,
        // borderWidth:1,
        alignItems:"center",
    },
    input: {
        marginTop:10,
        marginBottom:10,
        width:"80%",
        height:40,
        borderColor:"white",
        borderWidth:1,
        borderRadius:10,
        paddingLeft:10,
    },
    containerBtn: {
        marginTop:20,
        alignItems:"center",
        width:"90%",
        height:"auto",
        padding:10,
        // borderWidth:1,
        // borderColor:"white",
    },
    btn: {
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"blue",
        width:"35%",
        height:35,
        borderWidth:1,
        borderTopWidth:1,
        borderRadius:10,
    },
    btnText: {
        color:"white",
        fontWeight:"bold",
        fontSize:20,
    },
})