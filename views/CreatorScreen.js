import React from "react";
import { SafeAreaView } from "react-native";
import CodeDisplay from "../components/CodeDisplay";

export const CreatorScreen = ({ navigation }) => {
  const goToStart = () => {
    navigation.navigate("Start", {});
  }

  return (
      <SafeAreaView> 
        <CodeDisplay goToStart={goToStart}></CodeDisplay>
      </SafeAreaView>
  );
};