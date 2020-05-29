import React, { Component } from 'react';
import { View, StyleSheet, Text } from "react-native";
import { Button } from 'react-native-elements'
import { connect } from "react-redux";
import { updateGame } from "../actions/index";
import { GameEvents } from '../constants';

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
        if (this.props.pubnub) {
            this.props.pubnub.setUUID(this.props.UUID);
    
            const listener = {
                message: envelope => {
                    if (envelope.message.content.event == GameEvents.CreatorEnteringGame && this.props.isJoiner) {
                        this.props.updateGame({opponentName: envelope.message.content.name});
                        this.setState({ displayStartOptions: true });
                    }
                    if (envelope.message.content.event == GameEvents.GameStart) {
                        if (envelope.message.content.player == this.props.name) {
                            this.props.onYouStart();
                        } else {

                            this.props.onOpponentStart();
                        }             
                    }
                }
            };
      
            this.props.pubnub.addListener(listener);
            this.props.pubnub.subscribe({ channels: [this.props.gameChannel] });

            if (this.props.isJoiner) {
                const message = {
                    content: {
                        event: GameEvents.JoinerEnteringGame,
                        name: this.props.name
                    },
                    id: Math.random().toString(16).substr(2)
                };
                this.props.pubnub.publish({ channel: this.props.gameChannel, message });
            }
        }
    }

    componentWillUnmount() {
        if (this.props.pubnub) {
            this.props.pubnub.unsubscribeAll();
        }
    }

    handleYouStart() {
        this.props.onYouStart();
        const message = {
            content: {
                event: GameEvents.GameStart,
                player: this.props.name
            },
            id: Math.random().toString(16).substr(2)
        };
        this.props.pubnub.publish({ channel: this.props.gameChannel, message });
    }

    handleOpponentStart() {
        this.props.onOpponentStart();
        const message = {
            content: {
                event: GameEvents.GameStart,
                player: this.props.opponentName
            },
            id: Math.random().toString(16).substr(2)
        };
        this.props.pubnub.publish({ channel: this.props.gameChannel, message });
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
                                buttonStyle={styles.button}
                                onPress={() => this.handleYouStart()}>
                        </Button>
                        <Button title={this.props.opponentName + " Starts"} 
                                buttonStyle={styles.button}
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
    },
    button: {
        marginBottom: 15,
    }
});