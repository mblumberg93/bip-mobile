import React, { useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Clipboard } from "react-native";
import { usePubNub } from "pubnub-react";
import { GameEvents } from '../constants';

export const CreatorScreen = ({ route, navigation }) => {
  const pubnub = usePubNub();
  const name = route.params.name;
  const code = generateCode();
  const gameChannel = "game-" + code;
  const UUID = name + "-" + gameChannel;

  function generateCode() {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < 6; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

  useEffect(() => {
    if (pubnub) {
      pubnub.setUUID(UUID);

      const listener = {
        message: envelope => {
          if (envelope.message.content.event == GameEvents.JoinerEnteringGame) {
            const message = {
              content: {
                  event: GameEvents.CreatorEnteringGame,
                  name: name
              },
              id: Math.random().toString(16).substr(2)
            };

            navigation.navigate("Start", { name: name, gameChannel: gameChannel, opponentName: envelope.message.content.name });
            pubnub.publish({ channel: gameChannel, message });
          }
        }
      };

      pubnub.addListener(listener);
      pubnub.subscribe({ channels: [gameChannel] });

      return () => {
        pubnub.removeListener(listener);
        pubnub.unsubscribeAll();
      };
    }
  }, [pubnub]);

  return (
      <SafeAreaView> 
          <Text style={styles.codeText}>Welcome {name}</Text>
          <Text style={styles.codeText}>Share This Code With Your Opponent</Text>
          <Text style={styles.codeText}>{code}</Text>
          <TouchableOpacity onPress={() => Clipboard.setString(code)}>
              <Text style={[styles.codeText, { color: "blue" }]}> 
                  Copy Code To Clipboard
              </Text>
          </TouchableOpacity>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    codeText: {
        textAlign: "center",
        marginTop: 15,
        marginBottom: 15,
        fontSize: 20,
        fontWeight: "bold"
    }
})