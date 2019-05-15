import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, } from 'react-native';
import { 
    View,
    Text,
 } from 'native-base';
import { PrettyButton, IconButton,} from '../forms';
import { withApi, withUserData } from '../../providers';
import endpoints from '../../configs/endpoints';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { addMessage, consoleError } from '../../utils/functions';
import { LoadingSpinner } from '../loaders';

class FriendshipButton extends React.Component {
    state = {
        loading : false,
    };

    async onRequestFriendship() {
        const {userCode, playerCode, doPost, onRequestDone} = this.props;
        this.setState({
            loading : true,
        });
        try {
            const response = await doPost(endpoints.jugador_solicitud.nuevo, {
                jugador         : userCode,
                jugador_destino : playerCode,
            });
            const {error, error_controlado, validacion} = response;
            if(error || error_controlado) {
                addMessage("Ocurrió un error al enviar la solicitud");
                consoleError(error);
            } else if(validacion){
                addMessage(validacion);
            } else {
                addMessage("Se ha enviado tu solicitud de amistad");
                await this.props.fetchFriendshipRequest();
                await this.props.fetchUserSendedRequests();
                this.setState({loading : false});
                console.log("the code: ", playerCode);
                if(onRequestDone) onRequestDone(playerCode);
            }
            this.setState({
                loading : false,
            });
        } catch (error) {
            consoleError(error);
            addMessage("Ocurrió un error al enviar la solicitud");
            this.setState({
                loading : false,
            });
        };
    }

    render() {
        const {
            loading,
        } = this.state;
        const { asIcon, icon="telegram-plane", sm, label="Solicitar amistad", size = 18 } = this.props;
        return (
            <View style = { styles.root }>
                <View>
                    {!asIcon && (
                        <PrettyButton 
                            primary 
                            loading = {loading} 
                            icon = {(<Icon name = {icon} size={size}  />)}
                            onPress = { () => this.onRequestFriendship() }
                            small = {sm}
                        
                        >
                            {label} 
                        </PrettyButton>
                    )}
                    {asIcon && !loading && (
                        <IconButton 
                            onPress = { () => this.onRequestFriendship() }
                            icon = "user-plus"  
                        />
                    )}
                    {asIcon && loading && (
                        <LoadingSpinner />
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        alignItems : "center"
    },
});

FriendshipButton.propTypes = {
    playerCode : PropTypes.any,
    sm         : PropTypes.bool,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    userCode        : PropTypes.any,
    upload          : PropTypes.func,
    asIcon          : PropTypes.bool,
    fetchFriendshipRequest  : PropTypes.func,
    fetchUserSendedRequests : PropTypes.func,
    onRequestDone           : PropTypes.func,
    label                   : PropTypes.string,
    
};

export default withApi(withUserData(FriendshipButton));