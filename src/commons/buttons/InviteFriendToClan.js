import React from 'react';
import { SubmitButton } from '../forms';
import { InviteContacts } from '../../components';

class InviteFriendToClan extends React.Component {
    state = {
        displayInvite : false,
    };

    toggleInvite() {
        this.setState({
            displayInvite : !this.state.displayInvite,
        });
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
                <InviteContacts  open = { displayInvite } onClose = { () => this.toggleInvite() } />
            )}
            </>
        );
    }
}

export default InviteFriendToClan;