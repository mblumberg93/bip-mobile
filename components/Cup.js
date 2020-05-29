import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from "react-native";

class Cup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: true
        }
    }
    
    toggleCup() {
        this.setState({ active: !this.state.active })
    }

    render() {
        return (
            <TouchableOpacity style={styles.cupContainer} onPress={() => this.toggleCup()}>
                <Image style={styles.cup} 
                        source={this.state.active ? require('../assets/circle_PNG3.png') : require('../assets/circle_PNG6.png')}>
                </Image>
            </TouchableOpacity>
        );
    }
}

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