import React from 'react';
import PropTypes from 'prop-types';
import { SubmitButton } from '../forms';
import { FriendsPicker } from '..';
import { withApi } from '../../providers';
import endpoints from '../../configs/endpoints';
import { consoleError, addMessage } from '../../utils/functions';

/**
 * This component renders a button to invite friends to a clan.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class InviteFriendToClan extends React.Component {
    state = {
        displayInvite : false,
    };

    toggleInvite() {
        this.setState({
            displayInvite : !this.state.displayInvite,
        });
    }

    async onSelectFriends(selectedFriends) {
        const {
            clanCode,
            userCode,
            doPost,
            startLoading,
            stopLoading,
        } = this.props;
        this.setState({displayInvite : false});
        startLoading();
        try {
            const response = await doPost(endpoints.clan.invitar, {
                clan        : clanCode,
                jugador     : userCode,
                jugadores   : selectedFriends,
            });
            const {error, error_controlado} = response;
            if(error) {
                consoleError("Invite Friends", response);
                addMessage("Ocurrió un error inesperado al invitar amigos");    
            } else if(error_controlado) {
                addMessage(error_controlado);
            } else {
                addMessage("Se ha enviado la invitación a tus amigos");
            }
        } catch (response) {
            consoleError("Invite Friends", response);
            addMessage("Ocurrió un error inesperado al invitar amigos");
        } finally {
            stopLoading();
        }

    }

    render() {
        const {displayInvite} = this.state;
        return (
            <>
            <SubmitButton primary 
                label = "Invitar amigos"
                onPress = { () => this.toggleInvite() }
            />
            {displayInvite && (
                <FriendsPicker 
                    open = { displayInvite }
                    onClose = { () => this.toggleInvite() }
                    onSelectFriends = { this.onSelectFriends.bind(this) }
                />
            )}            
            </>
        );
    }
}

InviteFriendToClan.propTypes = {
    clanCode : PropTypes.any,
    doPost   : PropTypes.func,
    userCode : PropTypes.any,
    startLoading    : PropTypes.func,
    stopLoading     : PropTypes.func,
};

export default withApi(InviteFriendToClan);