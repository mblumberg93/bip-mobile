import React from "react";
import { SafeAreaView } from "react-native";
import GameForm from '../components/GameForm';

export const WelcomeScreen = ({ route }) => {
    return (
        <SafeAreaView>    
            <GameForm></GameForm>
        </SafeAreaView>
    );
};