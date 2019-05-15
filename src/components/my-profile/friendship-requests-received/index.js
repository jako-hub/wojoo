import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Alert,
} from 'react-native';
import {
    View,
    Text,
    List,
    Button,
} from 'native-base';
import { withUserData, withApi } from '../../../providers';
import { LoadingSpinner } from '../../../commons/loaders';
import RequestItem from './RequestItem';
import OthersElement from './OthersElement';
import endpoints from '../../../configs/endpoints';
import { addMessage, consoleError } from '../../../utils/functions';

/**
 * This component renders the received friendship requests by other users.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class FriendshipRequestsReceived extends React.Component {
    state = {
        loading : true,
        showOthers : false,
    };

    componentDidMount() {        
        this.fetchRequests();
    }

    /**
     * This function allows to fetch the current requests.
     */
    async fetchRequests() {
        this.setState({loading: true});
        await this.props.fetchFriendshipRequest();
        this.setState({loading: false});
    }

    /**
     * This function toggles the others visualization.
     */
    toggleOthers() {
        this.setState({
            showOthers : !this.state.showOthers,
        });
    }

    /**
     * This function is triggered when the user accept the request.
     * @param {*} request 
     */
    async onAccept({codigo_jugador_solicitud:requestCode, jugador_nombre_corto:playerName}) {
        const {doPost, startLoading, stopLoading, removeFriendshipRequest,} = this.props;
        startLoading();
        const response = await doPost(endpoints.jugador_solicitud.respuesta, {
            solicitud : requestCode,
            respuesta : 's',
        });
        const {error, error_controlado} = response;
        if(error || error_controlado) {
            consoleError("Friendship request accept: ", response);
            addMessage("Ocurrió un error al aceptar la solicitud");
        } else {
            addMessage(`${playerName} y tu ahora son amigos`);
            removeFriendshipRequest(requestCode);
        }
        stopLoading();
    }

    /**
     * This function is triggered when the user cancel the request.
     * @param {*} request 
     */
    onCancel(request) {
        Alert.alert(
            "Cancelar solicitud",
            "¿Seguro desea cancelar la solicitud?",
            [
                {text : "No"},
                {text : "Si", onPress : () => this.cancelRequest(request) },
            ],
        );
    }

    /**
     * This method calls in api the endpoint to mark a requests as "not accepted"
     * @param {*} param0 
     */
    async cancelRequest({codigo_jugador_solicitud:requestCode}) {
        const {doPost, startLoading, stopLoading, removeFriendshipRequest,} = this.props;
        startLoading();
        const response = await doPost(endpoints.jugador_solicitud.respuesta, {
            solicitud : requestCode,
            respuesta : 'n',
        });
        const {error, error_controlado} = response;
        if(error || error_controlado) {
            consoleError("Friendship request cancel: ", response);
            addMessage("Ocurrió un error al cancelar la solicitud");
        } else {
            addMessage("Se ha cancelado la solicitud");
            removeFriendshipRequest(requestCode);
        }
        stopLoading();
    }

    /**
     * 
     * @param {*} param0 
     */
    onViewProfile({codigo_jugador:playerCode, jugador_seudonimo:playerAlias}) {
        const {navigation, onViewProfile} = this.props;
        if(navigation) {
            if(onViewProfile) {
                onViewProfile();
            }
            navigation.navigate("PlayerProfile", {playerCode, playerAlias});
        }
    }

    renderList() {
        const {friendshipRequests=[], maxResults=2} = this.props;
        const {showOthers} = this.state;
        const totalPlayers = friendshipRequests.length;
        let players = friendshipRequests, others = [], totalOthers = 0;
        if(!showOthers) {
            players = friendshipRequests.slice(0,maxResults);
            others = friendshipRequests.slice(maxResults);
            totalOthers = others.length;
        }
        if(totalPlayers === 0) return (
            <View style = { styles.empty }>
                <Text note >No hay solicitudes de amistad pendientes</Text>
            </View>
        );
        return (
            <View style = { styles.list }>
                <List>
                    {players.map((item, key) => (
                        <RequestItem 
                            key = { `friendship-request-item-list-${key}-${item.codigo_jugador_solicitud}` }
                            request = { item }
                            onAccept = { () => this.onAccept(item) }
                            onCancel = { () => this.onCancel(item) }
                            onViewProfile = { () => this.onViewProfile(item) }
                        />
                    ))}
                    {!showOthers && (totalOthers > 0) && (
                        <OthersElement others = { others } toggleOthers = { () => this.toggleOthers() } />
                    )}
                    {showOthers && (totalPlayers > maxResults) && (
                        <View style = { styles.buttonHide }>
                            <Button light onPress = { () => this.toggleOthers() }>
                                <Text>Ver menos</Text>
                            </Button>
                        </View>
                    )}
                </List>
            </View>
        );
    }

    renderLoader() {
        return (
            <View style = { styles.loader }>
                <LoadingSpinner />
            </View>
        );
    }

    render() {
        const {loading} = this.state;        
        const {onlyIfResults, friendshipRequests=[]} = this.props;
        let content = null;
        const total = friendshipRequests.length;
        if(loading) {
            content = this.renderLoader();
        } else if(total === 0 && onlyIfResults) {
            return null;
        } else {
            content = this.renderList();
        }
        return (
          <View style = {styles.root}>
                <View style = { styles.header }>
                    <Text style = { styles.headerText }>Solicitudes de amistad</Text>
                </View>
              {content}
          </View>  
        );
    }
}

const styles = StyleSheet.create({
    root : {

    },
    header : {
        backgroundColor : "#f7f7f7",
        padding         : 15,
    },
    headerText : {
        textAlign : "center",
        color : "#707070",
    },
    empty : {
        paddingVertical : 15,
        justifyContent  : "center",
        alignItems      : "center",
    },
    buttonHide : {alignItems : "center", flexDirection : "row", justifyContent : "center"}
});

FriendshipRequestsReceived.propTypes = {
    navigation                  : PropTypes.any.isRequired,
    userCode                    : PropTypes.any,
    friendshipRequests          : PropTypes.array,
    friendshipRequestsReceived  : PropTypes.array,
    fetchFriendshipRequest      : PropTypes.func,
    removeFriendshipRequest     : PropTypes.func,
    maxResults                  : PropTypes.number,
    doPost                      : PropTypes.func,
    startLoading                : PropTypes.func,
    stopLoading                 : PropTypes.func,
    onlyIfResults               : PropTypes.bool,
    onViewProfile               : PropTypes.func,
};

export default withUserData(withApi(FriendshipRequestsReceived));