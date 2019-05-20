import React from 'react';
import {
    Spinner,
    View,
} from 'native-base';
import { StyleSheet, } from 'react-native';
import stylesPalette from '../../utils/stylesPalette';

const palette = stylesPalette();

const SimpleLoader = () => (
    <View style = { styles.root }>
        <Spinner color={palette.primary.color}/>
    </View>
);

const styles = StyleSheet.create({
    root : {
        paddingVertical : 10,
        flexDirection   : "row",
        justifyContent  : "center"
    },
});

export default SimpleLoader;