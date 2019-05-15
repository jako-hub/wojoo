import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, } from 'react-native';
import { 
    View,
    Text,
 } from 'native-base';
import { PrettyButton,} from '../forms';
import { withApi, withUserData } from '../../providers';
import endpoints from '../../configs/endpoints';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { consoleError, addMessage } from '../../utils/functions';

class CancelFriendshipButton extends React.Component {
    state = {
        loading : false,
    };
    onCancelFriendship() {
        const {playerCode, startLoading, stopLoading, doPost, friendshipRequests=[]} = this.props;
        const request = friendshipRequests.find(item => item.codigo_jugador === playerCode);
        
        this.setState({loading : true});        
        doPost(endpoints.jugador_solicitud.respuesta, {
            solicitud : request.codigo_jugador_solicitud,
            respuesta : "n",
        })
        .then(response => {
            const { error, error_controlado } = response;
            if(error || error_controlado) {
                addMessage("Ocurrió un error al cancelar la solicitud");
                consoleError("Cancel request", response);
                this.setState({loading : false});
            } else {
                // Todo refresh the requests.
                addMessage("Se canceló la solicitud");
                setTimeout(() => {
                    this.props.removeFriendshipRequest(request.codigo_jugador_solicitud);                    
                }, 500);
                this.setState({loading : false});
            }
            
        })
        .catch(response => {
            consoleError("Cancel request", response);
            addMessage("Ocurrió un error al cancelar la solicitud");
            this.setState({loading : false});
        });
    }

    render() {
        const {loading} = this.state;
        return (
            <View style = { styles.root }>
                <PrettyButton 
                    icon = {(<Icon name = "times" size = {20} />)}
                    primary
                    disabled = { loading }
                    loading = { loading }
                    onPress = { () => this.onCancelFriendship() }
                    >
                        Rechazar
                </PrettyButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        marginTop : 10,
        marginHorizontal : 10,
        alignItems : "center"
    },
});

CancelFriendshipButton.propTypes = {
    playerCode : PropTypes.any,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    userCode        : PropTypes.any,
    upload          : PropTypes.func,
    friendshipRequests  : PropTypes.array,
    removeFriendshipRequest : PropTypes.func,
};

export default withApi(withUserData(CancelFriendshipButton));