import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import {
    View,
} from 'native-base';
import RequestsReceived from './RequestsReceived';
import RequestsSended from './RequestsSended';

const FriendshipRequestButtons = ({navigation}) => {
    const onViewProfile = (player) => {
        const {
            jugador_seudonimo,
            seudonimo,
            codigo_jugador,
            codigo_jugador_amigo
        } = player;
        navigation.navigate("PlayerProfile", {
            playerCode  : (codigo_jugador || codigo_jugador_amigo), 
            playerAlias : (seudonimo || jugador_seudonimo)
        });
    }
    return (
        <View style = { styles.root }>
            <View>
                <RequestsReceived onViewProfile = {item => onViewProfile(item)} />
            </View>
            <View>
                <RequestsSended onViewProfile = {item => onViewProfile(item)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root : {
        flex : 1,
        flexDirection : "row",
        justifyContent : "center",
    },
});

FriendshipRequestButtons.propTypes = {
    navigation : PropTypes.any.isRequired,
};

export default FriendshipRequestButtons;