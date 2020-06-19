import React from "react";
import { SafeAreaView, Text } from "react-native";
import OpponentRack  from "../components/OpponentRack";

export const OpponentsTurnScreen = ({ navigation }) => {
    const handleStartTurn = () => {
        navigation.navigate("Your Turn", {});
    }
    
    return (
        <SafeAreaView>
            <OpponentRack onStartTurn={handleStartTurn}>
            </OpponentRack>
        </SafeAreaView>
    );
};