import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import UserProfileCard from '../user-profile-card';
import UserOptions from './UserOptions';
import ImagePicker from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import { withSession, withApi, withUserData } from '../../providers';
import { consoleError, addMessage } from '../../utils/functions';
import endpoints from '../../configs/endpoints';
import { IMAGES_SERVER } from 'react-native-dotenv';
import MyPublications from './MyPublications';
import {
    View,
} from 'native-base';
import MyInvitations from './MyInvitations';
/**
 * This component handles the user profile actions.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 *
 * @class MyProfileComponent
 * @extends {React.Component}
 */
class MyProfileComponent extends React.Component {
    state = {
        openPublications : false,
        openInvitations : false,
    };
    onLogout() {
        const { navigation, logout } = this.props;
        if(logout) logout(navigation);
    }

    async requestPhonePermissions() {
        /*
        */  
        try {
            const permissions = [
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, 
                PermissionsAndroid.PERMISSIONS.CAMERA
            ];
            const result = await PermissionsAndroid.requestMultiple(permissions)
            const granted = result[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === 'granted' && 
                            result[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
            if(granted) {
                this.selectImage();
            } else {
                // Todo: Open configuration
                addMessage("La app no tiene permisos");
            }
        } catch(err) {
            consoleError('Requesting permissions');
        }
    }

    openImagePicker() {
        this.requestPhonePermissions();
    }

    selectImage () {
        const options = {
            title: 'Selecciona una imagen de perfil',
            takePhotoButtonTitle : 'Toma una foto',
            chooseFromLibraryButtonTitle : 'Selecciona de tu galería',
            cancelButtonTitle : 'Cancelar',
            cameraType : 'front',
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.uploadImage(response, this.props.sessionStack.userCode);
            }
        });
    }

    async uploadImage({fileName, type, uri}, userCode) {
        const data = new FormData();
        data.append("foto", {
            name : fileName,
            type,
            uri,
        });
        data.append("jugador", userCode);
        this.props.startLoading();
        try {
            const response = await this.props.upload(endpoints.jugador.guardarFoto, data)                        
            const {error, error_controlado, foto, thumb} = response;
            if(error || error_controlado) {
                addMessage("Ocurrió un error al guardar la imagen");
            } else if(response !== false){
                this.props.setUserData({
                    photo : `${IMAGES_SERVER}${thumb}`,
                    photoOriginal : `${IMAGES_SERVER}${foto}`,
                });
            } else {
                addMessage("Ocurrió un error al guardar la imagen");
            }
        } catch (response) {
            addMessage("Ocurrió un error al cargar la imagen");
        } finally {
            this.props.stopLoading();
        }
    }

    togglePublications() {
        this.setState({
            openPublications : !this.state.openPublications,
        });
    }
    toggleInvitations() {
        this.setState({
            openInvitations : !this.state.openInvitations,
        });
    }

    goToGame(game) {
        const navigation = this.props.navigation;
        navigation.navigate("JoinToGame", {selectedGame : game});
    }

    render() {
        const { userCode, navigation, photo } = this.props;
        const {openPublications, openInvitations} = this.state;
        return (
            <>
            <View style = { styles.root }>
                <UserProfileCard 
                    me
                    userPhoto           = { photo      }
                    playerCode          = { userCode   } 
                    navigation          = { navigation }
                    openImagePicker     = { () => this.openImagePicker() }
                    optionsComponent    = { (
                        <UserOptions 
                            onLogout = { () => this.onLogout() }
                            togglePublications = {() => this.togglePublications()}
                            toggleGameInvitations = {() => this.toggleInvitations()}

                        />
                    ) }
                />
            </View>
            {openPublications && 
                (
                <MyPublications 
                    open={openPublications} 
                    onClose = {() => this.togglePublications()}
                />                
                )}
            {openInvitations && (
                <MyInvitations 
                    open = {openInvitations}
                    onClose = {() => this.toggleInvitations()}
                    goToGame = {this.goToGame.bind(this)}
                />
            )}
            </>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
    },
});

MyProfileComponent.propTypes = {
    navigation  : PropTypes.object.isRequired,
    logout      : PropTypes.func,
    upload      : PropTypes.func,
    startLoading: PropTypes.func,
    stopLoading : PropTypes.func,
    setUserData : PropTypes.func,
};

export default withSession(withApi(withUserData(MyProfileComponent)));