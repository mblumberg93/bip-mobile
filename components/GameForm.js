import React, { Component } from 'react';
import { Input, Button, Divider } from 'react-native-elements'
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { updateGame } from "../actions/index";
import { firebaseDB } from '../services/firebase';
import { GameEvents } from '../constants';

function mapDispatchToProps(dispatch) {
    return {
        updateGame: updates => dispatch(updateGame(updates))
    };
}

class ConnectedGameForm extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            name: '',
            code: '',
            nameError: false,
            codeError: false
        }
    }

    handleNameChange(e) {
        this.setState({ name: e, nameError: false });
    }

    handleCodeChange(e) {
        this.setState({ code: e, codeError: false });
    }

    handleCreate() {
        if (this.state.name) {
            const code = this.generateCode();
            const gameChannel = "game-" + code;
            const UUID = this.state.name + "-" + gameChannel;
            const gameDB = "games/game-" + code;
            this.props.updateGame({ name: this.state.name, code: code, gameChannel: gameChannel, UUID: UUID, gameDB: gameDB });
            const msg = {
                event: GameEvents.CreateGame,
                player: this.state.name,
                timestamp: Date.now()
            };
            firebaseDB.ref(gameDB).push(msg);
            this.props.onCreate(this.state.name);
        } else {
            this.setState({ nameError: true });
        }
    }

    handleJoin() {
        if (this.state.name && this.state.code) {
            const gameChannel = "game-" + this.state.code;
            const UUID = this.state.name + "-" + gameChannel;
            const gameDB = "games/game-" + this.state.code;
            this.props.updateGame({ name: this.state.name, code: this.state.code, gameChannel: gameChannel, UUID: UUID, gameDB: gameDB });
            const msg = {
                event: GameEvents.JoinGame,
                player: this.state.name,
                timestamp: Date.now()
            }
            firebaseDB.ref(gameDB).push(msg);
            this.props.onJoin(this.state.name, gameChannel);
        } else if (this.state.name && !this.state.code) {
            this.setState({ codeError: true });
        } else if (!this.state.name && this.state.code) {
            this.setState({ nameError: true });
        } else {
            this.setState({ nameError: true, codeError: true })
        }
    }

    generateCode() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    render() {
        return (
            <View style={styles.formContainer}>
                <Text style={styles.header}>Step 1: Enter Team Name</Text>
                <Input label="Team Name" 
                       onChangeText={(e) => this.handleNameChange(e)}
                       containerStyle={{ marginBottom: 20 }}
                       errorMessage={this.state.nameError ? "Team Name is required" : null }
                       renderErrorMessage={this.state.nameError}>
                </Input>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 30, marginTop: 10}}>
                    Step 2: Create A Game or Join A Game
                </Text>
                <Button title="Create" 
                        buttonStyle={{ marginBottom: 15 }}
                        onPress={() => this.handleCreate()}>
                </Button>
                <Divider style={{ marginTop: 30, marginBottom: 30 }} />
                <Input label="Game Code" 
                       onChangeText={(e) => this.handleCodeChange(e)}
                       containerStyle={{ marginBottom: 20 }}
                       errorMessage={this.state.codeError ? "Game Code is required to join game" : null }
                       renderErrorMessage={this.state.codeError}>
                </Input>
                <Button title="Join" 
                        buttonStyle={{ marginBottom: 15 }}
                        onPress={() => this.handleJoin()}>
                </Button>
            </View>
        )
    }
};

const GameForm = connect(null,mapDispatchToProps)(ConnectedGameForm);

export default GameForm;

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 30,
        marginTop: 10
    },
    formContainer: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15
    }
});