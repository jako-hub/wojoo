import React from 'react';
import PropTypes from 'prop-types';
import {SimpleHeader, PhotoDisplay} from '../../commons/containers';
import {
    View,
    Text,
} from 'native-base';
import {StyleSheet, Alert,} from 'react-native';
import {IMAGES_SERVER} from 'react-native-dotenv';
import defaultClanImage from '../../assets/images/default-clan-image.png';
import { SimpleLoader } from '../../commons/loaders';
import { withUserData, withApi } from '../../providers';
import { PrettyButton } from '../../commons/forms';
import { SimpleTouch } from '../../commons/touchables';
import endpoints from '../../configs/endpoints';
import { consoleError, addMessage } from '../../utils/functions';
import { EmptyText } from '../../commons/others';

const Content = ({children, loading}) => (
    <View>
        <SimpleHeader title = "Invitaciones clanes" />
        {loading && (<SimpleLoader />)}
        {!loading && children}
    </View>
);


const InvitationItem = ({photo, playerName, clanName, onView, onAccept, onReject}) => {
    const imageSrc = photo? {uri : `${IMAGES_SERVER}${photo}`} : defaultClanImage;
    return (
        <View style = { styles.listItem }>
            <View style = { styles.imageWrapper }>
                <SimpleTouch onPress = { onView } >
                    <PhotoDisplay 
                        avatar
                        imageSource = { imageSrc }
                    />
                </SimpleTouch>
            </View>
            <View style = { styles.contentWrapper }>
                <SimpleTouch wrapType = "stretch" onPress = { onView }>                    
                    <Text>{playerName} te invita a {clanName}</Text>
                </SimpleTouch>
            </View>
            <View style = { styles.actionsWrapper }>
                <PrettyButton small primary onPress = { onAccept }>
                    Si
                </PrettyButton>
                <PrettyButton small onPress = { onReject }>
                    No
                </PrettyButton>
            </View>
        </View>
    );
};


class ClanInvitations extends React.Component {
    state = {
        loading : true,
    };

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const {fetchClanInvitations} = this.props;
        this.setState({loading : true});
        await fetchClanInvitations();
        this.setState({loading : false});
    }

    async onAcceptClanInvitation({codigo_jugador_clan:clanCode, clan_nombre}) {
        const {doPost, startLoading, stopLoading, removeClanInvitation} = this.props;
        startLoading();
        try {            
            const response = await doPost(endpoints.clan.aceptarInvitacion, {
                invitacion : clanCode,
            });
            const {error, error_controlado} = response;
            if(error) {
                consoleError("Accept clan invitation", response);
                addMessage("Ocurrió un error al aceptar la invitación");
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                addMessage(`Ahora perteneces al clan ${clan_nombre}`);
                removeClanInvitation(clanCode);
            }
        } catch {
            consoleError("Accept clan invitation", response);
            addMessage("Ocurrió un error al aceptar la invitación");
        } finally {
            stopLoading();
        }
    }

    async onRejectClanInvitation({codigo_jugador_clan:clanCode, clan_nombre}) {
        Alert.alert(
            "Cancelar solicitud",
            "¿Seguro desea cancelar la invitación?",
            [
                {text : "No"},
                {text : "Si", onPress : () => this.rejectInvitation(clanCode) },
            ],
        );
    }

    async rejectInvitation(clanCode) {
        const {doPost, startLoading, stopLoading, removeClanInvitation} = this.props;
        startLoading();
        try {            
            const response = await doPost(endpoints.clan.rechazarInvitacion, {
                invitacion : clanCode,
            });
            const {error, error_controlado} = response;
            if(error) {
                consoleError("Reject clan invitation", response);
                addMessage("Ocurrió un error al rechazar la invitación");
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                addMessage(`Se ha rechazado la invitación al clan`);
                removeClanInvitation(clanCode);
            }
        } catch {
            consoleError("Reject clan invitation", response);
            addMessage("Ocurrió un error al rechazar la invitación");
        } finally {
            stopLoading();
        }
    }

    onView({codigo_clan}) {
        const {onClose, navigation, } = this.props;
        navigation.navigate('ClanDetail', {
            clanCode : codigo_clan
        });
        onClose();
    }

    render() {
        const {
            loading,
        } = this.state;
        const {clanInvitations=[], hideIfEmpty} = this.props;    
        if(hideIfEmpty && clanInvitations.length === 0) {
            return null;
        }
        return (
            <Content loading = {loading}>
                {clanInvitations.length === 0 && (
                    <EmptyText text = "No hay invitaciones a clanes" />
                )}
                {clanInvitations.map((item, key) => (
                    <InvitationItem 
                        key         = { `invitation-item-notifier-${key}`       }
                        photo       = { item.foto                               }
                        clanName    = { item.clan_nombre                        }
                        playerName  = { item.jugador_seudonimo                  }
                        onAccept    = { () => this.onAcceptClanInvitation(item) }
                        onReject    = { () => this.onRejectClanInvitation(item) }
                        onView      = { () => this.onView(item)                 }
                    />
                ))}
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    listItem : {
        marginVertical  : 10,
        flexDirection   : "row",
        alignItems      : "center",
        justifyContent  : "center",
        paddingHorizontal : 5,
    },
    image : {
        width           : 30,
        height          : 30,
        backgroundColor : "#e0e0e0",
        borderRadius    : 100,
    },
    imageWrapper : {
        flex            : 2,
        justifyContent  : "center",
        alignItems      : "center",
    },
    contentWrapper : {
        flex        : 12,
        paddingLeft : 10,
    },
    actionsWrapper : {
        flexDirection   : "row",
        flex            : 7,
        alignItems : "center",
        justifyContent : "center",
    },
    contentTitle : {
        fontSize : 14,
    },
});

ClanInvitations.propTypes = {
    fetchClanInvitations    : PropTypes.func,
    clanInvitations         : PropTypes.array,
    doPost                  : PropTypes.func,
    userCode                : PropTypes.any,
    removeClanInvitation    : PropTypes.func,
    hideIfEmpty             : PropTypes.bool,
    onClose                 : PropTypes.func,
};

export default withUserData(withApi(ClanInvitations));