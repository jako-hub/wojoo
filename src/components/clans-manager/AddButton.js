import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
} from 'native-base';
import { SubmitButton } from '../../commons/forms';

/**
 * This component only renders the presentation for the create Clan button.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} props 
 */
const ClansList =   ({label, onPress}) => {
    return (
        <View style = {styles.root}>
            <SubmitButton 
                primary
                onPress = { onPress }>
                {label}
            </SubmitButton>
        </View>
    );
};

const styles = StyleSheet.create({
    root : {
        padding     : 10,
        alignItems  : "center",
    },    
});

ClansList.propTypes = {
    label   : PropTypes.string,
    onPress : PropTypes.func,
};

export default ClansList;