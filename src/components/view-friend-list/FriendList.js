import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withUserData } from '../../providers';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
    Text,
    Input,
    Item,
    Label,
} from 'native-base';
import FriendItem from './FriendItem';

/**
 * This component renders a given list of friends.
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} props 
 */
const FriendList = (props) => {
    const {friends=[], onViewProfile,} = props;
    const [queryString, setQueryString] = useState("");
    let filteredFriends = [...friends];
    if(queryString) {
        const regExp = new RegExp(`.*(${queryString.toLocaleLowerCase()}).*`, "g");
        
        filteredFriends = filteredFriends.filter(item => {
            return `${item.jugador_amigo_rel_nombre_corto.toLocaleLowerCase()}`.match(regExp) || 
                   `${item.seudonimo.toLocaleLowerCase()}`.match(regExp);
        });
    }
    return (
        <View style = { styles.root }>
            <View style = { styles.searchWrapper }>
                <Item floatingLabel>
                    <Label><Text>Buscar</Text></Label>
                    <Input 
                        value = {queryString}
                        onChangeText = { text => setQueryString(text) }
                    />
                </Item>
            </View>
            {filteredFriends.length === 0 && (
                <View style = { styles.emptyWrapper }>
                    <Text style = { styles.emptyText }>No se encontraron amigos </Text>
                </View>
            )}
            {filteredFriends.map((item, key) => (
                <FriendItem 
                    key = { `view-friends-list-item-${key}` }
                    friend = { item }
                    onViewProfile = { onViewProfile }
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    root : {

    },
    searchWrapper : {
        paddingVertical : 10,
        paddingHorizontal : 15,
        marginBottom : 10,
    },
    emptyWrapper : {
        flexDirection : "row",
        justifyContent : "center",
        paddingVertical : 10,
    },
    emptyText : {
        textAlign : "center",
    },
});

FriendList.propTypes = {
    friends : PropTypes.array,
    onViewProfile : PropTypes.func,
};

export default withUserData(FriendList);