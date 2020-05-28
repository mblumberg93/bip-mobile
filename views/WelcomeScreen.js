import React from "react";
import { SafeAreaView } from "react-native";
import GameForm from '../components/GameForm';

export const WelcomeScreen = ({ navigation }) => {
    const handleCreate = (name) => {
        navigation.navigate("Creator", { name: name });
    }

    const handleJoin = (name, code) => {
        const gameChannel = "game-" + code;
        navigation.navigate("Start", { name: name, gameChannel: gameChannel, isJoiner: true });
    }

    return (
        <SafeAreaView>    
            <GameForm onCreate={handleCreate}
                      onJoin={handleJoin}>
            </GameForm>
        </SafeAreaView>
    );
};