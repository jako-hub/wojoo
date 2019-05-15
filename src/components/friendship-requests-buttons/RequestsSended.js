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
    Thumbnail,
    Right,
} from 'native-base';
import { withUserData, withApi } from '../../providers';
import { PrettyButton, IconButton } from '../../commons/forms';
import { SimpleModal } from '../../commons/modals';
import { DEFAULT_USER_IMG, IMAGES_SERVER } from 'react-native-dotenv';
import endpoints from '../../configs/endpoints';
import { consoleError, addMessage } from '../../utils/functions';

const MAX_CHARS = 20;

const nameResume = name => {
    if(name.length > MAX_CHARS) return `${name.substring(0, MAX_CHARS)}...`;
    return name;
}

const PlayerItem = ({ item, onViewProfile, onCancel }) => (
    <ListItem avatar noBorder noIndent>
        <Left>
            <TouchableOpacity onPress = { onViewProfile }>
                <Thumbnail 
                    source = { {uri : (item.foto? `${IMAGES_SERVER}${item.foto}` : DEFAULT_USER_IMG)} } 
                />
            </TouchableOpacity>
        </Left>
        <Body>
            <TouchableOpacity onPress = { onViewProfile }>
                <Text>{nameResume(item.jugador_nombre_corto)}</Text>
                <Text note>{item.jugador_seudonimo}</Text>
            </TouchableOpacity>
        </Body>
        <Right>
            <IconButton 
                icon = {"times"}
                small
                onPress = { onCancel }
            />
        </Right>
    </ListItem>
);

class RequestsSended extends React.Component {
    componentDidMount() {
        this.props.fetchUserSendedRequests();
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
        if(this.props.onViewProfile) this.props.onViewProfile(objPlayer);
    }

    async onCancelRequest({codigo_jugador_solicitud}) {
        const {startLoading, stopLoading} = this.props;
        startLoading();
        try {
            const response = await this.props.doPost(endpoints.jugador_solicitud.cancelar, {
                solicitud : codigo_jugador_solicitud
            });
            const {error, error_controlador} = response;
            if(error || error_controlador) {
                addMessage("Error al cancelar la solicitud");
            } else {
                await this.props.fetchUserSendedRequests();
                addMessage("Se canceló la solicitud de amistad.");
            }
        } catch (err) {
            consoleError("Cancel friendship request", err);
            addMessage("Error al cancelar la solicitud");
            
        } finally {
            stopLoading();
        }
    }

    render() {
        const {friendshipRequestsSended=[] } = this.props;
        const total = friendshipRequestsSended.length;
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
                            {`${total} ${total > 1? "enviadas" : "enviada"}`}
                        </PrettyButton>
                    </View>
                </View>
            </View>
            <SimpleModal
                title   = "Solicitudes de amistad enviadas"
                open    = { openModal }
                onClose = { () => this.toggleModal() }
            >
                <List>
                    {friendshipRequestsSended.map((item, key) => (
                        <PlayerItem 
                            key = {`player-item-request-friendship-${key}`}
                            item = {item}
                            onViewProfile = { () => this.onViewProfile(item) }
                            onCancel = { () => this.onCancelRequest(item) }
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

RequestsSended.propTypes = {
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
    friendshipRequestsSended: PropTypes.array,
    fetchUserSendedRequests : PropTypes.func,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    doPost          : PropTypes.func,
};

export default withUserData(withApi(RequestsSended));