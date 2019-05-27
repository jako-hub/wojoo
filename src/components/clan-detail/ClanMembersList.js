import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import {SimpleHeader, PhotoDisplay} from '../../commons/containers';
import {DEFAULT_USER_IMG, IMAGES_SERVER} from 'react-native-dotenv';
import { SimpleTouch } from '../../commons/touchables';
import { InviteFriendToClan } from '../../commons/buttons';

/**
 * This component only renders the Clan member item.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0 
 */
const ClanMemberItem = ({name, alias, photo, onView}) => {
    const imgSrc = photo? `${IMAGES_SERVER}${photo}` : DEFAULT_USER_IMG;
    return (
        <View style = { styles.clanMemberItem }>
            <View style = { styles.clanMemberItemPhoto }>
                <SimpleTouch onPress = { onView } wrapType = "stretch">
                    <PhotoDisplay avatar imageSource = {{uri : imgSrc}} />
                </SimpleTouch>
            </View>
            <View style = { styles.clanMemberItemInfo }>
                <SimpleTouch onPress = { onView } wrapType = "stretch">
                    <Text>{name}</Text>
                </SimpleTouch>
                <SimpleTouch onPress = { onView } wrapType = "stretch">
                    <Text note>{alias}</Text>
                </SimpleTouch>
            </View>
        </View>
    );
};

/**
 * This component only renders the game detail members.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0 
 */
const ClanMemberslist = ({members=[], navigation}) => {    
    const onViewProfile = (playerCode, playerAlias) => {
        navigation.navigate("PlayerProfile", {playerCode, playerAlias});
    }
    return (
        <View style = { styles.root }>
            <SimpleHeader title = "Miembros"/>
            <View style = { styles.membersList }>
                {members.map((item, key) => (
                    <ClanMemberItem 
                        key = { `cla-item-member-${key}` }
                        name = { item.jugador_nombre_corto }
                        alias = { item.jugador_seudonimo }
                        onView = { () => onViewProfile(item.codigo_jugador, item.jugador_seudonimo) }
                    />
                ))}
            </View>
            <InviteFriendToClan />
        </View>
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

    },
    clanMemberItemInfo : {
        paddingHorizontal : 10,
    },
});

ClanMemberslist.propTypes = {
    members     : PropTypes.arrayOf(PropTypes.shape({
        codigo_jugador       : PropTypes.any,
        jugador_nombre_corto : PropTypes.string,
        jugador_seudonimo    : PropTypes.string,
    })),
    navigation : PropTypes.any.isRequired,
};

export default ClanMemberslist;