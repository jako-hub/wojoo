import React from 'react';
import BaseScreen from '../BaseScreen';
import { withUserData, withGames } from '../../providers';
import FriendshipSuggestion from '../../components/my-profile/friendship-suggestion';
import ContactsList from '../../components/invite-contacts/ContactsList';
import GameInvitations from '../../components/game-invitations';
import FriendshipRequestsReceived from '../../components/my-profile/friendship-requests-received';
import { PendingCloseGames, GameDetailComponent } from '../../components';


class TestAreaScreen extends React.Component {
    state = {
        open : false,
    };
    componentDidMount() {
        this.props.selectGame({codigo_juego : 2});
    }
    toggle() {
        this.setState({
            open : !this.state.open,
        });
    }
    render() {
        const navigation = this.props.navigation;
        const {selectedGame} = this.props;
        const {open} = this.state;
        return (
            <BaseScreen
                navigation = { navigation }
            >                
                {selectedGame.codigo_juego && (
                    <GameDetailComponent 
                        navigation={navigation} 
                        selectedGame={selectedGame} 
                    />
                )}
            </BaseScreen>
        );
    }
}

export default withGames(TestAreaScreen);