import React from 'react';
import {
    StyleSheet,
} from 'react-native';

import {
    View,
    Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SimpleTouch } from '../../commons/touchables';
import stylesPalette from '../../utils/stylesPalette';

const InterestItem = ({icon="tag", name, onPress, primary, removable}) => {
    const rootStyles = [
        styles.root,
        (primary? styles.rootPrimary : null),
    ];

    const textStyles = [
        styles.text,
        (primary? styles.textPrimary : null),
    ];

    return (
        <SimpleTouch wrapType = "stretch" onPress = { onPress }>
            <View style = { rootStyles }>
                <View style = { styles.iconWrapper }>
                    <Icon style = { textStyles } name = { icon } size = {18} />
                </View> 
                <View>
                    <Text style = { textStyles } >{name}</Text>
                </View>
                { removable && (
                    <View style = { styles.iconWrapperEnd }>
                        <Icon style = { textStyles } name = { "times" } size = {18} />
                    </View>
                ) }
            </View>
        </SimpleTouch>
    );
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        borderRadius        : 50,
        borderColor         : palette.primary.color,
        borderWidth         : 1,
        flexDirection       : "row",
        paddingHorizontal   : 10,
        paddingVertical     : 2,
        marginHorizontal    : 2,
    },
    rootPrimary : {
        backgroundColor : palette.primary.color,
    },
    text : {
        color : palette.primary.color,
    },
    textPrimary : {
        color : "#FFF",
    },
    iconWrapper : {
        marginRight : 5,
    },
    iconWrapperEnd : {
        marginLeft : 5,
    },
});

export default InterestItem;