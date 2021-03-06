import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import { Button } from 'react-native-elements'
import { connect } from "react-redux";
import RNPickerSelect from 'react-native-picker-select';
import { GameEvents } from '../constants';
import { FORMATIONS }from '../formations';
import { rerack } from "../actions/index";
import { firebaseDB } from '../services/firebase';
const { vw } = require('react-native-expo-viewport-units');

function mapDispatchToProps(dispatch) {
    return {
        rerack: rack => dispatch(rerack(rack))
    };
}

function mapStateToProps(state) {
    return state ;
};

class ConnectedSelectRack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formation: null
        }
    }

    handleChooseRack() {
        const msg = {
            event: GameEvents.Rerack,
            player: this.props.name,
            formation: this.state.formation,
            timestamp: Date.now()
        }
        firebaseDB.ref(this.props.gameDB).push(msg);
        this.props.rerack({ player: this.props.name, formation: this.state.formation });
        this.props.onChooseRack();
    }

    handleCancel() {
        this.props.onCancel();
    }

    render() {
        const cupsAvailable = this.props.cups.filter(cup => cup.active).length;
        const possibleFormations = FORMATIONS.filter(formation => formation.size == cupsAvailable);

        const options = possibleFormations.map(formation => {
            return { label: formation.name, value: formation.value };
        });

        const placeholder = {
            label: "Select a Rack...",
            value: '',
            color: 'grey'
          };

        return (
            <View style={styles.buttonContainer}>
                <View style={styles.pickerContainer}>
                    <RNPickerSelect items={options}
                                    onValueChange={(value) => this.setState({ formation: value })} 
                                    placeholder={placeholder}
                                    style={pickerSelectStyles} />
                </View>
                <Button title="Rerack" 
                        buttonStyle={{ marginBottom: 15 }}
                        onPress={() => this.handleChooseRack()}>
                </Button>
                <Button title="Cancel" 
                        buttonStyle={{ marginBottom: 15 }}
                        onPress={() => this.handleCancel()}>
                </Button>
            </View>
        );
    }
}

const SelectRack = connect(mapStateToProps, mapDispatchToProps)(ConnectedSelectRack);

export default SelectRack;

const styles = StyleSheet.create({
    buttonContainer: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    pickerContainer: {
        marginBottom: 20
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30
    },
    inputAndroid: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30
    },
  });