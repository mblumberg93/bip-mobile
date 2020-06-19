import React, { Component } from 'react';
import { View, StyleSheet, Text } from "react-native";
import { Button } from 'react-native-elements';
import { connect } from "react-redux";
import { updateGame } from "../actions/index";
import { GameEvents } from '../constants';
import { firebaseDB } from '../services/firebase';

function mapDispatchToProps(dispatch) {
    return {
        updateGame: updates => dispatch(updateGame(updates))
    };
}

function mapStateToProps(state) {
    return state ;
};

class ConnectedChooseStart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayStartOptions: (this.props.isJoiner ? false : true)
        }
    }

    componentDidMount() {
        firebaseDB.ref(this.props.gameDB).limitToLast(1).on("child_added", msg => {
            const message = msg.val();
            if (message.player === this.props.name) {
                return;
            }

            switch(message.event) {
                case GameEvents.CreatorEnteringGame:
                    if (this.props.isJoiner) {
                        this.props.updateGame({opponentName: message.player });
                        this.setState({ displayStartOptions: true });
                    }  
                    break;
                case GameEvents.GameStart:
                    if (message.starter == this.props.name) {
                        this.props.onYouStart();
                    } else {
                        this.props.onOpponentStart();
                    }
                  break;
                }
        });

        if (this.props.isJoiner) {
            const msg = {
                event: GameEvents.JoinerEnteringGame,
                player: this.props.name,
                timestamp: Date.now()
            }
            firebaseDB.ref(this.props.gameDB).push(msg);
        }
    }

    handleYouStart() {
        this.props.onYouStart();
        const msg = {
            event: GameEvents.GameStart,
            player: this.props.name,
            starter: this.props.name,
            timestamp: Date.now()
        }
        firebaseDB.ref(this.props.gameDB).push(msg);
    }

    handleOpponentStart() {
        this.props.onOpponentStart();
        const msg = {
            event: GameEvents.GameStart,
            player: this.props.name,
            starter: this.props.opponentName,
            timestamp: Date.now()
        }
        firebaseDB.ref(this.props.gameDB).push(msg);
    }

    render() {
        return (
            <View style={styles.screenContainer}>
                <Text style={styles.standardText}>Welcome {this.props.name}!</Text>
                { !this.state.displayStartOptions &&
                    <Text style={styles.standardText}>Waiting For Your Opponent To Join The Game...</Text>
                } 
                { this.state.displayStartOptions && 
                    <View>
                        <Text style={styles.standardText}>Your opponent is {this.props.opponentName}</Text>
                        <Text style={styles.standardText}>Choose who starts</Text>
                        <Button title={this.props.name + " Starts"} 
                                buttonStyle={{ marginBottom: 15 }}
                                onPress={() => this.handleYouStart()}>
                        </Button>
                        <Button title={this.props.opponentName + " Starts"} 
                                buttonStyle={{ marginBottom: 15 }}
                                onPress={() => this.handleOpponentStart()}>
                        </Button>
                    </View>
                }
            </View>
        );
    }
}

const ChooseStart = connect(mapStateToProps, mapDispatchToProps)(ConnectedChooseStart);

export default ChooseStart;

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