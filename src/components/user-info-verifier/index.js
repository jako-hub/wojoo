import React from 'react';
import { withApi, withSession, withUserData } from '../../providers';
import PropTypes from 'prop-types';
import { consoleError, addMessage } from '../../utils/functions';
import endpoints from '../../configs/endpoints';
import {
    Toast,
} from 'native-base';
import PseudonymHelper from './PseudonymHelper';
import { IMAGES_SERVER } from 'react-native-dotenv';
import FriendsSearchSuggester from '../friends-search-suggester';

class UserInfoVerifier extends React.Component {
    state = {
        pseudonymHelper : false,
        displayFriendSuggester : false,
    }

    componentDidMount() {
        this.getUserInfo();
    }

    toggleFlag(key) {
        this.setState({
            [key] : !this.state[key],
        });
    }

    async getUserInfo() {
        // The first thing we do is bring the user information
        await this.getPersonalInfo();
        // Then we fetch the user friends
        await this.props.fetchMyFriends(this.props.userCode);
        await this.props.fetchUserSendedRequests();
        this.setState({displayFriendSuggester : true});
    }

    async getPersonalInfo() {
        const {userCode} = this.props.sessionStack; 
        if(this.props.verified) { return false; }
        let fetched = false;
        await this.props.doPost(endpoints.usuarios.informacion, {
                codigo_usuario : userCode,
        }).then(response => {
            const {error_controlado, validacion, error} = response;            
            if(!error_controlado && !error && !validacion) {
                const {seudonimo, foto, thumb, puntos} = response;
                this.props.sessionWrite("user_info", response);
                if(!seudonimo) {
                    this.setState({
                        pseudonymHelper : true
                    });
                } 
                if(puntos) {
                    this.props.setUserData({
                        moneyPoints : parseInt(puntos),
                    });
                }
                if(foto) {
                    this.props.setUserData({
                        photo : `${IMAGES_SERVER}${thumb}`,
                        photoOriginal : `${IMAGES_SERVER}${foto}`,
                    });
                }
            } else if(validacion) {
                addMessage("El usuario no exíste");
                this.props.logout();
                this.props.navigation.navigate("Auth");

            } else {
                addMessage("Error al obtener la información del jugador");
                consoleError("Fetch user info: ", response);
            }
            fetched = true;
        }).catch(response => {
            Toast.show({text : "Error al obtener la información del jugador"});
            consoleError("Fetch user info: ", response);
            fetched = false;
        });
        return fetched;
    }

    onSavePseudonym(pseudonym) {
        const userInfo = {
            ...this.props.sessionStack.user_info,
            pseudonym,
        };
        this.props.sessionWrite("user_info", userInfo);
        this.setState({
            pseudonymHelper : false,
        });
        // Todo : Call next validation.
    }

    render() {
        const {
            pseudonymHelper,
            displayFriendSuggester,
        } = this.state;
        const {
            enableFriendSuggester,
            navigation,
        } = this.props;
        return (
            <>
                {true && (
                    <PseudonymHelper 
                        open    = {pseudonymHelper}
                        onSave  = {this.onSavePseudonym.bind(this)}
                    />
                )}
                { enableFriendSuggester && displayFriendSuggester && (<FriendsSearchSuggester navigation = {navigation} />) }
            </>
        );
    }
}

UserInfoVerifier.propTypes = {
    navigation      : PropTypes.any,
    sessionStack    : PropTypes.object,
    sessionWrite    : PropTypes.func,
    doPost          : PropTypes.func,
    logout          : PropTypes.func,
    fetchMyFriends      : PropTypes.func,
    enableFriendSuggester : PropTypes.bool,
    fetchUserSendedRequests : PropTypes.func,
};

export default withApi(withSession(withUserData(UserInfoVerifier)));