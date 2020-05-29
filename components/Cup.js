import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { makeMove } from "../actions/index";

function mapDispatchToProps(dispatch) {
    return {
        makeMove: move => dispatch(makeMove(move))
    };
}

function mapStateToProps(state) {
    return state ;
};

class ConnectedCup extends Component {
    constructor(props) {
        super(props)
    }
    
    toggleCup() {
        if (this.props.player === this.props.name) {
            this.props.makeMove({ player: this.props.name, row: this.props.row, column: this.props.column });
            this.props.onUpdateCups(this.props.row, this.props.column);
        }
    }

    render() {
        const source = !this.props.active ? require('../assets/circle_PNG6.png') : this.props.player === this.props.name ? 
            require('../assets/circle_PNG3.png') : require('../assets/circle_PNG4.png')
        return (
            <TouchableOpacity style={styles.cupContainer}
                              onPress={() => this.toggleCup()}
                              disabled={this.props.player !== this.props.name}>
                <Image style={styles.cup} source={source}>
                </Image>
            </TouchableOpacity>
        );
    }
}

const Cup = connect(mapStateToProps, mapDispatchToProps)(ConnectedCup);

export default Cup;

const styles = StyleSheet.create({
    cup: {
        width: "180%",
        height: "180%",
        marginTop: "-45%",
        marginLeft: "-45%"
    },
    cupContainer: {
        overflow: "visible",
        width: "100%",
        height: "100%"
    }
});