import React from 'react';
import PropTypes from 'prop-types';
import { withUserData, withApi } from '../../providers';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import { PrettyButton } from '../../commons/forms';
import endpoints from '../../configs/endpoints';
import { addMessage, consoleError } from '../../utils/functions';
class ClanActions extends React.PureComponent {

    requestSended() {
        const {
            clanCode, 
            //receivedClanRequests, 
            sendedClanRequests=[],
        } = this.props;
        const selected = sendedClanRequests.find(item => item.codigo_clan === clanCode);
        return Boolean(selected);
    }

    isInClan() {
        const {
            clanCode,
            clans=[],
        } = this.props;
        const selected = clans.find(item => item.codigo_clan === clanCode);
        return Boolean(selected);
    }

    async cancelRequest() {
        const {
            sendedClanRequests=[],
            doPost,
            fetchClanRequestsSended,
            startLoading,
            stopLoading,
            clanCode,
            fetchPlayerClanes,
        } = this.props;
        const selected = sendedClanRequests.find(item => item.codigo_clan === clanCode);
        try {
            startLoading();
            const response = await doPost(endpoints.clan.cancelarSolicitud, {
                solicitud : selected.codigo_jugador_clan
            });
            const {error, error_controlado} = response;
            if(error) {
                consoleError("Cancel clan request: ", response);
                addMessage("Ocurrió un error al cancelar la solicitud");
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                addMessage("Se ha cancelado la solicitud");
                await fetchPlayerClanes();
                await fetchClanRequestsSended();
            }
        } catch (response) {
            consoleError("Cancel clan request: ", response);
            addMessage("Ocurrió un error al cancelar la solicitud");
        } finally {
            stopLoading();
        }
    }

    async joinToClan() {
        const {
            doPost,
            fetchClanRequestsSended,
            fetchPlayerClanes,
            startLoading,
            stopLoading,
            clanCode,
            userCode,
            onJoin,
        } = this.props;
        try {
            startLoading();
            const response = await doPost(endpoints.clan.unirse, {
                clan    : clanCode,
                jugador : userCode,
            });
            const {error, error_controlado} = response;
            if(error) {
                consoleError("Join to clan request: ", response);
                addMessage("Ocurrió un error al enviar la solicitud");
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {                
                addMessage(response);
                await fetchPlayerClanes();
                await fetchClanRequestsSended();
                onJoin();
            }
        } catch (response) {
            consoleError("Join clan request: ", response);
            addMessage("Ocurrió un error al enviar la solicitud");
        } finally {
            stopLoading();
        }
    }

    async quitClan() {
        const {
            doPost,
            fetchClanRequestsSended,
            startLoading,
            stopLoading,
            clanCode,
            fetchPlayerClanes,
            userCode,
            onJoin,
        } = this.props;
        try {
            startLoading();
            const response = await doPost(endpoints.clan.abandonar, {
                jugador : userCode,
                clan : clanCode,
            });
            const {error, error_controlado} = response;
            if(error) {
                consoleError("Cancel clan request: ", response);
                addMessage("Ocurrió un error al cancelar la solicitud");
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                addMessage("Has abandonado el clan");
                await fetchPlayerClanes();
                await fetchClanRequestsSended();
                onJoin();
            }
        } catch (response) {
            consoleError("Cancel clan request: ", response);
            addMessage("Ocurrió un error al cancelar la solicitud");
        } finally {
            stopLoading();
        }
    }

    render() {
        const isSended = this.requestSended();
        const isInClan = this.isInClan();
        return (
            <View style = { styles.root }>
                {!isSended && !isInClan && ( <PrettyButton onPress = { this.joinToClan.bind(this) } small>Unirse</PrettyButton> )}
                {isSended && !isInClan && (
                    <View style = { styles.centeredContent }>
                        <Text note> Tu solicitud está pendiente</Text>                        
                        <View>
                            <PrettyButton onPress={this.cancelRequest.bind(this)} small primary>Cancelar</PrettyButton>
                        </View>
                    </View>
                )}
                {isInClan && (
                    ( <PrettyButton onPress = { this.quitClan.bind(this) } small>Abandonar</PrettyButton> )
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flexDirection : "row",
        justifyContent : "center",
        paddingVertical : 15,
    },
    centeredContent : {
        flexDirection : "column",
        alignItems : "center",
        justifyContent : "center",         
    },
});

ClanActions.propTypes = {
    clanCode : PropTypes.any,
    fetchClanRequestsSended : PropTypes.func,
    fetchPlayerClanes           : PropTypes.func,
    onJoin      : PropTypes.func,
};

export default withUserData(withApi(ClanActions));