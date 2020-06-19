import React from "react";
import { SafeAreaView } from "react-native";
import GameForm from '../components/GameForm';

export const WelcomeScreen = ({ navigation }) => {
    const handleCreate = () => {
        navigation.navigate("Creator", {});
    }

    const handleJoin = () => {
        navigation.navigate("Start", { isJoiner: true });
    }

    return (
        <SafeAreaView>    
            <GameForm onCreate={handleCreate}
                      onJoin={handleJoin}>
            </GameForm>
        </SafeAreaView>
    );
};