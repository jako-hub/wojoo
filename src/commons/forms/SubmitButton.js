import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import stylesPalette from "../../utils/stylesPalette";
import PropTypes from 'prop-types';

const SubmitButton = ({label, disabled, primary, children, ...otherProps}) => {
    const theStyles = {
        ...styles.btnRoot,
        ...(primary? styles.primary : {}),
        ...(disabled? styles.disabled : {}),        
    };

    const textStyles = {
        ...styles.text,
        ...(primary? styles.primaryText : {}),
    };
    
    return (
        <Button style={theStyles} {...otherProps} rounded disabled  = { disabled } block >
            <Text style={textStyles}>
                {label||children}
            </Text>
        </Button>
    );
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    btnRoot : {
        backgroundColor : "#FFF",
        borderColor : "#b0bec5",
        borderWidth : 2,
    },
    text : {
        color : "#b0bec5",
    },
    primary : {
        backgroundColor : palette.accent.color,
    },
    primaryText : {
        color : "#FFF",
    },
    disabled : {
        borderColor : "#b0bec5",
        backgroundColor : "#b0bec5",
        color : "#cfd8dc"
    },
});

SubmitButton.propTypes = {
    label       : PropTypes.string,
    disabled    : PropTypes.bool,
};

export default SubmitButton;