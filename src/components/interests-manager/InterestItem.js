import React from 'react';
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types';

import { 
    View,
    Text,
} from 'native-base';
import stylesPalette from '../../utils/stylesPalette';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { SimpleTouch } from '../../commons/touchables';

/**
 * This component renders the single interest item.
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param {*} props 
 */
const InterestItem = (props) => {
    const {name, icon, onPress, active} = props;
    const rootStyles = [
        styles.root,
        (active? styles.activeRoot : null),
    ];
    const textStyles = [
        styles.text,
        (active? styles.activeText : null),
    ];
    return (
        <SimpleTouch wrapType = "stretch" onPress = { onPress }>
            <View style = { rootStyles }>
                <Icon style = { [...textStyles, styles.icon] } name = {icon} size = {18} />
                <Text style = { textStyles}>{name}</Text>
                {active && (<Icon style = { [...textStyles, styles.iconRight] } name = {"times"} size = {10} />)}
            </View>
        </SimpleTouch>
    );
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        marginVertical      : 4,
        marginHorizontal    : 2,
        padding             : 4,
        borderColor         : palette.primary.color,
        borderWidth         : 1,
        borderRadius        : 50,
        paddingHorizontal   : 10,
        flexDirection       : "row",
        alignItems          : "center",
    },
    text : {
        color : palette.primary.color,
    },
    activeRoot : {
        backgroundColor : palette.primary.color,
    },
    activeText : {
        color : "#FFF",
    },
    icon : {
        marginRight : 5,
    },
    iconRight : {
        marginLeft  : 10,
    },
});

InterestItem.propTypes = {
    onPress : PropTypes.func,
    name    : PropTypes.string,
    icon    : PropTypes.string,
};

export default InterestItem;