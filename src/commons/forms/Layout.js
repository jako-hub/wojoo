import React from 'react';
import {
    View,
    StyleSheet,    
} from 'react-native';

const styles = StyleSheet.create({
    row : {
        flex : 1,
        flexDirection : "row",
        justifyContent : "space-between",
    },
    col: {
        flex : 1,
    },
});

export const Row = ({children}) => (
    <View style={styles.row}>
        {children}
    </View>
);

export const Col = ({children}) => (
    <View style={styles.col}>
        {children}
    </View>
);

