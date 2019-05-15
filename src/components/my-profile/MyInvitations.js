import React from 'react';
import PropTypes from 'prop-types';
import { SimpleModal } from '../../commons/modals';
import { withApi } from '../../providers';
import endpoints from '../../configs/endpoints';
import { addMessage, consoleError } from '../../utils/functions';
import { LoadingSpinner } from '../../commons/loaders';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { IconButton } from '../../commons/forms';

const InvitationContainer = ({date, text, onPress, onCancel}) => (
    <View style = { styles.rootContainer }>
        <View style = { styles.iconWrapper }>
            <Icon name = "futbol" size = {35} />
        </View>
        <View style = { styles.textWrapper }>
            <TouchableOpacity onPress = {onPress}>
                <Text>{text}</Text>
            </TouchableOpacity>
        </View>
        <View>
            <IconButton icon = "times" onPress = { onCancel } />
        </View>
    </View>
);

class MyInvitations extends React.Component {
    state = {
        invitations : [],
        loading : true,
    };

    componentDidMount() {
        this.fetchInvitations();
    }

    async fetchInvitations() {
        this.setState({loading : true});
        const {doPost, userCode} = this.props;
        const response = await doPost(endpoints.juego.invitaciones, {
            jugador : userCode,
        });
        try {
            const {error, error_controlado} = response;
            if(error || error_controlado) {
                addMessage("Ocurrió un error al listar las publicaciones del jugador");
            } else {
                this.setState({
                    invitations : response,
                });
            }
        } catch(err) {
            addMessage("Ocurrió un error al listar las publicaciones del jugador");
        } finally {
            this.setState({loading : false});
        }
    }

    async rejectInvitation({codigo_juego_invitacion}) {        
        const {doPost, startLoading, stopLoading,} = this.props;
        try {
            startLoading();
            const response = await doPost(endpoints.juego.rechazarInvitacion, {
                invitacion : codigo_juego_invitacion,
            });
            const {error, error_controlado} = response;
            if(error || error_controlado) {
                addMessage("Ocurrió un error al rechazar la invitación");
            } else {
                this.setState(({invitations}) => ({
                    invitations : invitations.filter(item => item.codigo_juego_invitacion !== codigo_juego_invitacion),
                }));
                addMessage("Has rechazado la invitación a este juego");
            }
        } catch(err) {
            addMessage("Ocurrió un error al rechazar la invitación");
            consoleError("Reject game invitation", err);
        } finally {
            stopLoading();
        }
    }

    renderList() {
        const {invitations=[]} = this.state;
        const {goToGame} = this.props;
        return (
            <View style = { styles.root }>
                {invitations.length === 0 && (
                    <Text style = {{textAlign : "center"}}>No hay invitaciones pendientes</Text>
                )}
                {invitations.map((item, key) => (
                    <InvitationContainer 
                        key = {`item-new-profile-${key}`} 
                        date = {item.fecha}
                        text = {item.nombre_juego}
                        onPress = {() => {                            
                            if(goToGame) goToGame(item);
                            this.props.onClose();
                        }}
                        onCancel = { () => this.rejectInvitation(item) }
                    />
                ))}
            </View>
        );
    }

    render() {
        const {
            open,
            onClose
        } = this.props;
        const {loading} = this.state;
        let content = null;
        if (loading) content = (<View style = { styles.rootLoading }><LoadingSpinner /></View>);
        else content = this.renderList();
        return (
            <SimpleModal
                open    = { open    }
                onClose = { onClose }
            >
                {content}
            </SimpleModal>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
    },
    iconWrapper : {
        flex : 2,
        justifyContent : "center",
        alignItems : "center",
    },
    textWrapper : {
        flex : 10,
    },
    rootContainer : {
        flex : 1,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
    },
});

MyInvitations.propTypes = {
    open : PropTypes.bool,
    onClose : PropTypes.func,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    userCode        : PropTypes.any,
    upload          : PropTypes.func,
    goToGame        : PropTypes.func,
};

export default withApi(MyInvitations);