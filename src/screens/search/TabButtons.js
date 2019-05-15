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
import { SimpleTouch } from '../../commons/touchables';


export const TAB_GAMES = 'games';
export const TAB_FRIENDS = 'friends';

const Button = ({label, onPress, icon, active}) => (
    <SimpleTouch onPress = { onPress }>
        <View style = { [styles.button, (active? styles.buttonActive : null)] }>
            <Text style = { [styles.buttonText, (active? styles.buttonTextActive : null)] }>
                <Icon name = {icon} size = {18} /> {label}
            </Text>
        </View>
    </SimpleTouch>
);

const TabButtons = ({onChange, currentTab}) => (    
    <View style = {styles.root}>
        <Button label = "Juegos" active = { currentTab === TAB_GAMES } icon="futbol" onPress = { () =>  onChange? onChange(TAB_GAMES) : null} />
        <Button label = "Amigos" active = { currentTab === TAB_FRIENDS } icon="users"  onPress = { () =>  onChange? onChange(TAB_FRIENDS) : null} />
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
        paddingVertical     : 10,
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