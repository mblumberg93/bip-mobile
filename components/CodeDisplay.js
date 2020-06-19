import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Clipboard } from "react-native";
import { GameEvents } from '../constants';
import { connect } from "react-redux";
import { updateGame } from "../actions/index";
import { firebaseDB } from '../services/firebase';

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
        firebaseDB.ref(this.props.gameDB).limitToLast(1).on("child_added", msg => {
            const message = msg.val();
            if (message.player === this.props.name) {
                return;
            }
            if (message.event == GameEvents.JoinerEnteringGame) {
                const newMsg = {
                    event: GameEvents.CreatorEnteringGame,
                    player: this.props.name,
                    timestamp: Date.now()
                }
                firebaseDB.ref(this.props.gameDB).push(newMsg);
                this.props.updateGame({opponentName: message.player});
                this.props.goToStart();
            }
        });
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