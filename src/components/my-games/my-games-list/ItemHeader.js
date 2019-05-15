import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Text,
} from 'native-base';
import PropTypes from 'prop-types';

/**
 * This component renders the header information for a game.
 * @param title
 * @param totalPlayers
 * @param confirmedPlayers
 * @param date
 * @returns {*}
 * @constructor
 */
const ItemHeader = ({title="", totalPlayers=0, confirmedPlayers=0, date="00-00-00 00:00"}) => (
    <View style={styles.root}>
        <View style={styles.row}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.playersInfo}>
                <Text>{`${confirmedPlayers}/${totalPlayers}`}</Text>
            </View>
        </View>
        <View style={styles.date}>
            <Text note>{date}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    root : {
        flex : 1,
    },
    row : {
        flex : 1,
        flexDirection   : "row",
        justifyContent  : "space-between",
        alignItems      : "center",
    },
    title : {
        fontSize : 18,
        fontWeight: "normal",
        color : "#000",
    },
    titleWrapper : {
        flex : 9,
    },
    playersInfo : {
        flex : 1,
    },
});

ItemHeader.propTypes = {
    title               : PropTypes.string.isRequired,
    totalPlayers        : PropTypes.number,
    confirmedPlayers    : PropTypes.number,
    date                : PropTypes.string,
};

export default ItemHeader;