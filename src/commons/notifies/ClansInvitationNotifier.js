import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
} from 'native-base';
import { withUserData } from '../../providers';
import { ModalTop } from '../modals';
import FriendshipRequestsReceived from '../../components/my-profile/friendship-requests-received';
import NotifierBase from './NotifierBase';
import { ClanInvitations } from '../../components';

/**
 * This component allows to render the clan invitations notifications.
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class ClansInvitationNotifier extends React.Component {
    state = {
        openModal : false,
        totalRequests : 0,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {        
        await this.props.fetchFriendshipRequest();
    };

    toggleModal = () => {
        this.setState({
            openModal : !this.state.openModal,
        });
    };

    renderModal = () => {
        const { navigation, } = this.props;
        return (
            <ModalTop
                open
                onClose = { () => this.toggleModal() }
                title = "Clanes" 
                icon = "users"
                icon5
            >
                <View style = { styles.notifiesRoot }>
                    <ClanInvitations 
                        navigation = { navigation } 
                        onClose     = { () => this.toggleModal() }
                    />
                </View>
            </ModalTop>
        );
    }

    render () {
        const { clanInvitations=[] } = this.props;
        const {openModal} = this.state;
        const totalRequests = clanInvitations.length;
        return (
            <>
                <NotifierBase 
                    icon    = "users"
                    icon5
                    count   = { totalRequests }
                    onPress = { () => this.toggleModal() }
                />
                {openModal && (this.renderModal())}
            </>
            
        );
    }
}

ClansInvitationNotifier.propTypes = {
    navigation : PropTypes.any,
    clanInvitations : PropTypes.array,
};

export default withUserData(ClansInvitationNotifier);