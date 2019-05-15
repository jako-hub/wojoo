import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
} from 'native-base';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import stylesPalette from '../../utils/stylesPalette';

/**
 * This component allows to render a simple chip.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
const CustomChip = ({ label, size=12, icon, type='primary'}) => {
    const getTypeSteyles = () => {
        switch(type) {
            case 'primary'  : return styles.primary;
            case 'danger'   : return styles.danger;
            default         : return styles.primary;
        }
    };
    const typeStyles = getTypeSteyles();
    return (
        <View style = {styles.root}>
            <View style = { {...typeStyles, ...styles.wrapper} }>
                <View style = { {...styles.iconWrapper, ...typeStyles} }>
                    {icon && (<Icon name = { icon } size = { size } style = { {color : "#FFF"} } />)}
                </View>
                <Text style = {styles.text}> {label} </Text>
            </View>
        </View>
    );
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        flexDirection    : "row",
        marginHorizontal : 10,
    },
    wrapper : {
        flexDirection   : "row",
        alignItems      : "center",
        borderWidth     : 1,
        borderRadius    : 50,
        backgroundColor : "#FFF"
    },
    iconWrapper : {
        borderWidth     : 1,
        padding         : 5,
        width           : 25,
        height          : 25,
        borderRadius    : 50,
    },
    primary : {
        borderColor : palette.primary.color,        
        backgroundColor : palette.primary.color,
    },
    danger : {
        borderColor : palette.danger.color,        
        backgroundColor : palette.danger.color,
    },
    text : {
        paddingHorizontal : 10,
    },
});

CustomChip.propTypes = {
    icon    : PropTypes.string,
    label   : PropTypes.any,
    size    : PropTypes.number,
};

export default CustomChip;