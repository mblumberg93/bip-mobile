import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { updateGame } from "../actions/index";
import Square from '../components/Square';
const {vw } = require('react-native-expo-viewport-units');

function mapDispatchToProps(dispatch) {
    return {
        updateGame: updates => dispatch(updateGame(updates))
    };
}

function mapStateToProps(state) {
    return state ;
};

class ConnectedYourRack extends Component {
    constructor(props) {
        super(props);
    }

    hasCup(row, column) {
        for (const cup of this.props.cups) {
            if (cup.row === row && cup.column === column) {
                return true;
            }
        }
        return false;
    }

    render() {
        const size = [...Array(7).keys()];
        const squares = size.map(row => {
            return size.map(column => {
                return <Square key={"square"+row+column} 
                               row={row} 
                               column={column}
                               hasCup={this.hasCup(row, column)}></Square>;
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

const YourRack = connect(mapStateToProps, mapDispatchToProps)(ConnectedYourRack);

export default YourRack;

const styles = StyleSheet.create({
    screenContainer: {
        paddingTop: vw(10),
        paddingLeft: 15,
        paddingRight: 15,
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