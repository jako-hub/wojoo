import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';
import { RegisterComponent } from "../../components";

/**
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class RegisterScreen extends React.PureComponent {
    render() {
        const navigation = this.props.navigation;
        return (
            <View style={styles.root}>
                <RegisterComponent navigation={navigation}/>
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

RegisterScreen.propTypes = {
    navigation : PropTypes.object,
};

export default RegisterScreen;