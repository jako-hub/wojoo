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
import { SimpleTouch } from '../../commons/touchables';

const ScenarioTimeListItem = ({timeLabel, reserved, onSelect, isSelected}) => {
    const stylesItem = [
        styles.root,
        (reserved? styles.reserved : null),
        (isSelected && !reserved? styles.selected : null),
    ];
    const stylesText = [
        styles.timeText,
        (reserved? styles.timeTextReserved : null),
        (isSelected && !reserved? styles.selectedText : null),
    ];
    const contentTextStyles = [
        styles.contentText,
        (isSelected && !reserved? styles.contentSelectedText : null),
    ];
    const stylesWrapperText = [
        styles.timeWrapper,
        (reserved? styles.reserved : null),
    ];
    const content = (
        <View style = { stylesItem }>
            <View style = { stylesWrapperText }>
                <Text style = { stylesText }>{timeLabel}</Text>
            </View>
            <View style = { styles.contentWrapper }>
                <Text note style = { contentTextStyles } >
                    {reserved? "Reservado" : (isSelected? "Reservar" : "Disponible")}
                </Text>
            </View>
        </View>
    );
    return (
        <>
            {reserved
            ? (content)
            : (
                <SimpleTouch wrapType = "stretch" onPress={onSelect}>{content}</SimpleTouch>
              )
            }
        </>
    );
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        flexDirection       : "row",
        borderBottomWidth   : 1,
        borderBottomColor   : "#e0e0e0",
        backgroundColor     : palette.primary.light,
    },
    reserved : {
        backgroundColor : "#f7f7f7"
    },
    selected : {
        backgroundColor : palette.primary.color,
    },
    contentSelectedText : {
        color : "#FFF",
    },
    timeWrapper : {
        padding             : 5,
        backgroundColor : palette.primary.color,
        flex : 2,
        justifyContent : "center",
        alignItems : "center",
    },
    contentWrapper : {
        flex : 8,
        padding : 5,
    },
    contentText : {
        textAlign : "center",
    },
    timeText : {
        fontSize : 13,
        color : "#fff",
    },
    timeTextReserved : {
        color : "#BDBDBD",
    },
});

ScenarioTimeListItem.propTypes = {
    timeLabel : PropTypes.string,
};

export default ScenarioTimeListItem;