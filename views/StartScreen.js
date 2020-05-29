import React from "react";
import { SafeAreaView } from "react-native";
import ChooseStart from "../components/ChooseStart";
import { usePubNub } from "pubnub-react";

export const StartScreen = ({ route, navigation }) => {
    const pubnub = usePubNub();

    const handleYouStart = () => {
        navigation.navigate("Your Turn", { });
    }

    const handleOpponentStart = () => {
        navigation.navigate("Opponents Turn", { });
    }
    
    return (
        <SafeAreaView>
            <ChooseStart isJoiner={route.params.isJoiner}
                         pubnub={pubnub}
                         onYouStart={handleYouStart}
                         onOpponentStart={handleOpponentStart}></ChooseStart>
        </SafeAreaView>
    );
};