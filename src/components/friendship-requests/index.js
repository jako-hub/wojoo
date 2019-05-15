import React from 'react';
import PropTypes from 'prop-types';

import {
    StyleSheet,    
    TouchableOpacity,
} from 'react-native';
import {
    View,
    Text,
    List,
    ListItem,
    Left,
    Body,
    Right,
    Thumbnail,
} from 'native-base';
import { withUserData } from '../../providers';
import { PrettyButton } from '../../commons/forms';
import { SimpleModal } from '../../commons/modals';
import { DEFAULT_USER_IMG, IMAGES_SERVER } from 'react-native-dotenv';

const PlayerItem = ({ item, onViewProfile, onAccept, onReject }) => (
    <ListItem avatar>
        <Left>
            <Thumbnail source = { {uri : (item.foto? `${IMAGES_SERVER}${item.foto}` : DEFAULT_USER_IMG)} } />
        </Left>
        <Body>
            <Text>{item.jugador_nombre_corto}</Text>
            <TouchableOpacity onPress = { onViewProfile }>
                <Text note>{item.jugador_seudonimo}</Text>
            </TouchableOpacity>
        </Body>
    </ListItem>
);

class FriendShipRequests extends React.Component {
    componentDidMount() {
        this.props.fetchFriendshipRequest();
    }
    state = {
        openModal : false,
    };

    toggleModal() {
        this.setState({
            openModal : !this.state.openModal,
        });
    }

    onViewProfile(player) {
        this.toggleModal();
        const objPlayer = {
            codigo_jugador_amigo    : player.codigo_jugador, 
            seudonimo               : player.jugador_seudonimo,
        };
        this.props.onViewProfile(objPlayer);
    }

    render() {
        const {friendshipRequests=[] } = this.props
        const total = friendshipRequests.length;
        if(total === 0) return null;
        const {
            openModal,
        } = this.state;
        
        return (
            <>
            <View style = { styles.root }>
                <View style = { styles.wrapper }>
                    <View style = {{ marginTop: 10, }}>
                        <PrettyButton onPress = { () => this.toggleModal() }>
                            Ver {`${total} ${total > 1? "solicitudes" : "solicitud"}`}
                        </PrettyButton>
                    </View>
                </View>
            </View>
            <SimpleModal
                title   = "Solicitudes de amistad"
                open    = { openModal }
                onClose = { () => this.toggleModal() }
            >
                <List>
                    {friendshipRequests.map((item, key) => (
                        <PlayerItem 
                            key = {`player-item-request-friendship-${key}`}
                            item = {item}
                            onViewProfile = { () => this.onViewProfile(item) }
                        />
                    ))}
                </List>
            </SimpleModal>
            </>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        marginTop : 10,
        flexDirection : "row",
        justifyContent : "center",
    },
    wrapper : {
        justifyContent : "center",
        alignItems : "center",
    },
});

FriendShipRequests.propTypes = {
    navigation              : PropTypes.any,
    fetchMyFriends          : PropTypes.func,
    userCode                : PropTypes.any,
    setUserData             : PropTypes.func,
    friends                 : PropTypes.array,
    photo                   : PropTypes.string,
    verified                : PropTypes.bool,
    setVerified             : PropTypes.func,
    friendshipRequests      : PropTypes.array,
    fetchFriendshipRequest  : PropTypes.func,
};

export default withUserData(FriendShipRequests);