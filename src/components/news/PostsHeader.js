import React from 'react';
import { 
    View, 
    Text,
} from 'native-base';
import {
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesPalette from '../../utils/stylesPalette';

const PostsHeader = () => {
    return (
        <View style = { styles.root }>
            <View style = { styles.iconWrapper }>
                <Icon name = "newspaper-o" size = {18} />
            </View>
            <View style = { styles.textWrapper }>
                <Text>Actividad en Jako</Text>
            </View>
        </View>
    );
}

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {
        backgroundColor : "#FFF",
        zIndex : 100,
        paddingHorizontal : 7,
        flexDirection : "row",
        alignItems : "center",
    },
    iconWrapper : {
        borderColor : palette.accent.divider,
        borderWidth : 1,
        borderRadius : 100,
        padding : 2,
        width : 30, 
        height : 30,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "#FFF",
    },
    
    textWrapper : {
        marginLeft : 10,
    },
});

export default PostsHeader;