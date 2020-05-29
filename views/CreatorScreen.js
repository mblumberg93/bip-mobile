import React from "react";
import { SafeAreaView } from "react-native";
import { usePubNub } from "pubnub-react";
import CodeDisplay from "../components/CodeDisplay";

export const CreatorScreen = ({ navigation }) => {
  const pubnub = usePubNub();

  const goToStart = () => {
    navigation.navigate("Start", {});
  }

  return (
      <SafeAreaView> 
        <CodeDisplay pubnub={pubnub}
                     goToStart={goToStart}></CodeDisplay>
      </SafeAreaView>
  );
};