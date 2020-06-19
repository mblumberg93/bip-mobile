import React from "react";
import { SafeAreaView } from "react-native";
import ChooseStart from "../components/ChooseStart";

export const StartScreen = ({ route, navigation }) => {
    const handleYouStart = () => {
        navigation.navigate("Your Turn", { });
    }

    const handleOpponentStart = () => {
        navigation.navigate("Opponents Turn", { });
    }
    
    return (
        <SafeAreaView>
            <ChooseStart isJoiner={route.params.isJoiner}
                         onYouStart={handleYouStart}
                         onOpponentStart={handleOpponentStart}></ChooseStart>
        </SafeAreaView>
    );
};