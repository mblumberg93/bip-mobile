import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { makeMove, rerack, updateGame, reset, quit } from "../actions/index";
import Square from '../components/Square';
import { GameEvents } from '../constants';
import { firebaseDB } from '../services/firebase';
const { vw } = require('react-native-expo-viewport-units');

function mapDispatchToProps(dispatch) {
    return {
        makeMove: move => dispatch(makeMove(move)),
        rerack: rack => dispatch(rerack(rack)),
        updateGame: updates => dispatch(updateGame(updates)),
        reset: _ => dispatch(reset(_)),
        quit: _ => dispatch(quit(_))
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
        firebaseDB.ref(this.props.gameDB).limitToLast(1).on("child_added", msg => {
            const message = msg.val();
            if (message.player === this.props.name) {
                return;
            }

            switch(message.event) {
                case GameEvents.MakeMove:
                    const move = { 
                        player: message.player, 
                        row: message.row, 
                        column: message.column
                    }
                    this.props.makeMove(move);
                    break;
                case GameEvents.EndTurn:
                    this.props.updateGame({ opponentCups: message.cups });
                    this.props.onStartTurn();
                  break;
                case GameEvents.Rerack:
                    this.props.rerack({ player: message.player, formation: message.formation });
                  break;
                case GameEvents.Reset:
                    this.props.reset({});
                  break;
                case GameEvents.Quit:
                    this.props.quit({});
                    this.props.onQuit();
                  break;
                }
        });
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