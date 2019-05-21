import React from 'react';
import {StyleSheet} from 'react-native';
import {
    View,
} from 'native-base';
import { SimpleTouch } from '../touchables';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesPalette from '../../utils/stylesPalette';
const Star = ({onPress, value, size=15}) => {
    let name;
    if(value === 1) name = "star";
    else if(value === 0.5) name = "star-half-o";
    else name = "star-o";
    return (
        <SimpleTouch wrapType = "stretch" onPress = { onPress }>
            <View style = {styles.root}>
                <Icon style = { styles.star } name = {name} size = {size} />
            </View>
        </SimpleTouch>
    );
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        marginHorizontal : 1,
    },
    star : {
        color : palette.primary.color,
    },
    selected : {

    },
});

export default Star;