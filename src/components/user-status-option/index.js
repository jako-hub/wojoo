import React from 'react';
import PropTypes from 'prop-types';
import { withUserData } from '../../providers';
import {
    View,
    Text,
} from 'native-base';
import {
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class UserStatusOption extends React.Component {
    componentDidMount() {        
    }
    render() {
        const {moneyPoints} = this.props;
        return (
            <View style = { styles.root }>
                <Icon name="coins" size={18} style = { {marginRight : 10,} } />
                <Text> {moneyPoints||0}pts </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : { flexDirection : "row" },

});

UserStatusOption.propTypes = {
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

export default withUserData(UserStatusOption);