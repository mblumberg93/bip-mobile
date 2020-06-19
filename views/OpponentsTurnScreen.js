import React from "react";
import { SafeAreaView, Text } from "react-native";
import OpponentRack  from "../components/OpponentRack";

export const OpponentsTurnScreen = ({ navigation }) => {
    const handleStartTurn = () => {
        navigation.navigate("Your Turn", {});
    }

    const handleQuit = () => {
        navigation.navigate("Welcome", {});
    }
    
    return (
        <SafeAreaView>
            <OpponentRack onStartTurn={handleStartTurn}
                          onQuit={handleQuit}>
            </OpponentRack>
        </SafeAreaView>
    );
};