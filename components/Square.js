import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import Cup from '../components/Cup';
const {vw } = require('react-native-expo-viewport-units');

class Square extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.square}>
                {   this.props.hasCup &&
                    <Cup></Cup>
                }
            </View>
        );
    }
}

export default Square;

const styles = StyleSheet.create({
    square: {
        width: vw(10),
        height: vw(10)
    }
});