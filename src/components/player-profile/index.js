import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';
import UserProfileCard from '../user-profile-card';

class PlayerProfile extends React.Component {
    render() {
        const {        
            playerCode=50,
            navigation
        } = this.props;
        return (
            <View style = { styles.root }>
                <UserProfileCard 
                    disableUpload 
                    playerCode  = { playerCode } 
                    navigation  = { navigation }
                    isPlayer
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
    },
});

PlayerProfile.propTypes = {
    navigation  : PropTypes.object.isRequired,
    playerCode  : PropTypes.any,
};

export default PlayerProfile;