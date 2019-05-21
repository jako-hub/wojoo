import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';

/**
 * This component wrapps the components for the render.
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0 
 */
const Content = ({children}) => (
    <View style = { styles.root } >
        <View style = { styles.titleWrapper }>
            <Text style = { styles.text }>
                Administrar clanes.
            </Text>
        </View>
        {children}
    </View>
);

const styles = StyleSheet.create({
    root : {

    },
    titleWrapper : {

    },
    text : {

    },
});

export default Content;