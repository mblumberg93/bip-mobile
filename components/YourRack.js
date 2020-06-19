import React, { Component } from 'react';
import { View, StyleSheet, Alert  } from "react-native";
import { Button, Divider} from 'react-native-elements'
import { connect } from "react-redux";
import Square from '../components/Square';
import { GameEvents } from '../constants';
import { firebaseDB } from '../services/firebase';
import { reset, quit} from "../actions/index";
const { vw } = require('react-native-expo-viewport-units');

function mapDispatchToProps(dispatch) {
    return {
        reset: _ => dispatch(reset(_)),
        quit: _ => dispatch(quit(_))
    };
}

function mapStateToProps(state) {
    return state ;
};

class ConnectedYourRack extends Component {
    constructor(props) {
        super(props);
    }

    getCup(row, column) {
        for (const cup of this.props.cups) {
            if (cup.row === row && cup.column === column) {
                return cup;
            }
        }
        return null;
    }

    handleUpdateCups(row, column) {
        const msg = {
            event: GameEvents.MakeMove,
            player: this.props.name,
            row: row,
            column: column,
            timestamp: Date.now()
        }
        firebaseDB.ref(this.props.gameDB).push(msg);
    }

    handleRerack() {
        this.props.onRerack();
    }

    handleEndTurn() {
        const msg = {
            event: GameEvents.EndTurn,
            player: this.props.name,
            cups: this.props.cups,
            timestamp: Date.now()
        }
        firebaseDB.ref(this.props.gameDB).push(msg);
        this.props.onEndTurn();
    }

    promptReset() {
        Alert.alert(
            "Reset Game",
            "Are you sure you want to reset the game?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => this.resetGame() }
            ]
        );
    }

    resetGame() {
        const msg = {
            event: GameEvents.Reset,
            player: this.props.name,
            timestamp: Date.now()
        }
        firebaseDB.ref(this.props.gameDB).push(msg);
        this.props.reset();
    }

    promptQuit() {
        Alert.alert(
            "Quit Game",
            "Are you sure you want to quit the game?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => this.quitGame() }
            ]
        );
    }

    quitGame() {
        const name = this.props.name;
        const gameDB = this.props.gameDB;
        const msg = {
            event: GameEvents.Quit,
            player: name,
            timestamp: Date.now()
        }
        console.log(msg);
        firebaseDB.ref(gameDB).push(msg);
        this.props.quit();
        this.props.onQuit();
    }

    render() {
        const size = [...Array(7).keys()];
        const squares = size.map(row => {
            return size.map(column => {
                const cup = this.getCup(row, column);
                return <Square key={"square"+row+column} 
                               player={this.props.name}
                               row={row} 
                               column={column}
                               hasCup={cup !== null}
                               active={cup ? cup.active : false}
                               onUpdateCups={(row, column) => this.handleUpdateCups(row, column)}></Square>;
            });
        });

        return (
            <React.Fragment>
                <View style={styles.rackContainer}>
                    <View style={styles.grid}>
                        {squares}
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Rerack" 
                            buttonStyle={{ marginBottom: 15 }}
                            onPress={() => this.handleRerack()}>
                    </Button>
                    <Button title="End Turn" 
                            buttonStyle={{ marginBottom: 15 }}
                            onPress={() => this.handleEndTurn()}>
                    </Button>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Reset Game" 
                            buttonStyle={{ marginBottom: 15, backgroundColor: "lightgrey", borderColor: "grey" }}
                            onPress={() => this.promptReset()}>
                    </Button>
                    <Button title="Quit Game" 
                            buttonStyle={{ marginBottom: 15, backgroundColor: "lightgrey", borderColor: "grey" }}
                            onPress={() => this.promptQuit()}>
                    </Button>
                </View>
            </React.Fragment>
        );
    }
}

const YourRack = connect(mapStateToProps, mapDispatchToProps)(ConnectedYourRack);

export default YourRack;

const styles = StyleSheet.create({
    rackContainer: {
        paddingTop: vw(10),
        paddingBottom: vw(10),
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: "center",
        alignItems: 'center'
    },
    buttonContainer: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20
    },
    grid: {
        width: vw(70),
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    }
});