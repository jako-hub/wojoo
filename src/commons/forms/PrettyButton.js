import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import stylesPalette from "../../utils/stylesPalette";
import PropTypes from 'prop-types';
import { LoadingSpinner } from '../loaders';

const PrettyButton = ({children, small, disabled, primary, icon, loading, ...otherProps}) => {
    const buttonStyles = [
        styles.btnRoot, 
        (disabled? styles.disabled : null),
        (primary? styles.btnPrimary : null),
        (small? styles.small : null),
    ];
    const textStyles = [
        styles.btnText,
        (primary? styles.btnPrimaryText : {}),
    ];
    return (
        <Button style={buttonStyles} {...otherProps} rounded disabled  = { disabled } >
            <Text style={ textStyles }>
                {children} {!loading && (icon)}
            </Text>
            {loading && (<LoadingSpinner />)}
        </Button>
    );
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    btnRoot : {
        elevation           : 0,
        borderColor         : palette.accent.color,
        borderWidth         : 1,
        backgroundColor     : "transparent",
        justifyContent      : "center",
        alignItems          : "center",
        paddingHorizontal   : 1,
        marginHorizontal    : 2,
        height              : 30,
    },
    btnPrimary : {
        backgroundColor : palette.accent.color,
    },
    btnPrimaryText : {
        color : palette.accent.primaryText,
    },
    btnText : {
        fontSize : 10,
        color : palette.accent.primaryText,
    },
    disabled : {
        backgroundColor : "#b0bec5",
        borderColor : "#b0bec5",
        color : "#cfd8dc"
    },
    small : {
        paddingVertical : 2,
        paddingTop : 2,
        paddingBottom : 2,
        paddingHorizontal : 5,
        height : 25,
        alignItems : "center",
        justifyContent : "center",
    },
});

PrettyButton.propTypes = {
    label       : PropTypes.string,
    disabled    : PropTypes.bool,
    small       : PropTypes.bool,
};

export default PrettyButton;