import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome';

/**
 * This component renders a simple icon button.
 * @param {*} param0 
 */
const IconButton = ({icon, size=25, disabled, noFa5, onPress, small=false, color=null}) => {
    const button = (    
        <View style={{...styles.root, ...(disabled? styles.disabled : {}), ...(small? styles.small : {})}}>
            {noFa5 && (
                <Icon4 style = {{color : color}} name={icon} size={small? 18 : size} />
            )}
            {!noFa5 && ( 
                <Icon style = {{color : color}} name={icon} size={small? 18 : size} />
            )}
        </View>
    );
    if(disabled) return button;
    return (
        <TouchableOpacity onPress={!disabled? onPress : null}>
            {button}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    root : {
        alignItems      : "center",
        justifyContent  : "center",
        borderRadius    : 50,
        height          : 60,
        width           : 60,
    },
    small : {
        height          : 40,
        width           : 40,
    },
    disabled : {
        opacity : 0.3,
    },
});

IconButton.propTypes = {
    icon : PropTypes.string,
    size : PropTypes.number,
    disabled : PropTypes.bool,
    onPress  : PropTypes.func,
};

export default IconButton;