import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
} from 'native-base';
import ClansList from './ClansList';
import {SimpleHeader} from '../../commons/containers';

const ClansCase = ({title="clans header", onPress, clans=[], loading}) => (
    <View style = { styles.root }>
        <SimpleHeader title = { title } />
        <ClansList
            clans   = { clans   } 
            loading = { loading } 
            onPress = { onPress }
        />
    </View>
);

const styles = StyleSheet.create({
    root : {

    },
});

ClansCase.propTypes = {
    clans   : PropTypes.array,
    onPress : PropTypes.func,
};

export default ClansCase;