import React from 'react';
import { SubmitButton } from '../forms';
import { FriendsPicker } from '..';

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
        console.log("Selected: ", selectedFriends);
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

export default InviteFriendToClan;