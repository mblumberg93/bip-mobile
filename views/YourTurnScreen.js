import React from "react";
import { SafeAreaView } from "react-native";
import YourRack from '../components/YourRack';

export const YourTurnScreen = ({ navigation }) => {
    const handleRerack = () => {
        navigation.navigate("Rerack", {});
    }

    const handleEndTurn = () => {
        navigation.navigate("Opponents Turn", {});
    }
    
    return (
        <SafeAreaView>
            <YourRack onRerack={handleRerack}
                      onEndTurn={handleEndTurn}>
            </YourRack>
        </SafeAreaView>
    );
};