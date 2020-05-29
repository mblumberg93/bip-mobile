import React from "react";
import { SafeAreaView, Text } from "react-native";
import { usePubNub } from "pubnub-react";

export const OpponentsTurnScreen = ({ navigation }) => {
    const pubnub = usePubNub();
    
    return (
        <SafeAreaView>
            <Text>TEST</Text>
        </SafeAreaView>
    );
};