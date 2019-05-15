import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';
import { withUserData } from '../providers';
import {DEFAULT_USER_IMG} from 'react-native-dotenv';
import { SimpleTouch } from './touchables';
class UserProfileButton extends React.PureComponent {
    goToProfile( ){
        const {navigation} = this.props;
        navigation.navigate("MyProfile");
    }
    render() {
        const {
            photo,
        } = this.props;
        return (
            <View style = { styles.root }>
                <SimpleTouch wrapType = "stretch" onPress = { () => this.goToProfile() }>
                    <Image 
                        style = { styles.image }
                        source = { { uri : photo? photo : DEFAULT_USER_IMG } } 
                    />
                </SimpleTouch>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        paddingRight : 10,
    },
    image : {
        width : 30,
        height : 30,
        borderRadius : 100,
        backgroundColor : "#e0e0e0"
    },
});

UserProfileButton.propTypes = {
    navigation : PropTypes.any
};

export default withUserData(UserProfileButton);