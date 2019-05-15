import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesPalette from "../../../utils/stylesPalette";
import {
} from '../../../commons/buttons';
import { PrettyButton } from '../../../commons/forms';

/**
 * This component renders the footer of an item
 * @param {*} param0 
 */
const Footer = ({onLike, onShare, isInGame, onViewProfile, liked, user, onAdd, gameCode}) => {
    const likeButtonStyles = {
        ...styles.defaultIcon,
        ...(liked? styles.buttonLikePressed : {}),
    };
    return (
        <View style={styles.root}>
            <View style = {styles.actionButtons}>
                {!isInGame && (
                    <View>
                        <PrettyButton small onPress={onAdd}>
                            <Icon name = "user-plus" size = { 13 } /> Unirme 
                        </PrettyButton>
                    </View>
                )}
                <PrettyButton onPress = { onShare } small>
                    <Icon name = "share-alt" size = { 13 } /> Compartir
                </PrettyButton>
            </View>
        </View>
    );
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        flex : 1,
        flexDirection : "row",
        justifyContent : "space-between",
    },
    buttonsWrapper : {
        flex            : 2,
        flexDirection   : 'row',
        justifyContent  : 'flex-end',
    },
    button : {
        width               : 40,
        justifyContent      : "center",
        marginHorizontal    : 5,
    },
    actionButtons : {
        flex : 6,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center",
        marginTop : 10,
    },
    defaultIcon : {
        color : '#bdbdbd',
    },
    buttonLikePressed : {
        color : '#ef5350',
    },
    commentsCount : {
        position            : "absolute",
        top                 : "75%",
        left                : "80%",
        backgroundColor     : palette.primary.color,
        paddingHorizontal   : 5,
        borderRadius        : 50,
    },
    commentsCountText : {
        color : "#FFF",
    },
});

Footer.propTypes = {
    onAdd               : PropTypes.func,
    onLike              : PropTypes.func, 
    liked               : PropTypes.bool,
    onViewProfile       : PropTypes.func,
    user                : PropTypes.string,
    isInGame            : PropTypes.bool,
};

export default Footer;