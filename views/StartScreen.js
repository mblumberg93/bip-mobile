import React from "react";
import { SafeAreaView } from "react-native";
import ChooseStart from "../components/ChooseStart";
import { usePubNub } from "pubnub-react";

export const StartScreen = ({ route, navigation }) => {
    const pubnub = usePubNub();
    
    return (
        <SafeAreaView>
            <ChooseStart isJoiner={route.params.isJoiner}
                         pubnub={pubnub}></ChooseStart>
        </SafeAreaView>
    );
};