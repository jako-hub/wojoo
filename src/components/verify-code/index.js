import React from 'react';
import VerifyCodeForm from './VerifyCodeForm';
import { withApi } from '../../providers';
import PropTypes from 'prop-types';
import endpoints from '../../configs/endpoints';
import { consoleError } from '../../utils/functions';
import { Toast } from 'native-base';

/**
 * This component allows to verify the user code.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 *
 * @class VerifyCode
 * @extends {React.Component}
 */
class VerifyCode extends React.Component {
    state = {
        verifyCode  : "",
        validCode   : false,
    };
    
    onSubmit() {
        /**
         * This little function allows as to reuse and reduce code to display a toast.
         */
        const showMessage = (text) => Toast.show({ text });
        const verifyCode = this.state.verifyCode;
        const {
            userNumber,
            imei,
        } = this.props;
        this.props.startLoading();                
        const data = {
            usuario : userNumber,
            codigo  : verifyCode,
            imei,     
        };
        this.props.doPost(endpoints.usuarios.verificar, data)
            .then(response => {                
                this.props.stopLoading();
                const {verificado, codigo_usuario} = response;
                if(verificado) {
                    this.props.onCodeVerified(codigo_usuario);
                } else {
                    showMessage('Código inválido');
                }        
            })
            .catch(response => {
                this.props.stopLoading();
                consoleError("Error registro", response);
                showMessage('Ocurrió un error inesperado');                
            });
    }

    onChange(code) {
        if(code && code.length > 4) {
            return false;
        } else {
            this.setState({
                verifyCode : code,
                validCode  : code.length === 4
            });
        }
        
    }

    render() {
        const {
            validCode,
            verifyCode,
        } = this.state;
        return (
            <VerifyCodeForm
                code     = { verifyCode                 }
                isValid  = { validCode                  }
                onChange = { this.onChange.bind(this)   }
                onSubmit = { () => this.onSubmit()      }
            />
        );
    }
}

VerifyCode.propTypes = {
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    doPost          : PropTypes.func,
    doGet           : PropTypes.func,
    onCodeVerified  : PropTypes.func,
    userNumber      : PropTypes.string.isRequired,
    imei            : PropTypes.string.isRequired,
};

export default withApi(VerifyCode);