import { Text } from "react-native";
import { View } from "react-native";

export default function FoodDispenserView(){
    return(
        <View style={{alignItems:"center", backgroundColor:"#1a1a2e", flex:1}}>
           <Text style={{color:"white", fontSize:30,}}>Dispensador de comida</Text>
        </View>
    )
}
