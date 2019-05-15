import React from 'react';
import PropTypes from 'prop-types';
import { PermissionsAndroid } from 'react-native';
import BlackScreen from './BlackScreen';
import { addMessage, consoleError } from '../../utils/functions';

export const READ_PHONE_STATE = 'android.permission.READ_PHONE_STATE';
export const READ_CONTACTS = 'android.permission.READ_CONTACTS';
export const CAMERA = 'android.permission.CAMERA';
export const READ_SMS = 'android.permission.READ_SMS';

class PermissionsManager extends React.Component {
    state = {
        withPermission : false,
    }

    componentDidMount() {
        this.requestPermissions();
    }

    onRequestAgain() {
        this.requestPermissions();
    }

    async requestPermissions() {
        try {
            const {permissions=[]} = this.props;
            const result = await PermissionsAndroid.requestMultiple(permissions);
            let hasPermission = true;
            permissions.map(permission => {
                if(result[permission] !== 'granted') hasPermission = false;
            });
            if(hasPermission) {
                this.setState({
                    withPermission : true,
                }, () => {
                    if(this.props.onValidatePermissions) 
                        this.props.onValidatePermissions();
                });
            }
        } catch (err) {
            consoleError(err);
            addMessage("Error solicitando permisos");
        }
    }
    
    render() {
        const { withPermission } = this.state;
        const { children } = this.props;
        return (
            <>
                { withPermission && children }
                { !withPermission && (<BlackScreen onRequestAgain = { () => this.onRequestAgain() } />) }
            </>
        );
    }
}

PermissionsManager.propTypes = {
    permissions : PropTypes.array,
    onValidatePermissions : PropTypes.func,
};

export default PermissionsManager;