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
} from '../store/actions/userData.actions';

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchMyFriends,
    setUserData,
    setVerified,
    fetchFriendshipRequest,
    fetchUserSendedRequests,
    removeFriendshipRequest,
}, dispatch);

const mapStateToProps = ({session:{userCode}, userData}) => ({
    userCode,
    ...userData,
});

export const propTypes = {
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
    moneyPoints                 : PropTypes.number,
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