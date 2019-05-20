import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {
    View,
    Text,
    Thumbnail,
} from 'native-base';
import { SimpleTouch } from '../../commons/touchables';
import {IMAGES_SERVER, DEFAULT_USER_IMG} from 'react-native-dotenv';

/**
 * This component renders a friend item.
 * @param {*} param0 
 */
const FriendItem = ({friend, onViewProfile}) => (
    <View 
        key = {`friend-list-item-${friend.codigo_jugador_amigo_pk}`}
        style = { styles.firendItem }
    >
        <View style = { styles.friendAvatarWrapper }>
            <SimpleTouch wrapType = "stretch" onPress = { () => onViewProfile? onViewProfile(friend): null}>
                <Thumbnail style = { styles.friendAvatar } source = { {uri : friend.foto? `${IMAGES_SERVER}${friend.foto}` : DEFAULT_USER_IMG} }/>
            </SimpleTouch>
        </View>
        <View style = { styles.friendInfo }>
            <SimpleTouch wrapType = "stretch" onPress = { () => onViewProfile? onViewProfile(friend): null}>
                <Text>{friend.jugador_amigo_rel_nombre_corto}</Text>
            </SimpleTouch>
            <SimpleTouch wrapType = "stretch" onPress = { () => onViewProfile? onViewProfile(friend): null}>
                <Text note>({friend.seudonimo})</Text>
            </SimpleTouch>
        </View>
    </View>
);

const styles = StyleSheet.create({
    firendItem : {
        flexDirection : "row",
        paddingVertical : 3,
    },
    friendInfo : {
        flex : 10,
    },
    friendAvatarWrapper : {
        flex : 2,
        justifyContent : "center",
    },
    friendAvatar : {
        backgroundColor : "#f0f0f0",
        alignSelf : "center",
        borderRadius : 100,
        width : 35,
        height : 35,
    },    
});

export default FriendItem;