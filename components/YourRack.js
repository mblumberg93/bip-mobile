import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import { Button } from 'react-native-elements'
import { connect } from "react-redux";
import Square from '../components/Square';
import { GameEvents } from '../constants';
const { vw } = require('react-native-expo-viewport-units');

function mapStateToProps(state) {
    return state ;
};

class ConnectedYourRack extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.pubnub) {
            this.props.pubnub.setUUID(this.props.UUID);
            this.props.pubnub.subscribe({ channels: [this.props.gameChannel] });
        }
    }

    componentWillUnmount() {
        if (this.props.pubnub) {
            this.props.pubnub.unsubscribeAll();
        }
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
        const message = {
            content: {
                event: GameEvents.MakeMove,
                player: this.props.name,
                row: row,
                column: column
            },
            id: Math.random().toString(16).substr(2)
          };
        
          this.props.pubnub.publish({ channel: this.props.gameChannel, message });
    }

    handleRerack() {

    }

    handleEndTurn() {
        const message = {
            content: {
                event: GameEvents.EndTurn,
                player: this.props.name
            },
            id: Math.random().toString(16).substr(2)
        };
        
        this.props.pubnub.publish({ channel: this.props.gameChannel, message });
        this.props.onEndTurn();
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
            </React.Fragment>
        );
    }
}

const YourRack = connect(mapStateToProps)(ConnectedYourRack);

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