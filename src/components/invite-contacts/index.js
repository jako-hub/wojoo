import React from 'react';
import PropTypes from 'prop-types';
import { SimpleModal } from '../../commons/modals';
import { Text, } from 'native-base';
import { Modal } from 'react-native';
import ContactList from './ContactsList';
import { withApi } from '../../providers';
import endpoints from '../../configs/endpoints';
import { addMessage } from '../../utils/functions';
class InviteContacts extends React.PureComponent {

    filterPhoneNumber(phoneNumber) {
        return phoneNumber.replace(/[\(\) \-\+]/g, '');
    }

    async onSelectContacts(contacts=[]) {
        const phoneNumbers = contacts.map(contact => {
            const [phoneNumber] = contact.phoneNumbers;
            if(phoneNumber) return this.filterPhoneNumber(phoneNumber.number);
            return '';
        });
        const {doPost, startLoading, stopLoading, userCode} = this.props;
        this.props.onClose();
        try {
            startLoading();
            const response = await doPost(endpoints.usuarios.invitarAJako, {
                jugador : userCode,
                telefonos : phoneNumbers,
            });
            if(response === true) {
                addMessage(`${phoneNumbers.length > 1? "Se han enviado las invitaciones a tus contactos" : "Se ha enviado la invitación al contacto"}`);
            } else {
                addMessage("Error al invitar a contactos");
            }
        } catch (err) {
            addMessage("Error al invitar a contactos");
        } finally {            
            stopLoading();
        }        
    }

    render() {
        const { open, onClose, } = this.props;
        if(!open) return false;
        return(            
            <Modal
                open            = { open }
                onRequestClose  = { onClose }
                
            >
                <ContactList 
                    onSelectContacts = { contacts => this.onSelectContacts(contacts) }
                    showIfRegistered
                    enabledFormAdd
                />
            </Modal>
        )
    }
}

InviteContacts.propTypes = {
    open    : PropTypes.bool.isRequired,
    onClose : PropTypes.func,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
    doPost          : PropTypes.func,
    userCode        : PropTypes.any,
};

export default withApi(InviteContacts);