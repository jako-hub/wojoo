import React from 'react';
import { StyleSheet, Text, } from 'react-native';
import { Button } from 'native-base';
import stylesPalette from "../../utils/stylesPalette";
import PropTypes from 'prop-types';

const RoundedButton = ({children, disabled, primary, ...otherProps}) => {
    const theStyles = {
        ...styles.btnRoot,
        ...(disabled? styles.disabled : {}),
    };
    
    return (
        <Button style={theStyles} {...otherProps} rounded disabled  = { disabled } >
            <Text style={((primary) && !disabled)? {color : "#FFF"} : {}}>
                {children}
            </Text>
        </Button>
    );
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    btnRoot : {
        backgroundColor : palette.accent.color,
        width : 50,
        height : 50,
        justifyContent : "center",
        alignItems : "center",
    },
    disabled : {
        backgroundColor : "#b0bec5",
        color : "#cfd8dc"
    },
});

RoundedButton.propTypes = {
    label       : PropTypes.string,
    disabled    : PropTypes.bool,
};

export default RoundedButton;