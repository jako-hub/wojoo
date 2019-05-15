import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
} from 'native-base';
import { ModalTop } from '../modals';
import { withGames } from '../../providers';
import NotifierBase from './NotifierBase';
import { GameInvitations } from '../../components';

class GameInvitationNotifier extends React.Component {
    state = {
        openModal : false,
    };

    componentDidMount() {
        this.fetchInvitations();
    }

    fetchInvitations = () => {
        this.props.fetchGameInvitations();
    }

    renderModal = () => {
        const { navigation, } = this.props;
        return (
            <ModalTop
                open
                onClose = { () => this.toggleModal() }
                title = "Juegos" 
                icon = "futbol-o"
            >
                <GameInvitations 
                    navigation = { navigation } 
                    onView      = { this.toggleModal.bind(this) }
                    onAccept    = { this.toggleModal.bind(this) }
                />
            </ModalTop>
        );
    }

    toggleModal() {
        this.setState({
            openModal : !this.state.openModal,
        });
    }

    render() {
        const {openModal} = this.state;
        const {gameInvitations=[]} = this.props;
        const totalGames = gameInvitations.length;
        return (
            <>
                <NotifierBase 
                    icon    = "futbol-o"
                    count   = { totalGames }
                    onPress = { () => this.toggleModal() }
                />
                {openModal && (this.renderModal())}
            </>
        );
    }
}

GameInvitationNotifier.propTypes = {
    navigation : PropTypes.any.isRequired,
    fetchMyGames    : PropTypes.func,
    myGames         : PropTypes.array,
    userCode        : PropTypes.any,
    fetchGameInvitations : PropTypes.func,
    gameInvitations : PropTypes.array,
};

export default withGames(GameInvitationNotifier);