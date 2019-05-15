import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';
import {LoginComponent} from "../../components";

/**
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class LoginScreen extends React.PureComponent {
    // static navigationOptions = {
    //     header: { visible: false } // !!! Hide Header
    // };

    render() {
        const navigation = this.props.navigation;
        return (
            <View style={styles.root}>
                <LoginComponent navigation={navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        flex : 1,
        justifyContent : "center",
    },
});

LoginScreen.propTypes = {
    navigation : PropTypes.object,
};

export default LoginScreen;