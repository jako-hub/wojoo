import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import stylesPalette from "../../utils/stylesPalette";
import PropTypes from 'prop-types';

const SubmitButton = ({label, disabled, primary, children, ...otherProps}) => {
    const theStyles = {
        ...styles.btnRoot,
        ...(disabled? styles.disabled : {}),
    };
    
    return (
        <Button style={theStyles} {...otherProps} rounded disabled  = { disabled } block >
            <Text style={((primary) && !disabled)? {color : "#FFF"} : {}}>
                {label||children}
            </Text>
        </Button>
    );
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    btnRoot : {
        backgroundColor : palette.accent.color,
    },
    disabled : {
        backgroundColor : "#b0bec5",
        color : "#cfd8dc"
    },
});

SubmitButton.propTypes = {
    label       : PropTypes.string,
    disabled    : PropTypes.bool,
};

export default SubmitButton;