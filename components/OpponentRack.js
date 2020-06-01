import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { makeMove } from "../actions/index";
import Square from '../components/Square';
import { GameEvents } from '../constants';
const { vw } = require('react-native-expo-viewport-units');

function mapDispatchToProps(dispatch) {
    return {
        makeMove: move => dispatch(makeMove(move))
    };
}

function mapStateToProps(state) {
    return state ;
};

class ConnectedOpponentRack extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.pubnub) {
            this.props.pubnub.setUUID(this.props.UUID);
            const listener = {
                message: envelope => {
                    if (envelope.message.content.player === this.props.name) {
                        return;
                    }
                    if (envelope.message.content.event === GameEvents.MakeMove) {
                        const move = { 
                            player: envelope.message.content.player, 
                            row: envelope.message.content.row, 
                            column: envelope.message.content.column
                        }
                        this.props.makeMove(move);
                    }
                    if (envelope.message.content.event === GameEvents.EndTurn) {
                        this.props.onStartTurn();
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

    getCup(row, column) {
        for (const cup of this.props.opponentCups) {
            if (cup.row === row && cup.column === column) {
                return cup;
            }
        }
        return null;
    }

    render() {
        const size = [...Array(7).keys()];
        const squares = size.map(invRow => {
            return size.map(invColumn => {
                const row = 6 - invRow;
                const column = 6 - invColumn;
                const cup = this.getCup(row, column);
                return <Square key={"square"+row+column} 
                               player={this.props.opponentName}
                               row={row} 
                               column={column}
                               hasCup={cup !== null}
                               active={cup ? cup.active : false}
                               onUpdateCups={(row, column) => this.handleUpdateCups(row, column)}></Square>;
            });
        });

        return (
            <View style={styles.screenContainer}>
                <View style={styles.grid}>
                    {squares}
                </View>
            </View>
        );
    }
}

const OpponentRack = connect(mapStateToProps, mapDispatchToProps)(ConnectedOpponentRack);

export default OpponentRack;

const styles = StyleSheet.create({
    screenContainer: {
        paddingTop: vw(10),
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: vw(10),
        justifyContent: "center",
        alignItems: 'center'
    },
    grid: {
        width: vw(70),
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    }
});