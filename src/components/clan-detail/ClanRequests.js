import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Alert,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import { SimpleLoader } from '../../commons/loaders';
import { withApi } from '../../providers';
import endpoints from '../../configs/endpoints';
import { addMessage, consoleError } from '../../utils/functions';
import { PrettyButton } from '../../commons/forms';
import {IMAGES_SERVER, DEFAULT_USER_IMG} from 'react-native-dotenv';
import { SimpleTouch } from '../../commons/touchables';
import { PhotoDisplay } from '../../commons/containers';

const MAX_CHARS = 20;

const RequestItem = ({photo, fullname, playerName, onView, onAccept, onReject}) => {
    const imageSrc = photo? {uri : `${IMAGES_SERVER}${photo}`} : {uri : `${IMAGES_SERVER}${DEFAULT_USER_IMG}`};
    const displayName = fullname.length > MAX_CHARS? fullname.substring(0, MAX_CHARS) + '...' : fullname;
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
                    <Text>{displayName}</Text>
                    <Text note>{playerName}</Text>
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

class ClanRequests extends React.Component {
    state = {
        loading : true,
        requests : [],
        viewList : false,
    };

    componentDidMount() {
        this.fetchData();
    }

    onViewPlayer({jugador_codigo}) {

    }

    async onApprove({codigo_solicitud, jugador_seudonimo:playerName}) {
        const {
            startLoading,
            stopLoading,
            doPost,
            onApprove,
        } = this.props;
        try {
            startLoading();
            const response = await doPost(endpoints.clan.aprobarSolicitud, {
                solicitud : codigo_solicitud,
            });
            const {error, error_controlado} = response;
            if(error) {
                addMessage("Ocurrió un error al aprobar la solicitud");
                consoleError("Approve request: ", response);
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                this.setState(({requests}) => ({
                    requests : requests.filter(item => item.codigo_solicitud !== codigo_solicitud),
                }), () => {
                    if(onApprove) {
                        onApprove();
                    }
                });
                addMessage(`Ahora ${playerName} es miembro de tu clan`);
            }
        } catch (response) {
            addMessage("Ocurrió un error al aprobar la solicitud");
        } finally {
            stopLoading();
        }
    }

    onReject(request) {
        Alert.alert(
            "Cancelar solicitud",
            "¿Seguro desea cancelar la solicitud?",
            [
                {text : "No"},
                {text : "Si", onPress : () => this.rejectRequest(request) },
            ],
        );
    }

    async rejectRequest({codigo_solicitud}) {
        const {
            startLoading,
            stopLoading,
            doPost,
            onApprove,
        } = this.props;
        try {
            startLoading();
            const response = await doPost(endpoints.clan.rechazarInvitacion, {
                invitacion : codigo_solicitud,
            });
            const {error, error_controlado} = response;
            if(error) {
                addMessage("Ocurrió un error al rechazar la solicitud");
                consoleError("Approve request: ", response);
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                this.setState(({requests}) => ({
                    requests : requests.filter(item => item.codigo_solicitud !== codigo_solicitud),
                }), () => {
                    if(onApprove) {
                        onApprove();
                    }
                });
                addMessage("Se ha cancelado la solicitud");
            }
        } catch (response) {
            addMessage("Ocurrió un error al rechazó la solicitud");
        } finally {
            stopLoading();
        }
    }

    async fetchData() {
        const {doPost, clanCode} = this.props;
        this.setState({loading : true});
        try {
            const response = await doPost(endpoints.clan.solicitudesRecibidas, {
                clan : clanCode,
            });
            const {error, error_controlado} = response;
            if(error) {
                addMessage("Ocurrió un error al listar las solicitudes del clan");
                consoleError("list requests: ", response);    
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                this.setState({
                    requests : response,
                });
            }
        } catch(response) {
            addMessage("Ocurrió un error al listar las solicitudes del clan");
            consoleError("list requests: ", response);
        } finally {
            this.setState({loading : false});
        }        
    }

    renderList(requests=[]) {

        return (
            <View style = { styles.list }>
                {requests.map((item, key) => (
                    <RequestItem
                        key         = { `request-item-list-${key}` }
                        photo       = { item.foto }
                        fullname    = { item.jugador_nombre_corto }
                        playerName  = { item.jugador_seudonimo }
                        onView      = { () => this.onViewPlayer(item) }
                        onAccept    = { () => this.onApprove(item) }
                        onReject    = { () => this.onReject(item) }
                     />
                ))}
            </View>
        );
    }

    renderButton() {
        const {requests=[], viewList,} = this.state;
        const total = requests.length;
        return (
            <View style = { styles.textWrapper }>
                <Text note>
                    {total} {total > 1? `jugadores quieren`: `jugador quiere`} pertenecer a este clan
                </Text>
                <View style = { styles.buttonWrapper }>
                    <PrettyButton onPress = { () => this.toggleViewList() } >
                        {viewList? 'Ocultar' : 'Ver'} 
                    </PrettyButton>
                </View>                
            </View>
        );
    }

    toggleViewList() {
        this.setState({
            viewList : !this.state.viewList,
        });
    }

    render() {
        const {loading, requests=[], viewList} = this.state;
        let content = null;
        if(loading) {
            content = (<SimpleLoader />);
        } else if(requests.length > 0) {
            content = this.renderButton();
        }
        return (
            <View>
                {content}
                {viewList && this.renderList(requests)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textWrapper : {
        alignItems : "center",
    },
    buttonWrapper : {
        marginTop : 10,
    },
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

ClanRequests.propTypes = {
    clanCode : PropTypes.any,
    doPost          : PropTypes.func,
    onApprove       : PropTypes.func,
};

export default withApi(ClanRequests);