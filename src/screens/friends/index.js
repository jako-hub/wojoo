import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BaseScreen from '../BaseScreen';
import PropTypes from 'prop-types';

/**
 * This is the screen for admin my friends
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class FriendsScreen extends React.PureComponent {
    render() {
        const navigation = this.props.navigation;
        return (
            <BaseScreen navigation={navigation} title={"Mis amigos"}>
                <View style={styles.root}>
                    <Text>Aquí podré encontrar una lista de mis amigos</Text>
                </View>
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        paddingHorizontal   : 10,
        paddingVertical     : 10,
        alignItems          : "center",
    },
});

FriendsScreen.propTypes = {
    navigation : PropTypes.object,
};

export default FriendsScreen;