import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
} from 'native-base';

/**
 * This component wrapps the components for the render.
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} param0 
 */
const Content = ({children}) => (
    <View style = { styles.root } >
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