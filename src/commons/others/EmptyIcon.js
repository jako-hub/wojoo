import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesPalette from '../../utils/stylesPalette';

const EmptyObject = ({icon, message}) => {
    if(!icon) return null;
    return (
        <View style = { styles.root }>
            <View style = { styles.textWrapper }>
                <Text style = { styles.text }  note>{message}</Text>
            </View>
            <View style = {styles.iconWrapper}>
                <Icon style = { styles.icon } name = { icon } size = { 50 }  />
            </View>
        </View>
    )
};

const palette = stylesPalette();

const styles = StyleSheet.create({
    root : {        
    },
    iconWrapper : {
        backgroundColor : palette.bgs.gray,
        alignSelf       : "center",
        padding         : 20,
        borderRadius    : 200,
        marginTop       : 20,
        height : 100,
        width : 100,
        justifyContent : "center",
        alignItems : "center",
    },
    icon : {
        
    },
    text : {
        textAlign : "center",
    },
});

EmptyObject.propTypes = {
    icon : PropTypes.string,
};

export default EmptyObject;