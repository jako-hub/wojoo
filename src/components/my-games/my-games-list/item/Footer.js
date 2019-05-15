import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import {
    Button,
    Text,
} from 'native-base';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesPalette from '../../../../utils/stylesPalette';
import {
    ShareGameButton,
} from '../../../../commons/buttons';
import { PrettyButton } from '../../../../commons/forms';
/**
 * This component renders the footer of an item
 * @param {*} param0 
 */
const Footer = ({onLike, onViewProfile, liked, user, gameCode, onShare}) => {
    const likeButtonStyles = {
        ...styles.defaultIcon,
        ...(liked? styles.buttonLikePressed : {}),
    };
    return (
        <View style={styles.root}>
            {/*
                <View style = {styles.profileButton}>
                    <Text note style = {{marginRight : 10}}>
                        Anfitrión:
                    </Text>
                    <TouchableOpacity style={styles.buttonLink} transparent onPress={onViewProfile}>
                        <Text>{user}</Text>
                    </TouchableOpacity>
                </View>            
                <View style = {styles.buttonsWrapper}>                
                 <ShareGameButton gameCode = { gameCode } onPress = { onShare } />  
                </View>
            */}
            <View style = { styles.mainButtonsWrapper }>
                <View>
                    <PrettyButton small onPress = { onShare } >
                        <Icon name = "share-alt" size = { 13} /> Compartir
                    </PrettyButton>
                </View>
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
    mainButtonsWrapper : {
        flexDirection   : "row",
        justifyContent  : "center",
        flex            : 1,
        marginTop       : 10,
    },
    buttonsWrapper : {
        flex            : 1,
        flexDirection   : 'row',
        justifyContent  : 'flex-end',
    },
    button : {
        width               : 40,
        justifyContent      : "center",
        marginHorizontal    : 5,
    },
    profileButton : {
        flex : 2,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "flex-end",
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
    onLike              : PropTypes.func, 
    onViewProfile       : PropTypes.func,
    liked               : PropTypes.bool,
    gameCode            : PropTypes.any,
    user                : PropTypes.string,
};

export default Footer;