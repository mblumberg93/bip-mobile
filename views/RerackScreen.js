import React from "react";
import { SafeAreaView } from "react-native";
import SelectRack from '../components/SelectRack';

export const RerackScreen = ({ navigation }) => {
    const handleChooseRack = () => {
        navigation.navigate("Your Turn", {});
    }

    const handleCancel = () => {
        navigation.navigate("Your Turn", {});
    }
    
    return (
        <SafeAreaView>
            <SelectRack onChooseRack={handleChooseRack}
                        onCancel={handleCancel}>
            </SelectRack>
        </SafeAreaView>
    );
};