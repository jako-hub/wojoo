import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Text, Input, Item, } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Button = ({icon, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
            <Icon name={icon} size={20} />
        </View>
    </TouchableOpacity>
);

class NumberPicker extends React.Component {
    inputRef = null;
    state = {
        numberVal : 0,
        viewInput : true,
        inputValue : 0,
    };

    constructor(props) {
        super(props);
        this.state.inputValue = this.props.defaultValue;
        this.state.numberVal = this.props.defaultValue;
    }

    conChangeVal(val) {
        this.setState({
            numberVal : val,
        });
    }

    addValue = () => {
        const {numberVal} = this.state;
        const {onChange, step=1, max} = this.props;
        let newValue = parseInt(numberVal) + step;
        if(max !== false && newValue > max) newValue = max;
        this.setState({
            numberVal   : newValue,
            inputValue  : newValue,
        });
        if(onChange) onChange(newValue);
    };

    substractValue = () => {
        const {numberVal} = this.state;
        const {onChange, step=1, min} = this.props;        
        let newValue = parseInt(numberVal) - step;
        if(min !== false && newValue < min) newValue = min;
        this.setState({
            numberVal   : newValue,
            inputValue  : newValue,
        });
        if(onChange) onChange(newValue);
    };

    toggleViewInput() {
        this.setState({
            viewInput : !this.state.viewInput,
            inputValue : this.state.numberVal,
        }, () => {
            if(this.state.viewInput) {
                this.inputRef._root.focus();
            }
        });
    }

    onSubmitNumber() {
        this.setState({
            numberVal : this.state.inputValue,
        });
    }

    onChangText(text) {
        const {max, min} = this.props;
        const numberVal = parseInt(text);
        if((max && numberVal > max) || (min && numberVal < min)) return false;
        this.setState({
            inputValue : text,
            numberVal  : numberVal,
        }, () => {
            if(this.props.onChange) this.props.onChange(parseInt(text));
        });
    }

    render() {
        const {
            label="Pick a number", 
        } = this.props;
        const {
            numberVal,
            viewInput,
            inputValue,
        } = this.state;
        return (
            <View style={styles.root}>
            <Text style={styles.title}>{label}</Text>
            <View style={styles.wrapper}>
                <Button icon="minus" onPress={() => this.substractValue()} />
                
                {!viewInput && (
                    <View style={styles.textWrapper}>
                        <TouchableOpacity onPress={() => this.toggleViewInput()}>
                            <View style={styles.displayWrapper}>
                                <Text style={styles.text}>{numberVal}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}                
                {viewInput && (
                    <View style={styles.inputWrapper}>                    
                        <Item style={styles.inputText}>                        
                            <Input 
                                ref                 = {node => this.inputRef = node}
                                value               = {inputValue.toString()}
                                keyboardType        = "numeric"
                                style               = {{textAlign : "center", marginLeft : 0, paddingLeft : 0}}
                                onChangeText        = { text => this.onChangText(text) }
                                selectTextOnFocus
                                onSubmitEditing     = { this.onSubmitNumber.bind(this) }
                                onBlur              = {this.onSubmitNumber.bind(this)}
                            />
                        </Item>
                    </View>
                )}
                <Button icon="plus"  onPress={() => this.addValue()}/>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
        justifyContent : "flex-end",
        paddingHorizontal   : 20,
    },
    title : {
        textAlign : "center",
        marginBottom : 10,
    },
    wrapper : {
        flex                : 1,
        flexDirection       : "row",
        alignItems          : "center",
        justifyContent      : "space-between",        
    },
    text : {
        fontSize : 20,
    },
    button : {
        borderWidth     : 1,
        borderColor     : "#bdbdbd",
        alignItems      : "center",
        justifyContent  : "center",
        borderRadius    : 50,
        height          : 40,
        width           : 40,
    },
    inputText : {
        padding : 0,
        textAlign : "center",
        margin : "auto",
        marginLeft : 0,
    },
    inputWrapper : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
    },
    textWrapper : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
    },
    displayWrapper : {
        
    },
});

NumberPicker.propTypes = {
    onChange    : PropTypes.func,
    defaultValue: PropTypes.number,
    min         : PropTypes.number,
    max         : PropTypes.number,
    label       : PropTypes.string,
    step        : PropTypes.number,
};

export default NumberPicker;