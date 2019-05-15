import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
} from 'native-base';
import { withUserData } from '../../providers';
import { ModalTop } from '../modals';
import FriendshipRequestsReceived from '../../components/my-profile/friendship-requests-received';
import NotifierBase from './NotifierBase';

/**
 * This component allows to render the friendship notifications.
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class FriendshipNotifier extends React.Component {
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
                title = "Solicitudes de amistad" 
                icon = "users"
            >
                <View style = { styles.notifiesRoot }>
                    <FriendshipRequestsReceived 
                        navigation = { navigation }
                        onViewProfile = { () => this.toggleModal() }
                    />
                </View>
            </ModalTop>
        );
    }

    render () {
        const { friendshipRequests=[] } = this.props;
        const {openModal} = this.state;
        const totalRequests = friendshipRequests.length;
        return (
            <>
                <NotifierBase 
                    icon    = "users"
                    count   = { totalRequests }
                    onPress = { () => this.toggleModal() }
                />
                {openModal && (this.renderModal())}
            </>
            
        );
    }
}

FriendshipNotifier.propTypes = {
    fetchMyFriends      : PropTypes.func,
    userCode            : PropTypes.any,
    setUserData         : PropTypes.func,
    friends             : PropTypes.array,
    photo               : PropTypes.string,
    verified            : PropTypes.bool,
    setVerified         : PropTypes.func,
    friendshipRequests  : PropTypes.array,
    friendshipRequestsSended    : PropTypes.array,
    fetchUserSendedRequests     : PropTypes.func,
    fetchFriendshipRequest      : PropTypes.func,
    removeFriendshipRequest     : PropTypes.func,
};

export default withUserData(FriendshipNotifier);