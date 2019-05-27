import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    CheckBox,
} from 'native-base';
import {
    StyleSheet,
    ScrollView,
} from 'react-native';
import { PhotoDisplay } from '../containers';
import {DEFAULT_USER_IMG, IMAGES_SERVER} from 'react-native-dotenv';
import { SimpleTouch } from '../touchables';

const FriendItem = ({name, alias, photo, onCheck, checked}) => {
    const imgSrc = photo? `${IMAGES_SERVER}${photo}` : DEFAULT_USER_IMG;
    return (
        <SimpleTouch wrapType = "stretch" onPress = { onCheck }>
            <View style = { styles.clanMemberItem }>
                <View style = { styles.clanMemberItemPhoto }>
                    <PhotoDisplay avatar imageSource = {{uri : imgSrc}} />
                </View>
                <View style = { styles.clanMemberItemInfo }>
                    <Text>{name}</Text>
                    <Text note>{alias}</Text>
                </View>
                <View style = { styles.action }>
                    <CheckBox 
                        checked = { checked }
                        onPress = { onCheck } 
                    />
                </View>
            </View>
        </SimpleTouch>
    );
};

const FriendsList = ({friends=[], onSelectFriend, isSelected,}) => {
    return (
        <ScrollView>        
            <View>
                {friends.map((item, key) => (
                    <FriendItem 
                        key = { `item-friend-list-item-${key}` }
                        name = { item.jugador_amigo_rel_nombre_corto }
                        alias = { item.seudonimo }
                        recordCode = {item.codigo_jugador_amigo_pk}
                        playerCode = { item.codigo_jugador_amigo }
                        photo       = { item.photo }
                        onCheck     = { () => onSelectFriend? onSelectFriend(item) : null }
                        checked = { isSelected(item) }
                    />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root : {
        marginTop : 10,
    },
    membersList : {
        paddingTop : 10,
    },
    clanMemberItem : {
        flexDirection       : "row",
        marginBottom        : 10,
        paddingHorizontal   : 10,
    },
    clanMemberItemPhoto : {
        flex : 1,
    },
    clanMemberItemInfo : {
        flex : 8,
        paddingHorizontal : 10,
    },
    action : {
        justifyContent : "center",
        flex : 1,
    },
});

FriendsList.propTypes = {
    friends : PropTypes.array,
    isSelected : PropTypes.func,
    onSelectFriend : PropTypes.func,
};

export default FriendsList;