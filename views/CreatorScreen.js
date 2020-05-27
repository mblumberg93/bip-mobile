import React, { useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Clipboard } from "react-native";
import { usePubNub } from "pubnub-react";

export const CreatorScreen = ({ route, navigation }) => {
    const pubnub = usePubNub();
    const name = route.params.name;
    const code = generateCode();
    const gameChannel = "game-" + code;
    const UUID = "name-" + gameChannel;

    function generateCode() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 6; i++) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // First we need to set our PubNub UUID and subscribe to chat channel.
    // We will use `useEffect` hook for that.
    useEffect(() => {
    // We need to make sure that PubNub is defined
    if (pubnub) {
      // Set the UUID of our user to their chosen emoji
      pubnub.setUUID(UUID);

      // Create a listener that will push new messages to our `messages` variable
      // using the `setMessages` function.
      const listener = {
        message: envelope => {
          setMessages(msgs => [
            ...msgs,
            {
              id: envelope.message.id,
              author: envelope.publisher,
              content: envelope.message.content,
              timetoken: envelope.timetoken
            }
          ]);
        }
      };

      // Add the listener to pubnub instance and subscribe to `chat` channel.
      pubnub.addListener(listener);
      pubnub.subscribe({ channels: ["gameChannel"] });

      // We need to return a function that will handle unsubscription on unmount
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