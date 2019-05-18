import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import stylesPalette from '../../utils/stylesPalette';

const Budge = ({title}) => (
    <View style = { styles.root }>
        <Text style = { styles.text }>{title}</Text>
    </View>
);

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        backgroundColor : palette.accent.divider,
        paddingHorizontal         : 15,
        paddingVertical : 5,
        borderRadius : 30,
    },
    text : {
        textAlign : "center",
        color : "#707070",
    },
});

export default Budge;