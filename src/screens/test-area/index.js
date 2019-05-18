import React from 'react';
import BaseScreen from '../BaseScreen';
import { withUserData } from '../../providers';
import FriendshipSuggestion from '../../components/my-profile/friendship-suggestion';
import ContactsList from '../../components/invite-contacts/ContactsList';
import GameInvitations from '../../components/game-invitations';
import FriendshipRequestsReceived from '../../components/my-profile/friendship-requests-received';
import { PendingCloseGames } from '../../components';


class TestAreaScreen extends React.Component {
    state = {
        open : false,
    };
    toggle() {
        this.setState({
            open : !this.state.open,
        });
    }
    render() {
        const navigation = this.props.navigation;
        const {open} = this.state;
        return (
            <BaseScreen
                navigation = { navigation }
            >                
                <PendingCloseGames 
                    navigation = { navigation }
                />
            </BaseScreen>
        );
    }
}

export default withUserData(TestAreaScreen);