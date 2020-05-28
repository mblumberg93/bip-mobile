import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { usePubNub } from "pubnub-react";
import { GameEvents } from '../constants';

export const StartScreen = ({ route, navigation }) => {
    const pubnub = usePubNub();
    const isJoiner = route.params.isJoiner;
    const [displayStartOptions, setDisplayStartOptions] = useState((isJoiner ? false : true))

    //TODO - move into redux store
    const [name, setName] = useState(route.params.name);
    const [opponentName, setOpponentName] = useState((isJoiner ? '' : route.params.opponentName));
    const [gameChannel, setGameChannel] = useState(route.params.gameChannel);
    const [UUID, setUUID] = useState((route.params.name + "-" + route.params.gameChannel));

    useEffect(() => {
        if (pubnub) {
            pubnub.setUUID(UUID);
    
            const listener = {
              message: envelope => {
                if (envelope.message.content.event == GameEvents.CreatorEnteringGame && isJoiner) {
                    setOpponentName(envelope.message.content.name);
                    setDisplayStartOptions(true);
                }
              }
            };
      
            pubnub.addListener(listener);
            pubnub.subscribe({ channels: [gameChannel] });

            if (isJoiner) {
                const message = {
                    content: {
                        event: GameEvents.JoinerEnteringGame,
                        name: name
                    },
                    id: Math.random().toString(16).substr(2)
                };
                pubnub.publish({ channel: gameChannel, message });
            }
    
            return () => {
                pubnub.unsubscribeAll();
            };
        }
    }, [pubnub]);

    return (
        <SafeAreaView>
            <View style={styles.screenContainer}>
                <Text style={styles.standardText}>Welcome {name}!</Text>
                { !displayStartOptions &&
                    <Text style={styles.standardText}>Waiting For Your Opponent To Join The Game...</Text>
                }
                { displayStartOptions && 
                    <Text style={styles.standardText}>Your opponent is {opponentName}</Text>
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    standardText: {
        textAlign: "center",
        marginTop: 15,
        marginBottom: 15,
        fontSize: 20,
        fontWeight: "bold"
    }
});
