import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import {
    Badge,
} from 'native-base';

const Pager = ({total=200}) => (
    <View style={styles.root}>
        <View style={styles.wrapper}>
            <Badge info style={styles.badge}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Total: {total}</Text>
                </View>
            </Badge>
        </View>
    </View>
);

const styles = StyleSheet.create({
    root : {
        height : 35,
        marginTop : 10,
    },
    badge : {
        paddingVertical : 10,
        height : 40,
    },
    badgeText : {
        color : "#fff",
    },
    wrapper : {
        flex : 1,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "flex-end",
        marginRight : 5,
    },
});

Pager.propTypes = {
    total : PropTypes.number,
};

export default Pager;