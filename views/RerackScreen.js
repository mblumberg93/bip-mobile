import React from "react";
import { SafeAreaView } from "react-native";
import { usePubNub } from "pubnub-react";
import SelectRack from '../components/SelectRack';

export const RerackScreen = ({ navigation }) => {
    const pubnub = usePubNub();

    const handleChooseRack = () => {
        navigation.navigate("Your Turn", {});
    }

    const handleCancel = () => {
        navigation.navigate("Your Turn", {});
    }
    
    return (
        <SafeAreaView>
            <SelectRack pubnub={pubnub}
                      onChooseRack={handleChooseRack}
                      onCancel={handleCancel}>
            </SelectRack>
        </SafeAreaView>
    );
};