import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';

const SimpleHeader = ({title}) => (
    <View style = { styles.root }>
        <Text style = { styles.text }>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    root : {
        backgroundColor : "#f7f7f7",
        paddingHorizontal         : 15,
        paddingVertical : 5,
    },
    text : {
        textAlign : "center",
        color : "#707070",
    },
});

export default SimpleHeader;