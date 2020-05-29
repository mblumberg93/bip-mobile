import React from "react";
import { SafeAreaView, Text } from "react-native";
import { usePubNub } from "pubnub-react";
import OpponentRack  from "../components/OpponentRack";

export const OpponentsTurnScreen = ({ navigation }) => {
    const pubnub = usePubNub();
    
    return (
        <SafeAreaView>
            <OpponentRack pubnub={pubnub}></OpponentRack>
        </SafeAreaView>
    );
};