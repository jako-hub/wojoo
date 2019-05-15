import React from 'react';
import {
    View,
    StyleSheet,    
} from 'react-native';
import {Text} from 'native-base';
import PropTypes from 'prop-types';
import moment from 'moment';

export const MAX_CHARS_HEADER = 20;

export { default as GameItemBody } from './GameItemBody';

/**
 * This component only renders the item GameItemHeader
 * @param {*} param0 
 */
const GameItemHeader = ({title="", totalPlayers=0, confirmedPlayers=0, date="00-00-00 00:00", dateTo="00-00-00 00:00"}) => {
    const gameDate      = moment(date);
    const gameDateTo    = moment(dateTo);
    const formattedDate = gameDate.format("YYYY-MM-DD");
    const timeFrom      = gameDate.format("HH:mm");
    const timeTo        = gameDateTo.format("HH:mm");
    const time          = `(${timeFrom} - ${timeTo})`;
    if(title.length > MAX_CHARS_HEADER) title = `${title.substring(0, MAX_CHARS_HEADER)}...`;
    return (
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
                <Text note style={styles.textDate}>{`${formattedDate} ${time}`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root : {
        justifyContent : "flex-start",
        flexDirection : "column",
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
        flex : 2,
    },
    textDate : {
        fontSize : 12,
    },
});

GameItemHeader.propTypes = {
    title               : PropTypes.string.isRequired,
    totalPlayers        : PropTypes.number,
    confirmedPlayers    : PropTypes.number,
    date                : PropTypes.string,
    dateTo              : PropTypes.string,
    isInGame            : PropTypes.bool,
};

export default GameItemHeader;