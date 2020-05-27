import React, { Component } from 'react';
import { Input, Button, Divider } from 'react-native-elements'
import { View, StyleSheet, Text } from "react-native";

class GameForm extends Component {
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
            this.props.onCreate(this.state.name)
        } else {
            this.setState({ nameError: true });
        }
    }

    handleJoin() {
        if (this.state.name && this.state.code) {
            this.props.onJoin(this.state.name, this.state.code);
        } else if (this.state.name && !this.state.code) {
            this.setState({ codeError: true });
        } else if (!this.state.name && this.state.code) {
            this.setState({ nameError: true });
        } else {
            this.setState({ nameError: true, codeError: true })
        }
    }

    render() {
        return (
            <View style={styles.formContainer}>
                <Text style={styles.header}>Step 1: Enter Team Name</Text>
                <Input label="Team Name" 
                       onChangeText={(e) => this.handleNameChange(e)}
                       containerStyle={styles.input}
                       errorMessage={this.state.nameError ? "Team Name is required" : null }
                       renderErrorMessage={this.state.nameError}>
                </Input>
                <Text style={styles.header}>Step 2: Create A Game or Join A Game</Text>
                <Button title="Create" 
                        buttonStyle={styles.button}
                        onPress={() => this.handleCreate()}>
                </Button>
                <Divider style={styles.divider} />
                <Input label="Game Code" 
                       onChangeText={(e) => this.handleCodeChange(e)}
                       containerStyle={styles.input}
                       errorMessage={this.state.codeError ? "Game Code is required to join game" : null }
                       renderErrorMessage={this.state.codeError}>
                </Input>
                <Button title="Join" 
                        buttonStyle={styles.button}
                        onPress={() => this.handleJoin()}>
                </Button>
            </View>
        )
    }
};

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
    },
    input: {
        marginBottom: 20
    },
    button: {
        marginBottom: 15,
    },
    divider: {
        marginTop: 30,
        marginBottom: 30
    }
});