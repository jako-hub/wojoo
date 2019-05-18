import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
} from 'native-base';
import {
    StyleSheet,
} from 'react-native';

class PendingCloseGames extends React.Component {
    render () {
        return (
            <View style = { styles.root }>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root : {},
});

PendingCloseGames.propTypes = {
    navigation : PropTypes.any,
};


export default PendingCloseGames;