import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,    
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import stylesPalette from '../../utils/stylesPalette';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SimpleTouch } from '../touchables';

const Button = ({label, onPress, icon, active}) => (
    <SimpleTouch onPress = { onPress }>
        <View style = { [styles.button, (active? styles.buttonActive : null)] }>
            <Text style = { [styles.buttonText, (active? styles.buttonTextActive : null)] }>
                <Icon name = {icon} size = {18} /> {label}
            </Text>
        </View>
    </SimpleTouch>
);

/**
 * This component allows to render a simple tabed button list
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0 
 */
const TabButtons = ({onChange, currentTab, buttons=[]}) => (
    <View style = {styles.root}>
        {buttons.map((button, key) => (
            <Button 
                key     = { `tab-button-items-${button.label}-${key}` }
                label   = {button.label || (`Button {${key + 1}}`)}
                active  = { currentTab === key }
                icon    = { button.icon }
                onPress = { () =>  onChange? onChange(key) : null}
            />
        ))}
    </View>    
);

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        flexDirection       : "row",
        justifyContent      : "flex-start",
        paddingVertical     : 10,
        paddingHorizontal   : 10,
    },
    button : {
        paddingHorizontal   : 20,
        paddingVertical     : 5,
        borderColor         : palette.primary.color,
        borderWidth         : 1,
        borderRadius        : 30,
        marginRight         : 5,
    },
    buttonActive : {
        backgroundColor : palette.primary.color,
    },
    buttonText : {
        textAlign   : "center",
        color       : palette.primary.color,
    },
    buttonTextActive : {
        color : "#fff",
    }
});

TabButtons.propTypes = {
    onChange : PropTypes.func,
};

export default TabButtons;