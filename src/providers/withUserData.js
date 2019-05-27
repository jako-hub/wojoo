import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
    fetchMyFriends, 
    fetchFriendshipRequest, 
    setUserData, 
    setVerified,
    removeFriendshipRequest,
    fetchUserSendedRequests,
    fetchPlayerAdminClanes,
    fetchPlayerClanes,
    createAdminClan,
    fetchClanInvitations,    
    removeClanInvitation,
} from '../store/actions/userData.actions';

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchMyFriends,
    setUserData,
    setVerified,
    fetchFriendshipRequest,
    fetchUserSendedRequests,
    removeFriendshipRequest,
    fetchPlayerAdminClanes,
    fetchPlayerClanes,
    createAdminClan,
    fetchClanInvitations,
    removeClanInvitation,
}, dispatch);

const mapStateToProps = ({session:{userCode}, games:{pendingClose}, userData}) => ({
    userCode,
    pendingToCloseGames : pendingClose,
    ...userData,
});

export const propTypes = {
    userCode            : PropTypes.any,
    moneyPoints         : PropTypes.number,
    verified            : PropTypes.bool,
    photo               : PropTypes.string,
    clanInvitations             : PropTypes.array,
    clans                       : PropTypes.array,
    adminClans                  : PropTypes.array,
    pendingToCloseGames         : PropTypes.array,
    friends                     : PropTypes.array,
    friendshipRequests          : PropTypes.array,
    friendshipRequestsSended    : PropTypes.array,
    setUserData                 : PropTypes.func,
    setVerified                 : PropTypes.func,
    fetchMyFriends              : PropTypes.func,
    fetchUserSendedRequests     : PropTypes.func,
    fetchFriendshipRequest      : PropTypes.func,
    removeFriendshipRequest     : PropTypes.func,
    fetchPlayerAdminClanes      : PropTypes.func,
    fetchPlayerClanes           : PropTypes.func,
    createAdminClan             : PropTypes.func,
    fetchClanInvitations        : PropTypes.func,
    removeClanInvitation        : PropTypes.func,
};

/**
 * This wrapper allows to interact with user data reducer.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param WrappedComponent
 */
export default WrappedComponent => (connect(mapStateToProps, mapDispatchToProps)(
    class extends React.PureComponent {
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                />
            )
        }
    }
));