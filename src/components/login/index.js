import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from "./LoginForm";
import { IMEI } from '../../utils/constants';
import { PermissionsAndroid } from 'react-native';
import { consoleError } from '../../utils/functions';
import NoPermission from './NoPermission';
import { Toast } from 'native-base';
import { withApi } from '../../providers';

class LoginComponent extends React.Component {
    state = {
        form : {
            phoneNumber : "",
            password    : "",
        },
        imei : null,
        permission : true,
        requesting : false,
    };

    componentDidMount() {
        //this.requestPhonePermissions();
    }

    async requestPhonePermissions() {
        const stopRequesting = () => this.setState({requesting : false});
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
                {
                    message : "Para falicitar tu experiencia en la aplicación requerimos de ciertos permisos",
                    buttonPositive : 'Continuar',
                }
            );
            if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.setState({
                    permission : true,
                    requesting : false,
                }, () => {
                    this.getPhoneImei();
                });
            } if(granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                console.log("No preguntar de nuevo");
                stopRequesting();
            } else {
                stopRequesting();
            }
            
        } catch(err) {
            consoleError('Error al solicitar el permiso', granted);
        }
    }

    showMessage = (text) => Toast.show({ text });

    getPhoneImei() {
        /*
        if(!this.state.permission) {
            this.showMessage("La aplicación no tiene permiso para acceder al télefono");
            return false;
        }
        const phone = DeviceInfo.getPhoneNumber();
        console.log("The phone:", phone, 
            DeviceInfo.getPhoneNumber(),
            DeviceInfo.getBatteryLevel(),
        );
        IMEI.getImei().then(imeiList => {
            console.log("the email", imeiList)
        });
        */
    }

    onChange(name, value) {
        this.setState(({form}) => ({
            form : {
                ...form,
                [name] : value,
            },
        }));
    }

    togglePassword() {
        this.setState({
            viewPassword : !this.state.viewPassword,
        })
    }

    goToRegister() {
        this.props.navigation.navigate("Register");
    }

    onSubmit() {
        this.props.startLoading();
        setTimeout(() => {
            this.props.stopLoading();
        }, 3000);
    }

    requestAgain() {
        this.requestPhonePermissions();
    }

    render() {
        const {
            form,
            viewPassword,
            permission,
            requesting,
        } = this.state;
        return (
            <>
                {(requesting || permission) && (
                    <LoginForm
                        form            = {form}
                        onChange        = {this.onChange.bind(this)}
                        goToRegister    = {() => this.goToRegister()}
                        togglePassword  = {() => this.togglePassword()}
                        viewPassword    = {viewPassword}
                        onSubmit        = {() => this.onSubmit()}
                    />
                )}
                {(!requesting && !permission) && (
                    <NoPermission 
                        requestAgain = { () => this.requestAgain() }
                    />
                )}
            </>
        )
    }
}

LoginComponent.propTypes = {
    navigation      : PropTypes.object.isRequired,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    loading         : PropTypes.bool,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
};

export default withApi(LoginComponent);