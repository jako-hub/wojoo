import React from 'react';
import PropTypes from 'prop-types';
import { SimpleTouch } from '../touchables';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * This component allows to rewise a simple button to display notifications.
 * @@author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com> 
 * @param {*} param0 
 */
const NotifierBase  = ({onPress, icon, count}) => {
    return (
        <SimpleTouch onPress = { onPress }>
            <View style = { styles.root }>
                <Icon style = { styles.iconButton } name = {icon} size = { 24 } />
                {count > 0 && (
                    <View style = { styles.tipCount }>
                        <Text style = { styles.tipText }>{count}</Text>
                    </View>
                )}                    
            </View>                
        </SimpleTouch>
    );
}

const styles = StyleSheet.create({
    root : {
        height : 30,
        width : 30,
        justifyContent : "center",
        alignItems : "center",
        marginHorizontal : 10,
    },
    tipCount : {
        backgroundColor   : "red",
        position          : "absolute",
        top               : "70%",
        right             : "60%",
        paddingHorizontal : 2,
        width        : 30,
        borderRadius : 30,
    },
    tipText : {
        textAlign   : "center",        
        color       : "#FFF",
    },
});

NotifierBase.propTypes = {
    onPress : PropTypes.func,
    count   : PropTypes.number,
    icon    : PropTypes.string,
};

export default NotifierBase;