import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Clipboard } from "react-native";
import { GameEvents } from '../constants';
import { connect } from "react-redux";
import { updateGame } from "../actions/index";

function mapDispatchToProps(dispatch) {
    return {
        updateGame: updates => dispatch(updateGame(updates))
    };
}

function mapStateToProps(state) {
    return state ;
};

class ConnectedCodeDisplay extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.pubnub) {
            this.props.pubnub.setUUID(this.props.UUID);
      
            const listener = {
              message: envelope => {
                if (envelope.message.content.event == GameEvents.JoinerEnteringGame) {
                  const message = {
                    content: {
                        event: GameEvents.CreatorEnteringGame,
                        name: this.props.name
                    },
                    id: Math.random().toString(16).substr(2)
                  };
                  
                  this.props.pubnub.publish({ channel: this.props.gameChannel, message });
                  this.props.updateGame({opponentName: envelope.message.content.name});
                  this.props.goToStart();
                }
              }
            };
      
            this.props.pubnub.addListener(listener);
            this.props.pubnub.subscribe({ channels: [this.props.gameChannel] });
        }
    }

    componentWillUnmount() {
        if (this.props.pubnub) {
            this.props.pubnub.unsubscribeAll();
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.codeText}>Welcome {this.props.name}</Text>
                <Text style={styles.codeText}>Share This Code With Your Opponent</Text>
                <Text style={styles.codeText}>{this.props.code}</Text>
                <TouchableOpacity onPress={() => Clipboard.setString(this.props.code)}>
                    <Text style={[styles.codeText, { color: "blue" }]}> 
                        Copy Code To Clipboard
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const CodeDisplay = connect(mapStateToProps, mapDispatchToProps)(ConnectedCodeDisplay);

export default CodeDisplay;

const styles = StyleSheet.create({
    codeText: {
        textAlign: "center",
        marginTop: 15,
        marginBottom: 15,
        fontSize: 20,
        fontWeight: "bold"
    }
});