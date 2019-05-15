import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { 
    Text,
    Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ShareGameButton } from '../../commons/buttons';
import { PrettyButton } from '../../commons/forms';

const Actions = ({onAdd, canJoin=true, user, onViewProfile, gameCode, isInGame, onShareGame}) => (
    <View style={styles.root}>
        <View style = { styles.wrapper } >
            <View style = {styles.hostWrapper}>
                <Text note style = {{marginRight : 10}}>
                    Anfitrión:
                </Text>
                <TouchableOpacity style={styles.buttonLink} transparent onPress={onViewProfile}>
                    <Text>{user}</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style = { styles.mainButtonsWrapper } >
            {canJoin && (
                <PrettyButton small onPress = { onAdd }>
                    <Icon name="user-plus" size={13} /> Unirme
                </PrettyButton>
            )}
            <PrettyButton small onPress = { onShareGame }>
                <Icon name="share-alt" size={13} /> Compartir
            </PrettyButton>
        </View>
    </View>
);

const styles = StyleSheet.create({
    root : {
        marginBottom : 5,
    },
    mainButtonsWrapper : {
        flexDirection   : "row",
        alignItems      : "center",
        justifyContent  : "center",
        marginBottom    : 20,
        marginTop : 5,
    },
    wrapper : {
        flex : 1,
        flexDirection : "row",
        justifyContent : "space-between",
    },
    buttonsWrapper : {
        flexDirection : "row",
        justifyContent : "flex-end",
        paddingHorizontal : 10,
    },
    hostWrapper : {
        flex : 1,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "flex-end",
        paddingRight : 30,
        marginBottom : 10,
    },
    button : {
        width : 45,
        justifyContent : "center",
        alignItems : "center",
        marginHorizontal : 2,
    },
});

Actions.propTypes = {
    onAdd           : PropTypes.func,
    onLike          : PropTypes.func,
    onComment       : PropTypes.func,
    onViewProfile   : PropTypes.func,
    user            : PropTypes.string,
    gameCode        : PropTypes.any,
    isInGame        : PropTypes.bool,
};

export default Actions;