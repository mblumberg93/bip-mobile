import React from "react";
import { SafeAreaView } from "react-native";
import { usePubNub } from "pubnub-react";
import YourRack from '../components/YourRack';

export const YourTurnScreen = ({ navigation }) => {
    const pubnub = usePubNub();

    const handleEndTurn = () => {
        navigation.navigate("Opponents Turn", {});
    }
    
    return (
        <SafeAreaView>
            <YourRack pubnub={pubnub}
                      onEndTurn={handleEndTurn}>
            </YourRack>
        </SafeAreaView>
    );
};