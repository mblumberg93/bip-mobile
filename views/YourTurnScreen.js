import React from "react";
import { SafeAreaView } from "react-native";
import { usePubNub } from "pubnub-react";
import YourRack from '../components/YourRack';

export const YourTurnScreen = ({ navigation }) => {
    const pubnub = usePubNub();
    
    return (
        <SafeAreaView>
            <YourRack></YourRack>
        </SafeAreaView>
    );
};