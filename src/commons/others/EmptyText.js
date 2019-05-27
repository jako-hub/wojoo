import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'native-base';
import {StyleSheet} from 'react-native';

const EmptyText = ({text}) => (
    <View style = { styles.root }>
        <Text note style = { {textAlign : "center"} }>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    root : {
        marginBottom : 20,
    },
});

EmptyText.propTypes = {
    text : PropTypes.string
};

export default EmptyText;